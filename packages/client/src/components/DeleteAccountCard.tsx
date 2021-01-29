import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/esm/Card';
import Modal from 'react-bootstrap/esm/Modal';
import { USER_IMG } from '../constants/temp';

export interface DeleteAccountCardInterface {
  user: any;
  handleDelete: any;
}

function DeleteAccountCard(props: DeleteAccountCardInterface) {
  const { user, handleDelete } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function deleteAccount() {
    handleDelete();
    handleClose();
  }

  return (
    <>
      <Card>
        <Card.Body className="text-center">
          <Image className="border" width={100} height={100} src={user.img ? user.img : USER_IMG} roundedCircle />
          <h5 className="text-center mt-2 mb-0">{`${user.fname} ${user.lname}`}</h5>
          <p className="text-muted mt-0">@{user.username}</p>
          <Button className="btn-sm" type="submit" variant="danger" onClick={handleShow}>
            Supprimer le compte
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Attention !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Votre compte sera désactiver pendant 30 jours avant d'être supprimer définitivement</Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="danger" onClick={deleteAccount}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteAccountCard;
