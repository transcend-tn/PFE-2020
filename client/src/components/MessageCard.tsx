import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/esm/Card';

export interface MessageCardProps {
  username: string;
  time: string;
  commentaire: string;
}

function MessageCard(props: MessageCardProps) {
  return (
    <Card className="mb-2" style={{ width: '30rem' }}>
      <Media>
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="description d-flex justify-content-between align-items-start">
            <Image
              src="https://picsum.photos/200"
              roundedCircle
              width={50}
              height={50}
              className="ml-2 mt-2 mb-2 mr-2"
            />
            <div className="mt-2">
              <h6 className="mb-0">{props.username}</h6>
              <p className="mb-0 font-weight-light">{props.time}</p>
              <p className="ml-2">{props.commentaire}</p>
            </div>
          </div>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default MessageCard;
