import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/esm/Card';

export interface MemberCardInterface {
  username: string;
  img?: string;
}

const IMG_DEFAULT = 'user.png';

function MemberCard(props: MemberCardInterface) {
  function HandlerLeave() {
    console.log(`${props.username} "a été supprimer"`);
  }
  return (
    <Card className="mb-2">
      <Media>
        <Media.Body className="d-flex justify-content-between align-items-center">
          <div className="description d-flex justify-content-between align-items-center">
            <Image src={props.img ? props.img : IMG_DEFAULT} roundedCircle width={50} height={50} className="m-2" />
            <div>
              <h6 className="mb-0">{props.username}</h6>
              <p className="mb-0 font-weight-light">Member</p>
            </div>
          </div>
          <Button variant="danger" type="submit" onClick={HandlerLeave}>
            Leave
          </Button>
        </Media.Body>
      </Media>
    </Card>
  );
}

export default MemberCard;
