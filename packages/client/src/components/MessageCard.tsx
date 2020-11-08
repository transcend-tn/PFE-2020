import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/esm/Image';
import Media from 'react-bootstrap/esm/Media';
import { BsClock } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

export interface MessageCardProps {
  img?: string;
  username: string;
  time: string;
  body: string;
}

function MessageCard(props: MessageCardProps) {
  const { id: docId } = useParams<{ id: string }>();

  return (
    <Card className="p-1 mb-2">
      <Media>
        <Media.Body className="d-flex p-2">
          <Image
            src={props.img ? props.img : 'http://localhost:3001/user.png'}
            roundedCircle
            width={50}
            height={50}
            className="mr-2"
          />
          <div className="d-flex flex-column">
            <div className="font-weight-light text-secondary">
              <span className="h6 mr-2"> {props.username} </span>
              <span className="text-secondary">
                <BsClock size={12} color="#9E9E93" className="mr-1" />
                {props.time}
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
