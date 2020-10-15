import React from "react";
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Image from 'react-bootstrap/esm/Image';


function CollaborationRequest(props: any) {

 function HandlerAccepter(){

    console.log(`${props.username} " a été ajouté au "${props.document}" en tant que collaborateur"`)
  }

  function HandlerRefuse(){

    console.log(`la demande de "${props.username}" a été refusée"`)
  }
    return (

 <Container>
  <Row>
  <Media>
  <Image src="" rounded width={68} height={68} />
  <Media.Body>
    <h5>{props.username}</h5>
    <p>
    {props.document}
    </p>
  </Media.Body>
</Media>
    <Col>
  
<div className="d-flex flex-row-reverse bd-highlight">
<div className="p-2 bd-highlight"> <Button variant="danger" type="submit"onClick ={HandlerRefuse}>Refuser</Button></div>
<div className="p-2 bd-highlight"> <Button variant="success" type="submit" onClick ={HandlerAccepter}>Accepter</Button></div>
  
</div></Col>
  </Row>
</Container>
     
      );
      }

  
  export default CollaborationRequest;