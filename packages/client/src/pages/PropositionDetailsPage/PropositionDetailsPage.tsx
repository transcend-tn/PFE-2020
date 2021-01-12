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


function PropositionDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const { isLoading, isError, data = {}, error } = useQuery(['request:getDetail',id], getRequestDetail);
  const { isLoading: user_isLoading, isError: user_isError, data: user = {}, error: user_error } = useQuery(['user:getUserByUsername',data.userId], getUserById);
  console.log(data.body);
  if (!data.body) return null;
  const contentState = convertFromRaw(data.body ? JSON.parse(data.body) : {});
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
              
                    <h4  className="mb-0">{data.title}</h4>
                    <p className="mt-0 font-weight-light">
                      <Link to={PROFILE(user.username)}>
                      {user.username}
                      </Link>
                      {'\xa0'}{formatDistance(new Date(),new Date(data.createdAt))}{'\xa0'}ago
                      </p>

                <Card>
                    <Editor editorState={EditorState.createWithContent(contentState)} readOnly={true} toolbarHidden/></Card>
              </Tab>
              <Tab eventKey="Comparer" title="Comparer" className="mt-5">
                <Row>
                  <Col lg="6" className="mb-3">
                    <div className="card p-3">
                      OLD VERSION TEXT HERE
                      <p>
                        Quis eu cupidatat incididunt esse qui nisi qui do velit do occaecat magna. Ea excepteur est nisi
                        amet aliqua sint proident anim ex Lorem quis minim culpa. Laborum quis aute pariatur dolore
                        fugiat cillum exercitation voluptate ut nostrud minim eu ea ea. Mollit magna fugiat et mollit
                        ipsum voluptate veniam incididunt nisi sit do irure id mollit. Nisi aliqua duis fugiat aute do
                        nostrud ullamco nostrud excepteur. Tempor id Lorem esse esse reprehenderit irure reprehenderit
                        proident minim cupidatat ipsum.
                      </p>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="card p-3 min">
                      NEW VERSION TEXT HERE
                      <p>
                        Magna minim do et nulla sunt qui culpa enim consequat fugiat sunt. Reprehenderit anim est
                        ullamco cillum laborum ipsum ea ipsum mollit voluptate incididunt aliqua nostrud qui. Ut Lorem
                        in Lorem ad do consequat aute velit do. Culpa culpa est est sint eiusmod consectetur laboris non
                        dolor adipisicing laboris ad sint. Et cupidatat dolore ipsum duis eu ipsum aute do in officia
                        voluptate excepteur Lorem enim. Consectetur ea deserunt proident aliquip ad. Officia consequat
                        ut reprehenderit laborum aliquip nisi cupidatat cupidatat pariatur ullamco.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </div>
          <div className="bg-color-secondary card p-3 mt-5">
          <MessageFormContainer/>
          <MessageListContainer/>
          </div>
        </Col>

        <Col lg="4">
          <Vote yes={50} />
        </Col>
      </Row>
    </>
  );
}

export default PropositionDetailsPage;
