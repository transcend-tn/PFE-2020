import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { MdStar } from "react-icons/md";
import FormCheck from 'react-bootstrap/esm/FormCheck';



function Favoris() {
    
    return (
        <Container>
            <Row>
                <Col xs={12} md={8}>
                    <Media>
                        <Media.Body>
                            <h5 className="text-primary"> Document </h5>
                            <p className="text-secondary"> Edited 20hr ago </p>
                        </Media.Body>
                    </Media>
                </Col>
                <Col xs={6} md={4}>
                    
                    <FormCheck 
                        type="checkbox" 
                        icon={<MdStar color="#EFD807" />}
                        checkedIcon={<MdStar color="#808080" />}
                        name="checkedH" />         
                </Col>
            </Row>    
        </Container>                  
           
    );
}

export default Favoris;