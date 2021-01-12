import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import { BsClock } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { REQUEST_BY_ID, REQUEST_DETAIL } from '../constants/uris';
import { useQuery } from 'react-query';
import { getUserById } from '../services/user.service';

export interface PropositionCardProps {
  idc: string;
  idp: string;
  title: string;
  userId:string;
  username?: string;
  time: string;
}

function PropositionCard(props: PropositionCardProps) {
  const { idc, idp, title, userId, time } = props;
  const { isLoading: user_isLoading, isError: user_isError, data: user = {}, error: user_error } = useQuery(['user:getUserByUsername',userId], getUserById);
  return (
    <div style={{ maxWidth: 500 }}>
      <Media className="border mb-2 max-width-300">
        <Media.Body className="p-2">

          <Link to={REQUEST_DETAIL(idp)} style={{ color: '#000000' }}>
            <h6 className="mb-0">{title}</h6>
          </Link>

       
          <div className="d-flex flex-row">
          <p className="mb-0 font-weight-light" style={{ fontSize: 'small' }}>
          <span className="text-secondary">
              {/* <BsClock size={12} color="#9E9E93" className="mr-1" /> */}
              {time}{'\xa0'}{"By"}{'\xa0'}
            </span>
          </p>
          <Link to={`/profile/${user.username}`}>
          <p className="mb-0 font-weight-light" style={{ fontSize: 'small' }}>{user.username} </p>
          </Link>
          </div>
        </Media.Body>
      </Media>
    </div>
  );
}

export default PropositionCard;
