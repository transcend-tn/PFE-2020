import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';

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
            src={
              props.img
                ? props.img
                : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png'
            }
            roundedCircle
          />
        </div>
        <h5 className="text-center m-3">{props.username}</h5>
        <div className="d-flex justify-content-center mt-4">
          <div className="followers text-center mr-2">
            {/*               conversion FR romplacer followers par abonné(s)
              et following par abonnement(s) */}
            <h6 className="text-muted">Followers</h6>
            <h6>{props.followers}</h6>
          </div>

          <div className="text-center ml-2">
            <h6 className="text-muted">Following</h6>
            <h6>{props.following}</h6>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link to="edit-profile">
            <Button className="btn-sm" variant="light" type="submit">
              Editer le Profil
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
