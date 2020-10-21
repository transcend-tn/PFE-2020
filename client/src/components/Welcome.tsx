import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Media from 'react-bootstrap/esm/Media';
import { RiTeamLine, RiThumbUpLine, RiHistoryLine, RiEarthFill } from 'react-icons/ri';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function Welcome(props: any) {
  return (
    <div className="d-flex w-75">
      <div className="w-50 mr-3">
        <Jumbotron className="jumbotron text-center bg-white">
          <div className="container" style={{ maxWidth: '40rem' }}>
            <h1 className="jumbotron-heading">PFE 2020</h1>
            <p className="lead text-muted">
              Un espace dédié à vos projets collaboratifs ! Collaborez, Partagez et Modifiez un même document
            </p>
          </div>
        </Jumbotron>
        <div className="d-flex flex-wrap justify-content-around">
          <Media className="m-2 p-2 flex-fill">
            <RiTeamLine size={30} className="mr-3" />
            <Media.Body>
              <h5>Collaboration</h5>
              <p>Travaillez ensemble sur la même version</p>
            </Media.Body>
          </Media>
          <Media className="m-2 p-2 flex-fill">
            <RiThumbUpLine size={30} className="mr-3" />
            <Media.Body>
              <h5>Facilité d’utilisation</h5>
              <p>pas de complicité, Facile à manipuler</p>
            </Media.Body>
          </Media>
          <Media className="m-2 p-2 flex-fill">
            <RiHistoryLine size={30} className="mr-3" />
            <Media.Body>
              <h5>Historique du document</h5>
              <p> Revenez à n’importe quelle version précédente</p>
            </Media.Body>
          </Media>
          <Media className="m-2 p-2 flex-fill">
            <RiEarthFill size={30} className="mr-3" />
            <Media.Body>
              <h5>Travaillez n’importe où</h5>
              <p>Accédez à votre travail où que vous soyez</p>
            </Media.Body>
          </Media>
        </div>
      </div>
      <div className="w-50">
        <Tabs defaultActiveKey="signin" id="uncontrolled-tab">
          <Tab eventKey="signin" title="Connexion">
            <SignInForm />
          </Tab>
          <Tab eventKey="signup" title="Inscription">
            <SignUpForm />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Welcome;
