import React from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Vote from '../../components/Vote';
import MessageFormContainer from './Containers/MessageFormContainer';
import MessageListContainer from './Containers/MessageListContainer';
import { getRequestDetail } from '../../services/request.service';
import { getUserById } from '../../services/user.service';
import { formatDistance } from 'date-fns';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { PROFILE } from '../../constants/uris';
import { getDocumentById } from '../../services/document.service';
import { getVoteStats } from '../../services/vote.service';
import { useStoreState } from '../../hooks/store.hooks';


function PropositionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = {}, error } = useQuery(['request:getDetail', id], getRequestDetail);
  const { isLoading: doc_isLoading, isError: doc_isError, data: doc_data = {}, error: doc_error } = useQuery(['document:getOld', data.documentId], getDocumentById);
  const { isLoading: user_isLoading, isError: user_isError, data: user = {}, error: user_error } = useQuery(['user:getUserByUsername', data.userId], getUserById);
  const { isLoading: vote_isLoading, isError: vote_isError, data: vote_data = {}, error: vote_error } = useQuery(['vote:getStats', id], getVoteStats);
  const {voteCount, teamCount, voted} = vote_data;
  const isOwner = doc_data.owner==currentUser.id;

  if (!doc_data.body) return null;
  const oldBody = convertFromRaw(doc_data.body ? JSON.parse(doc_data.body) : {});
  if (!data.body) return null;
  const newBody = convertFromRaw(data.body ? JSON.parse(data.body) : {});
  if (isError) {
    return <span>Error: {error} !</span>;
  }

  if (isLoading) {
    return <span>Chargement ...</span>;
  }
  return (
    <>
      <Row>
        <Col lg="8" className="mb-3">
          <div className="card p-3">
            <Tabs defaultActiveKey="Proposition" id="uncontrolled-tab">
              <Tab eventKey="Proposition" title="Proposition de Modification" className="mt-5">

                <h4 className="mb-0">{data.title}</h4>
                <p className="mt-0 font-weight-light">
                  <Link to={PROFILE(user.username)}>
                    {user.username}
                  </Link>
                  {'\xa0'}{formatDistance(new Date(), new Date(data.createdAt))}{'\xa0'}ago
                      </p>

                <Card>
                  <Editor editorState={EditorState.createWithContent(newBody)} readOnly={true} toolbarHidden /></Card>
              </Tab>


              <Tab eventKey="Comparer" title="Comparer" className="mt-5">
                <div className="card-deck mb-3 text-center">
                  <div className="card  box-shadow">
                    <div className="card-header">
                      <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>Old Version</h4>
                    </div>
                    <div className="card-body">
                      <Editor editorState={EditorState.createWithContent(oldBody)} readOnly={true} toolbarHidden />
                    </div>
                  </div>
                  <div className="card  box-shadow">
                    <div className="card-header">
                      <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>New Version</h4>
                    </div>
                    <div className="card-body">
                      <Editor editorState={EditorState.createWithContent(newBody)} readOnly={true} toolbarHidden />
                    </div>
                  </div>
                </div>

              </Tab>
            </Tabs>
          </div>
          <div className="bg-color-secondary card p-3 mt-5">
            <MessageFormContainer />
            <MessageListContainer />
          </div>
        </Col>

        <Col lg="4">
          <Vote voteCount={voteCount} teamCount={teamCount} voted={voted} isOwner={isOwner} newBody={data.body} docId={data.documentId}/>
        </Col>
      </Row>
    </>
  );
}

export default PropositionDetailsPage;
