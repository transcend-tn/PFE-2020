import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import ButtonToolbar from 'react-bootstrap/esm/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export interface VoteProps {
  yes: number;
  no: number;
}

function Vote(props: VoteProps) {
  function confirmHandler() {
    console.log('Vous avez acceptez la demande de modification');
  }
  function denyHandler() {
    console.log('Vous avez refusez la demande de modification');
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="text-center">Votez</h4>
        <h5 className="mb-3">Oui</h5>
        <ProgressBar variant="success" now={props.yes} label={`${props.yes}%`} />
        <h5 className="mb-3">Non</h5>
        <ProgressBar variant="danger" now={props.no} label={`${props.no}%`} />

        <ButtonToolbar aria-label="Actions" className="mt-3 justify-content-center">
          <ButtonGroup size="sm" className="mr-3" aria-label="accept">
            <Button variant="success" type="submit" onClick={confirmHandler}>
              Oui
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" aria-label="refuse">
            <Button variant="danger" type="submit" onClick={denyHandler}>
              Non
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
}

export default Vote;
