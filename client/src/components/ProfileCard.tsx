import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/esm/Col';
import Row from "react-bootstrap/esm/Row";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/esm/Card';

export interface ProfileCardInterface {
  username:string;
  followers:number;
  following:number;
  img?:string;
}
function ProfileCard(props:ProfileCardInterface){
  return(

<Container>
<Card style={{ width: '30rem' , margin: '10rem' }}>
  <Card.Body>
     <Row className="justify-content-md-center" >
    <Col xs lg="5"  > 
    <Image  width={171} height={180} 
    src={props.img?props.img:"https://th.bing.com/th/id/OIP.Fds5qcIkperhCvPjKkjsKwHaHa?"} roundedCircle />
      </Col> </Row>
      

<h2 className="text-center">{props.username}</h2>
    
    <Row className="d-flex justify-content-around">
    <Col  xs lg="4">Abonné</Col>
     
    
    <Col   xs lg="4"> Abonnement</Col>

    </Row>
   
        <Row>
  <Col className="d-flex justify-content-around" xs lg="4"><strong>{props.followers}</strong></Col>

  <Col className="d-flex justify-content-around" xs lg="8"><strong>{props.following}</strong></Col>
      </Row>
 
  <Row className="justify-content-md-center mt-4">
  <Col xs lg="1" >
  </Col> 
  <Link to="editprofile">
  <Button variant="light" type="submit">Editer le Profil</Button> </Link>
  </Row>
</Card.Body>
</Card>
</Container>
);
}

export default ProfileCard; 














