import React, { useState } from 'react';
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { FaStar } from "react-icons/fa";


function Favoris(props: any) {
  

    const [color, setColor] = useState('#f5bf42');

    function toggleStar(){
        setColor(color==='#f5bf42'?'gray':'#f5bf42')
    }
    
    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    <Media>
                        <Media.Body>
                            <h5 className="text-primary"> {props.document} </h5>
                            <p className="text-secondary"> {props.timeEdit} </p>
                        </Media.Body>
                    </Media>
                </Col>
                <Col xs={6} md={4}>
                 <FaStar color={color} onClick={toggleStar}/>
  
                </Col>
            </Row>    
        </Container>                  
           
    );
}

export default Favoris;