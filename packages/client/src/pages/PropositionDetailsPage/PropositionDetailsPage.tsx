import { formatDistance } from 'date-fns';
import * as Diff2Html from 'diff2html';
import { convertFromRaw, EditorState } from 'draft-js';
import React from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Vote from '../../components/Vote';
import { PROFILE } from '../../constants/uris';
import { useStoreState } from '../../hooks/store.hooks';
import { getDocumentById } from '../../services/document.service';
import { getRequestDetail } from '../../services/request.service';
import { getUserById } from '../../services/user.service';
import { getVoteStats } from '../../services/vote.service';
import MessageFormContainer from './Containers/MessageFormContainer';
import MessageListContainer from './Containers/MessageListContainer';

function PropositionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useStoreState((state) => state.user.user);
  const { isLoading, isError, data = {}, error } = useQuery(['request:getDetail', id], getRequestDetail);
  const { data: doc_data = {} } = useQuery(['document:getOld', data.documentId], getDocumentById);
  const { data: user = {} } = useQuery(['user:getUserByUsername', data.userId], getUserById);
  const { data: vote_data = {} } = useQuery(['vote:getStats', id], getVoteStats);
  const { voteCount, teamCount, voted } = vote_data;
  const isOwner = doc_data.owner === currentUser.id.toString();

  if (!doc_data.body) return null;
  const oldBody = convertFromRaw(doc_data.body ? JSON.parse(doc_data.body) : {});
  if (!data.body) return null;
  const newBody = convertFromRaw(data.body ? JSON.parse(data.body) : {});

  const Diff = require('diff');
  const oldBodyTxt = oldBody ? oldBody.getPlainText() : '';
  const newBodyTxt = newBody ? newBody.getPlainText() : '';
  ////////////// use Diff2Html ////////////
  const input = Diff.createPatch(doc_data.title, oldBodyTxt, newBodyTxt);
  let outputHtml = Diff2Html.html(input, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'side-by-side',
  });
  //////////////////////////////////////////
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
                  <Link to={PROFILE(user.username)}>{user.username}</Link>
                  {'\xa0'}
                  {formatDistance(new Date(), new Date(data.createdAt))}
                  {'\xa0'}ago
                </p>

                <Card>
                  <Editor editorState={EditorState.createWithContent(newBody)} readOnly={true} toolbarHidden />
                </Card>
              </Tab>
              <Tab eventKey="Comparer" title="Comparer" className="mt-5">
                {/* <div className="bg-white p-4 text-left" dangerouslySetInnerHTML={{ __html: display.innerHTML }} /> */}
                <div className="p-4" dangerouslySetInnerHTML={{ __html: outputHtml }} />
              </Tab>

              <Tab eventKey="Preview" title="Preview" className="mt-5">
                <div className="card-deck mb-3 text-center">
                  <div className="card  box-shadow">
                    <div className="card-header">
                      <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>
                        Old Version
                      </h4>
                    </div>
                    <div className="card-body">
                      <Editor editorState={EditorState.createWithContent(oldBody)} readOnly={true} toolbarHidden />
                    </div>
                  </div>
                  <div className="card  box-shadow">
                    <div className="card-header">
                      <h4 className="my-0 font-weight-light" style={{ fontSize: 'small' }}>
                        New Version
                      </h4>
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
          <Vote
            voteCount={voteCount}
            teamCount={teamCount}
            voted={voted}
            isOwner={isOwner}
            newBody={data.body}
            docId={data.documentId}
          />
        </Col>
      </Row>
    </>
  );
}

export default PropositionDetailsPage;
