import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import ButtonToolbar from 'react-bootstrap/esm/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export interface VoteProps {
  oui: number;
  non: number;
}

function Vote(props: VoteProps) {
  function HandlerOui() {
    console.log('Vous avez acceptez la demande de modification');
  }
  function HandlerNon() {
    console.log('Vous avez refusez la demande de modification');
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="text-center">Votez</h4>
        <h5 className="mb-3">Oui</h5>
        <ProgressBar variant="success" now={props.oui} label={`${props.oui}%`} />
        <h5 className="mb-3">Non</h5>
        <ProgressBar variant="danger" now={props.non} label={`${props.non}%`} />

        <ButtonToolbar aria-label="Actions" className="d-flex justify-content-center">
          <ButtonGroup className="btn-group btn-group-sm mr-2 mt-3" aria-label="accept">
            <Button variant="success" type="submit" onClick={HandlerOui}>
              Oui
            </Button>
          </ButtonGroup>
          <ButtonGroup className="btn-group btn-group-sm mr-3 mt-3" aria-label="refuse">
            <Button variant="danger" type="submit" onClick={HandlerNon}>
              Non
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
}

export default Vote;
