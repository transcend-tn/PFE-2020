import React from "react";
import Media from "react-bootstrap/esm/Media";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";

export interface MemberCardInterface{
 username: string;
 img?: string;
}

function MemberCard(props: MemberCardInterface){

    function HandlerSupprimer() {
        console.log(
          `${props.username} "a été supprimer"`
        );
      }
      return (
        <Media>
        <Image
          src="https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ"
          rounded
          width={68}
          height={68}
          className="mr-2"
        />
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="aperçu">
            <h5>{props.username}</h5>
          </div>
          <div className="acte">
            <Button variant="info" type="submit" onClick={HandlerSupprimer}>
            Supprimer
            </Button>
          </div>
        </Media.Body>
      </Media>
    );
        
}













export default MemberCard;