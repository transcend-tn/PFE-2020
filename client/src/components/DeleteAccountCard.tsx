import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/esm/Card';
import Modal from 'react-bootstrap/esm/Modal';

export interface DeleteAccountCardInterface {
  username: string;
  img?: string;
}
function DeleteAccountCard(props: DeleteAccountCardInterface) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function HandlerSupprimer() {
    console.log('Votre compte à été supprimé');
    handleClose();
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <div className="text-center">
            <Image
              style={{ border: '1px solid #222' }}
              width={100}
              height={100}
              src={
                props.img
                  ? props.img
                  : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png'
              }
              roundedCircle
            />
          </div>
          <h5 className="text-center mt-3 mb-3">{props.username}</h5>

          <div className="text-center mt-4">
            <Button className="btn-sm" type="submit" variant="danger" onClick={handleShow}>
              Supprimer le compte
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Attention !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Votre compte sera désactiver pendant 30 jours avant d'être supprimer définitivement</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={HandlerSupprimer}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default DeleteAccountCard;
