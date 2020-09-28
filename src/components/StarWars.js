import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';

const StarWars = ({ item }) => (
  <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
    <Card border="primary" style={{ width: '100%', height: '100%' }}>
      <Card.Header><Card.Title>{item.name}</Card.Title></Card.Header>
      <Card.Body>
        <React.Fragment>
          <Row>
            <Col>
              <Card.Text>
                <strong>
                  Gender:
              </strong>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {item.gender}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>
                  Birth year
            </strong>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {item.birth_year}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>
                  Height
          </strong>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {item.height}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>
                  Mass
          </strong>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {item.mass}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                <strong>
                  Hair color
          </strong>
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                {item.hair_color}
              </Card.Text>
            </Col>
          </Row>
        </React.Fragment>
      </Card.Body>
    </Card>
  </Col>
);

StarWars.propTypes = {
  item: PropTypes.object,
};

export default StarWars;
