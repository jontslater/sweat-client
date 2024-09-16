import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PlaceholderPage = () => (
  <Container
    className="text-center"
    style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}
  >
    <Row>
      <Col>
        <h1>Workout Page</h1>
      </Col>
    </Row>
  </Container>
);

export default PlaceholderPage;
