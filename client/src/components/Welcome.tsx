import React from 'react';
import Jumbotron from 'react-bootstrap/esm/Jumbotron';
import Media from 'react-bootstrap/esm/Media';
import { RiTeamLine, RiThumbUpLine, RiHistoryLine, RiEarthFill } from 'react-icons/ri';

function Welcome() {
  return (
    <>
      <Jumbotron>
        <div className="text-primary text-center">
          <h4>Un espace dédié à vos projets collaboratifs !</h4>
          <h4>Collaborez, Partagez et Modifiez un même document</h4>
        </div>
      </Jumbotron>
      <div className="d-flex flex-wrap justify-content-around  mt-5">
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
    </>
  );
}

export default Welcome;
