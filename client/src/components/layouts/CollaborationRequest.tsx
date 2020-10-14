import React from "react";
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';





function CollaborationRequest() {

  function clickHandler1(){

    console.log('John Doe a été ajouté au document(1) en tant que collaborateur')
  }

  function clickHandler2(){

    console.log('la demande de John Doe a été refusée')
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
    <h5>John Doe</h5>
    <p>
     Document
    </p>
  </Media.Body>
</Media>
    <Col>
  
<div className="d-flex flex-row-reverse bd-highlight">
<div className="p-2 bd-highlight"> <Button variant="danger" type="submit"onClick ={clickHandler2}>Refuser</Button></div>
<div className="p-2 bd-highlight"> <Button variant="success" type="submit" onClick ={clickHandler1}>Accepter</Button></div>
  
 
</div></Col>
  </Row>
</Container>
     
      );
      }

  
  export default CollaborationRequest;