import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Media from 'react-bootstrap/esm/Media';
import { useMutation, useQuery, useQueryCache } from 'react-query';
import { Link } from 'react-router-dom';
import { REQUEST_DETAIL } from '../constants/uris';
import { deleteRequest } from '../services/request.service';
import { getUserById } from '../services/user.service';

export interface PropositionCardProps {
  idp: string;
  title: string;
  userId: string;
  username?: string;
  time: string;
  canDelete?: boolean;
}

function PropositionCard(props: PropositionCardProps) {
  const cache = useQueryCache();
  const { idp, title, userId, time, canDelete } = props;
  const { data: user = {} } = useQuery(['user:getUserByUsername', userId], getUserById);
  const [deletePR] = useMutation(deleteRequest, {
    onSuccess: () => cache.invalidateQueries('propositions:getbyid'),
  });

  return (
    <div style={{ maxWidth: 500 }}>
      <Media className="border mb-2 max-width-300">
        <Media.Body className="p-2">
          <div className="d-flex justify-content-between align-items-center media-body">
            <div>
              <Link to={REQUEST_DETAIL(idp)} style={{ color: '#000000' }}>
                <h6 className="mb-0">{title}</h6>
              </Link>

              <div className="d-flex flex-row">
                <p className="mb-0 font-weight-light" style={{ fontSize: 'small' }}>
                  <span className="text-secondary">
                    {/* <BsClock size={12} color="#9E9E93" className="mr-1" /> */}
                    {time}
                    {'\xa0'}
                    {'By'}
                    {'\xa0'}
                  </span>
                </p>
                <Link to={`/profile/${user.username}`}>
                  <p className="mb-0 font-weight-light" style={{ fontSize: 'small' }}>
                    {user.username}{' '}
                  </p>
                </Link>
              </div>
            </div>
            {canDelete && (
              <Button variant="" className="close btn-sm mb-1" onClick={() => deletePR(idp)}>
                <span aria-hidden="true">×</span>
              </Button>
            )}
          </div>
        </Media.Body>
      </Media>
    </div>
  );
}

export default PropositionCard;
