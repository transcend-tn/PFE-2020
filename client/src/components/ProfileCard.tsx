import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/esm/Card";

export interface ProfileCard {
  username: string;
  followers: number;
  following: number;
  img?: string;
}
function ProfileCard(props: ProfileCardInterface) {
  return (
    <Container>
      <Card>
        <Card.Body>
          <div className="text-center">
            <Image
              width={171}
              height={180}
              src={
                props.img
                  ? props.img
                  : "https://th.bing.com/th/id/OIP.Fds5qcIkperhCvPjKkjsKwHaHa?"
              }
              roundedCircle
            />
          </div>
          <h2 className="text-center mt-2">{props.username}</h2>
          <div className="d-flex justify-content-around">
            <div>
              <div>Abonné</div>
              <strong>{props.followers}</strong>
            </div>
            <div>
              <div>Abonnement</div>
              <strong>{props.following}</strong>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="edit-profile">
              <Button variant="light" type="submit">
                Editer le Profil
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfileCard;
