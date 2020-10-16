import React from "react";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";

function CollaborationRequest(props: any) {
  function HandlerAccepter() {
    console.log(
      `${props.username} " a été ajouté au "${props.document}" en tant que collaborateur"`
    );
  }

  function HandlerRefuse() {
    console.log(`la demande de "${props.username}" a été refusée"`);
  }
  return (
    <div>
        <Media>
          <Image
            src="https://picsum.photos/200"
            rounded
            width={68}
            height={68}
            className="mr-2"
          />
          <Media.Body>
            <div className="description">
              <h5>{props.username}</h5>
              <p>{props.document}</p>
            </div>
            <div className="actions">
              <Button variant="danger" type="submit" onClick={HandlerRefuse}>
                Refuser
              </Button>
              <Button variant="success" type="submit" onClick={HandlerAccepter}>
                Accepter
              </Button>
            </div>
          </Media.Body>
        </Media>
    </div>
  );
}

export default CollaborationRequest;
