import React from 'react';
import { getRequestById } from '../../../services/request.service';
import { useQuery } from 'react-query';
import PropositionCard from '../../../components/PropositionCard';
import ReactPlaceholder from 'react-placeholder';

function PropositionListContainer() {
    const { isLoading, isError, data = [], error } = useQuery('propositions:getbyid', getRequestById);

    if (isError) {
      return <span>Error: {error} !</span>;
    }
    return (
        <>
          <ReactPlaceholder ready={!isLoading} showLoadingAnimation firstLaunchOnly>
          {data.map((msg: any, idx: number) => {
            return <PropositionCard id={`id`} title={msg.title} username={msg.username} time={msg.time} key={`proposition-${idx}`} />;
          })}
          </ReactPlaceholder>
        </>
      );
}

export default PropositionListContainer;