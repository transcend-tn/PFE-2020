import React from "react";
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';





function CollaborationRequest() {

  const username = 'John Doe';
  const document = 'doc 1';

  function HandlerAccepter(){

    console.log(`${username} " a été ajouté au "${document}" en tant que collaborateur"`)
  }

  function HandlerRefuse(){

    console.log(`la demande de "${username}" a été refusée"`)
  }

   
    return (

 <Container>
  <Row>
  <Media>
  <img
    width={64}
    height={64}
    className="mr-3"
    src="holder.js/64x64"
    alt=""
  />
  <Media.Body>
    <h5>{username}</h5>
    <p>
    {document}
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