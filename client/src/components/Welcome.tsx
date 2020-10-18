import React from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Jumbotron from "react-bootstrap/esm/Jumbotron";
import Media from "react-bootstrap/esm/Media";
import Row from "react-bootstrap/esm/Row";
import { RiTeamLine, RiThumbUpLine, RiHistoryLine, RiEarthFill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Welcome() {

    return (
        <Jumbotron style={{backgroundImage: "linear-gradient(to bottom, black, #00bce2 91%, white)"}} >
            <div style={{ color: '#3b99e0' }}>
                <Row className="justify-content-md-center "   >
                    <Col xs lg="8">
                        <h4  >  Cette application est un espace dédié à vos projets </h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="9">
                        <h4 > collaboratifs.Collaborez, Partagez et Modifiez un même document </h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="4">
                        <h4 justify-content="center " > avec vos collaborateurs.</h4>
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-center flex-column mt-5 " >
                <Row className=" justify-content-center " >
                    <Col md={{ span: 5 }}>
                        <Media>
                            <RiTeamLine size={30} />
                            <Media.Body>
                                <h5 className={"col-sm"}>Collaboration</h5>
                                <p className={"col-sm"}>Travaillez ensemble sur la même version</p>
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col md={{ span: 5 }}>
                        <Media>
                            <RiThumbUpLine size={30}/>
                            <Media.Body>
                                <h5 className={"col-sm"}>Facilité d’utilisation</h5>
                                <p className={"col-sm"}>pas de complicité, Facile à manipuler</p>
                            </Media.Body>
                        </Media>
                    </Col>
                </Row>
                <Row className=" justify-content-center mt-2  ">
                    <Col md={{ span: 5 }}>
                        <Media>
                            <RiHistoryLine size={30} />
                            <Media.Body>
                                <h5 className={"col-sm"}>Historique du document</h5>
                                <p className={"col-sm"}> Revenez à n’importe quelle version précédente</p>
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col md={{ span: 5 }}>
                        <Media>
                            <RiEarthFill size={30} />
                            <Media.Body>

                                <h5 className={"col-sm"} >Travaillez n’importe où</h5>
                                <p className={"col-sm"}>Accédez à votre travail où que vous soyez</p>
                            </Media.Body>
                        </Media>
                    </Col>
                </Row>
                <div>
                    <Container className="justify-content-md-center mt-5">
                        <Row className="justify-content-md-center">
                            <Col xs lg="4">
                                <Link to="signup">
                                    <Button variant="primary" size="lg" >
                                    Inscrives-vous maintenant!
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Jumbotron>
    );
}

export default Welcome;

