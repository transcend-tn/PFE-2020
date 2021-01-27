import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MemberCard from '../../../components/MemberCard';
import { useStoreState } from '../../../hooks/store.hooks';
import { collaborationTeam, joinTeamMutation, leaveTeamMutation } from '../../../services/collaboration.service';
export interface TeamMembersListContainerProps {
  owner?: string;
}

function TeamMembersListContainer(props: TeamMembersListContainerProps) {
  const { owner } = props;
  const { id } = useParams<{ id: string }>();
  const { isError, data = [], error } = useQuery(['collaboration:getTeam', id], collaborationTeam);
  const cache = useQueryCache();
  const [joinTeam] = useMutation(joinTeamMutation, {
    onSuccess: () => {
      toast.success('Request Sent', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'fade alert alert-success show',
      });
      cache.invalidateQueries('collaboration:getTeam');
    },
  });
  const [leaveTeam] = useMutation(leaveTeamMutation, {
    onSuccess: () => cache.invalidateQueries('collaboration:getTeam'),
  });
  const currentUser = useStoreState((state) => state.user.user);
  const canLeave: boolean = !(owner === currentUser.id.toString());
  const teamIds = data.map((member: any) => member.id);
  const isMember = teamIds.includes(currentUser.id);

  if (isError) {
    return <span>Error: {error} !</span>;
  }
  if (data.length !== 0)
    return (
      <>
        <Card>
          <Card.Title>
            <h5 className="d-flex justify-content-center mt-4">Team Members</h5>
          </Card.Title>
          <Card.Body>
            {data.map((member: any, idx: number) => {
              return <MemberCard img={member.img} username={member.username} key={`member-${idx}`} />;
            })}
            <hr />
            <div className="text-center">
              {isMember && canLeave ? (
                <Button variant="danger" onClick={() => leaveTeam(id)}>
                  Leave Team
                </Button>
              ) : null}
              {!isMember ? (
                <Button variant="success" onClick={() => joinTeam(id)}>
                  Join Team
                </Button>
              ) : null}
            </div>
          </Card.Body>
        </Card>
      </>
    );
  return null;
}

export default TeamMembersListContainer;
