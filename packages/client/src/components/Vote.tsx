import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import Button from 'react-bootstrap/esm/Button';
import ButtonToolbar from 'react-bootstrap/esm/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';

export interface VoteProps {
  yes: number;
}

function Vote(props: VoteProps) {
  function confirmHandler() {
    console.log('Vous avez acceptez la demande de modification');
  }

  return (
    <Card>
      <Card.Body>
        <h4 className="text-center">Votez</h4>
        <h5 className="mb-3">X/Y</h5>
        <ProgressBar variant="success" now={props.yes} label={`${props.yes}%`} />
        
        <ButtonToolbar aria-label="Actions" className="mt-3 justify-content-center">
          <ButtonGroup size="sm" className="mr-3" aria-label="accept">
            <Button variant="success" type="submit" onClick={confirmHandler}>
              Valider
            </Button>
          </ButtonGroup>   
        </ButtonToolbar>
      </Card.Body>
    </Card>
  );
}

export default Vote;
