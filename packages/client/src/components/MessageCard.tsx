import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/esm/Card';
import { BsClock } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCommentByDocId } from '../services/comment.service';
import { formatDistanceToNow } from 'date-fns';

export interface MessageCardProps {
  img?: string;
  username: string;
  time: string;
  body: string;
}

function MessageCard(props: MessageCardProps) {
const { id: docId } = useParams<{ id: string }>();
const {data} = useQuery(['comments:getbyid', docId], getCommentByDocId);
const time = new Date(data.time)

  return (
    <Card className="p-1 mb-2">
      <Media>
        <Media.Body className="d-flex p-2">
          <Image src={props.img ? props.img : 'user.png'} roundedCircle width={50} height={50} className="mr-4" />
          <div className="d-flex flex-column">
            <div className="font-weight-light text-secondary">
              <span className="mr-2"> {props.username} </span>
              <span className="text-secondary">
                <BsClock size={12} color="#9E9E93" className="mr-1" />
                {data.time} {formatDistanceToNow(new Date(), { addSuffix: true })}
              </span>
            </div>
            <p>{props.body}</p>
          </div>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default MessageCard;
