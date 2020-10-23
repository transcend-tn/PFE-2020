import React from 'react';
import PropositionCard from '../components/PropositionCard';

const REQUESTS = [1, 2];

function PropositionModificationPage() {
  return (
    <div>
      <h5 className="mb-3">Proposition de Modification</h5>
      {REQUESTS.map((value) => {
        return <PropositionCard timeEdit="now" username="marwen" titre="title 2" key={`request-${value}`} />;
      })}
    </div>
  );
}

export default PropositionModificationPage;
