import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Media from 'react-bootstrap/esm/Media';
import { BsClock } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import { format } from 'date-fns';
import { PROFILE, DOCUMENT_CLONE } from '../constants/uris';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/esm/Modal';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

function MyVerticallyCenteredModal(props: any) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Editor
          editorState={EditorState.createWithContent(convertFromRaw(props.body ? JSON.parse(props.body) : {}))}
          readOnly={true}
          toolbarHidden
        />
      </Modal.Body>
    </Modal>
  );
}
export interface HistoryCardProps {
  title: string;
  body: string;
  user: string;
  time: string;
}

function HistoryCard(props: HistoryCardProps) {
  const { title, body, user, time } = props;
  const [modalShow, setModalShow] = React.useState(false);
  const onCopyHistory = () => {
    console.log('onCopyHistory');
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <Media className="border mb-2 max-width-300">
        <Media.Body className="d-flex justify-content-between align-items-center p-2">
          <div>
            <span>
              {' '}
              <Link to={'#'} onClick={() => setModalShow(true)} style={{ color: '#000000' }}>
                {title}
              </Link>
            </span>
            <div className="d-flex flex-row flex-center font-weight-light">
              <span className="mr-2">
                <Link to={PROFILE(user)}>{user}</Link>
              </span>
              <span className="text-secondary">
                <BsClock size={12} color="#9E9E93" className="mr-1" />
                {format(new Date(time), 'd MMMM, HH:mm')}
              </span>
            </div>
          </div>
          <Link to={{ pathname: DOCUMENT_CLONE, state: { body: body } }}>
            <MdContentCopy color="#33A2FF" />
          </Link>
        </Media.Body>
      </Media>

      <MyVerticallyCenteredModal title={title} body={body} show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default HistoryCard;
