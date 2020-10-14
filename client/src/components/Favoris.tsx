import React from 'react';
import Media from 'react-bootstrap/esm/Media';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MdStar } from "react-icons/md";



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
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <div className="p-2 bd-highlight">
                            <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={<MdStar color="#EFD807" />}
                                                checkedIcon={<MdStar color="#808080" />}
                                                name="checkedH"
                                            />
                                        }
                                        label=""
                                    />
                            </FormGroup> 
                        </div>
                    </div>
                </Col>
            </Row>    
        </Container>                  
           
    );
}

export default Favoris;