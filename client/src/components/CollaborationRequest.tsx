import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Card from 'react-bootstrap/esm/Card';

export interface CollaborationRequestProps {
  /** username prop documentation */
  username: string;
  /** document prop documentation */
  document: string;
}

function CollaborationRequest(props: CollaborationRequestProps) {
  function HandlerAccepter() {
    console.log(`${props.username} " a été ajouté au "${props.document}" en tant que collaborateur"`);
  }

  function HandlerRefuse() {
    console.log(`la demande de "${props.username}" a été refusée"`);
  }
  return (
    <Card className="mb-2">
      <Media className="p-2 align-items-stretch">
        <Image src="https://picsum.photos/200" roundedCircle width={50} height={50} className="mr-2" />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-0">{props.username}</h6>
            <p className="mb-0 font-weight-light">{props.document}</p>
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
