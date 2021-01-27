import { format } from 'date-fns';
import React from 'react';
import ReactPlaceholder from 'react-placeholder';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import PropositionCard from '../../../components/PropositionCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { getRequestById } from '../../../services/request.service';

export interface PropositionListContainerProps {
  owner: string;
}

function PropositionListContainer(props: PropositionListContainerProps) {
  const { id: docId } = useParams<{ id: string }>();
  const { owner } = props;
  const currentUser = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = [], error } = useQuery(['propositions:getbyid', docId], getRequestById);

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
              title={pr.title}
              userId={pr.userId}
              time={format(new Date(pr.createdAt), 'd MMMM, HH:mm')}
              key={`proposition-${idx}`}
              canDelete={owner === currentUser.id.toString()}
            />
          );
        })}
      </ReactPlaceholder>
    </>
  );
}

export default PropositionListContainer;
