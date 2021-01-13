import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/esm/Button';
import { useMutation, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { updateDocumentMutation } from '../services/document.service';
import { addVote, cancelVote } from '../services/vote.service';

export interface VoteProps {
  voteCount: number;
  teamCount: number;
  voted: boolean;
  isOwner: boolean;
  docId: string;
  newBody: any;
}

function Vote(props: VoteProps) {
  const { id } = useParams<{ id: string }>();
  const cache = useQueryCache();
  const [av, { status: av_status }] = useMutation(addVote, {
    onSuccess: () => cache.invalidateQueries('vote:getStats')
  });
  const [cv, { status: cv_status }] = useMutation(cancelVote, {
    onSuccess: () => cache.invalidateQueries('vote:getStats')
  });
  const [update, { status: update_status }] = useMutation(updateDocumentMutation, {
    onSuccess: () => console.log("MERGED")
  });
  let {voteCount, teamCount, voted, isOwner, docId, newBody} = props;
  const canMerge = voteCount/teamCount>=0.5 && isOwner;
  const updatePayload= {body:newBody, reqId:id};
  if (!props)
  return null
  function voteHandler() {
   voted?cv(id):av(id)
  }
  function mergeHandler() {
    canMerge?updateDocumentMutation({id:docId, body:updatePayload}):console.log("cant merge")
   }

  return (
    <div className="card box-shadow text-center">
    <div className="card-header">
      <h4 className="my-0 font-weight-normal">Vote</h4>
    </div>
    <div className="card-body">
   <h1 className="card-title pricing-card-title">{voteCount} <small className="text-muted">/ {teamCount}</small></h1>
        <ProgressBar variant="success" now={(voteCount/teamCount)*100} label={`${(voteCount/teamCount)*100}%`} style={{height: 20}}/>
        
        <div className="btn-group btn-group-sm mt-4" role="group" aria-label="Small button group">

          {canMerge && <Button variant="success" onClick={mergeHandler}>Confirm Changes</Button>}
        <Button variant={voted?"danger":"success"} type="submit" size="sm" onClick={voteHandler}>
        {voted?"Cancel Vote":"Add Vote"}
            </Button>
        </div>


        
    </div>
  </div>
  );
}

export default Vote;
