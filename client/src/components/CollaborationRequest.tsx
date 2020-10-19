import React from "react";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import ButtonToolbar from "react-bootstrap/esm/ButtonToolbar";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Card from "react-bootstrap/esm/Card";

export interface CollaborationRequestProps {
  /** username prop documentation */
  username: string;
  /** document prop documentation */
  document: string;
}

function CollaborationRequest(props: CollaborationRequestProps) {
  function HandlerAccepter() {
    console.log(
      `${props.username} " a été ajouté au "${props.document}" en tant que collaborateur"`
    );
  }

  function HandlerRefuse() {
    console.log(`la demande de "${props.username}" a été refusée"`);
  }
  return (
    <Card className="mb-2" style={{ width: "30rem" }}>
      <Media>
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="description d-flex justify-content-between align-items-center">
            <Image
              src="https://picsum.photos/200"
              rounded
              width={68}
              height={68}
              className="mr-2"
            />
            <div>
              <h6 className="mb-0">{props.username}</h6>
              <p className="mb-0 font-weight-light">{props.document}</p>
            </div>
          </div>
          <ButtonToolbar aria-label="Actions">
            <ButtonGroup className="btn-sm mr-1" aria-label="accept">
              <Button variant="success" type="submit" onClick={HandlerAccepter}>
                Accepter
              </Button>
            </ButtonGroup>
            <ButtonGroup className="btn-sm mr-1" aria-label="refuse">
              <Button variant="danger" type="submit" onClick={HandlerRefuse}>
                Refuser
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Media.Body>
      </Media>{" "}
    </Card>
  );
}

export default CollaborationRequest;
