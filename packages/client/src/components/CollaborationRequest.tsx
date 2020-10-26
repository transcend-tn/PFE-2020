import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';

export interface CollaborationRequestProps {
  id: string;
  /** username prop documentation */
  username: string;
  /** document prop documentation */
  document: string;
}

function CollaborationRequest(props: CollaborationRequestProps) {
  const { id, username, document } = props;

  function HandlerAccepter() {
    console.log(`${username} " a été ajouté au "${document}" en tant que collaborateur"`);
  }

  function HandlerRefuse() {
    console.log(`la demande de "${username}" a été refusée"`);
  }
  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src="https://picsum.photos/200" roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="profile" style={{ color: '#000000' }}>
              <h6 className="mb-0">{username}</h6>
            </Link>
            <Link to={`document/${id}`} style={{ color: '#000000' }}>
              <p className="mb-0 font-weight-light">{document}</p>
            </Link>
          </div>
          <ButtonGroup size="sm" aria-label="refuse">
            <Button variant="success" type="submit" onClick={HandlerAccepter} className="mr-2">
              Accepter
            </Button>
            <Button variant="danger" type="submit" onClick={HandlerRefuse}>
              Refuser
            </Button>
          </ButtonGroup>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default CollaborationRequest;
