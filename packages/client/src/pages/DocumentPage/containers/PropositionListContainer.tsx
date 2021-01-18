import React from 'react';
import { getRequestById } from '../../../services/request.service';
import { useQuery } from 'react-query';
import PropositionCard from '../../../components/PropositionCard';
import ReactPlaceholder from 'react-placeholder';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../services/user.service';
import { format } from 'date-fns';
import { useStoreState } from '../../../hooks/store.hooks';

export interface PropositionListContainerProps {
  owner: string;
}

function PropositionListContainer(props: PropositionListContainerProps) {
  const { id: docId } = useParams<{ id: string }>();
  const { owner } = props;
  const currentUser = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = [], error } = useQuery(['propositions:getbyid', docId], getRequestById);
  const { isLoading: user_isLoading, isError: user_isError, data: user = {}, error: user_error } = useQuery(
    ['user:getUserByUsername'],
    getUserById,
  );
  //  console.log(data)
  if (isError) {
    return <span>Error: {error} !</span>;
  }
  return (
    <>
      <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
        {data.map((pr: any, idx: number) => {
          return (
            <PropositionCard
              idp={pr._id}
              idc={pr.documentId}
              title={pr.title}
              userId={pr.userId}
              time={format(new Date(pr.createdAt), 'd MMMM, HH:mm')}
              key={`proposition-${idx}`}
              canDelete={owner == currentUser.id}
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
}

export default PropositionListContainer;
