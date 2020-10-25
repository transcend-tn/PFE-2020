import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import Card from 'react-bootstrap/esm/Card';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Vote from '../components/Vote';

const pr = {
  title: 'document-01',
  createdAt: '01/10/2020',
  body:
    'Id duis reprehenderit nostrud sint ea nostrud fugiat aliqua exercitation nostrud nostrud ad do mollit. Dolor reprehenderit culpa pariatur duis aute duis ut dolore. Minim officia do Lorem sunt sit nulla Lorem. Ut non velit irure nisi sit Lorem cillum nisi laboris labore qui est minim ad. Amet do officia officia amet voluptate ex voluptate cupidatat reprehenderit ullamco ad cillum consectetur. Consequat deserunt id eu adipisicing irure dolore deserunt eu duis tempor ut adipisicing. Aliquip et est quis ut consectetur qui Lorem ullamco aliqua id enim cillum.',
};

function PropositionDetailsPage() {
  return (
    <>
      <Row>
        <Col lg="8" className="mb-3">
          <div className="card p-3">
            <Tabs defaultActiveKey="Proposition" id="uncontrolled-tab">
              <Tab eventKey="Proposition" title="Proposition de Modification" className="mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title>{pr.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"> {pr.createdAt}</Card.Subtitle>
                    <Card.Text>{pr.body}</Card.Text>
                  </Card.Body>
                </Card>
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
            <MessageForm />
            <MessageList />
          </div>
        </Col>

        <Col lg="4">
          <Vote yes={50} no={20} />
        </Col>
      </Row>
    </>
  );
}

export default PropositionDetailsPage;
