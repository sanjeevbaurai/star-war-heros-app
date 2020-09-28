import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import StarWars from './StarWars';


function StarWarList({ currentPage, totalRecords, data }) {

  return (
    data &&
    <React.Fragment>
      {totalRecords > 0 &&
        <Row style={{ margin: '10px 0px 10px 0px' }}>
          Page: {currentPage}
        </Row>
      }
      <Row>
        {data && data.map((e, i) => (
          <StarWars item={e} key={i} />
        ))}
        {data && data.length === 0 &&
          <Col lg="12" style={{ margin: '15px 0' }} className="text-center">
            <div style={{ maxWidth: '400px', width: '100%' }}>No result found...</div>
          </Col>
        }
      </Row>
    </React.Fragment>
  );
}

export default StarWarList;
