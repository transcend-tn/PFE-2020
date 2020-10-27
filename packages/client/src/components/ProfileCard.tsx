import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { USER_IMG } from '../constants/temp';

export interface ProfileCardInterface {
  username: string;
  followers: number;
  following: number;
  img?: string;
}

function ProfileCard(props: ProfileCardInterface) {
  return (
    <Card>
      <Card.Body>
        <div className="text-center">
          <Image
            style={{ border: '1px solid #222' }}
            width={100}
            height={100}
            src={props.img ? props.img : USER_IMG}
            roundedCircle
          />
        </div>
        <h5 className="text-center m-3">{props.username}</h5>
        <div className="d-flex justify-content-center mt-4">
          <div className="followers text-center mr-2">
            <h6 className="text-muted">abonné(s)</h6>
            <h6>{props.followers}</h6>
          </div>

          <div className="text-center ml-2">
            <h6 className="text-muted">abonnement(s)</h6>
            <h6>{props.following}</h6>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="edit-profile">
            <Button className="btn-sm" variant="light" type="submit">
              Editer Profile
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
