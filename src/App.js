import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import StarWarList from './components/StarWarList';
import Pagination from './components/pagination';
import Search from './components/Search';
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
let paramId = 1;
function App(props) {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState('');
  const [nextPage, setNextPage] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  let history = useHistory();
  const location = useLocation();

  const match = useRouteMatch(location.pathname !== '/' ? '/page/:id' : '/');
  const [matchId, setMatchId] = useState("1");
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchPeople() {
      setLoading(true);
      let res = await fetch(`https://swapi.dev/api/people/?format=json&page=${paramId}`);
      let data = await res.json();
      setTotalRecords(data.count);
      setPeople(data.results);
      let params = data && data.next ? new URL(data.next).searchParams : null;
      setNextPage(params ? params.get('page') : null);
      let paramsPrev = data && data.previous ? new URL(data.previous).searchParams : null;
      setPreviousPage(paramsPrev ? paramsPrev.get('page') : null)
      setCurrentPage(paramId);
      setMatchId(match.params.id ? match.params.id : 1);
      setLoading(false);
      history.push(location.pathname !== '/' ? `/page/${matchId}` : '/');
    }
    fetchPeople();
  }, []);

  const handle_updateInputValue = (evt) => {
    setSearch(evt.target.value);
  };

  async function handle_fetchPeople(payload) {
    setLoading(true);
    const page = payload ? payload.currentPage : currentPage;
    let res = await fetch(`https://swapi.dev/api/people/?format=json&page=${page}&search=${search}`);
    let data = await res.json();

    setTotalRecords(data.count);
    setPeople(data.results);
    let params = data && data.next ? new URL(data.next).searchParams : null;
    setNextPage(params ? params.get('page') : null);
    let paramsPrev = data && data.previous ? new URL(data.previous).searchParams : null;
    setPreviousPage(paramsPrev ? paramsPrev.get('page') : null);
    setCurrentPage(payload.currentPage ? payload.currentPage : currentPage);
    setLoading(false);
    history.push(`/page/${page}`);
  }

  return (
    <div className="App">
      {loading &&
        <div className="loader">
        </div>
      }

      <Router>
        <Container>
          <Row>
            <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
              <Search
                updateInputValue={handle_updateInputValue}
                submitSearchValue={handle_fetchPeople}
                history={history}
              />
            </Col>
            <Col xs="12" lg="6" style={{ margin: '15px 0' }}>

              {people &&
                <Pagination
                  totalRecords={totalRecords}
                  pageLimit={itemsPerPage}
                  next={Number(nextPage) || 0}
                  previous={Number(previousPage) || 0}
                  fetchPeople={handle_fetchPeople}
                  currentPage={Number(currentPage) || 1}
                  history={history}
                />
              }
            </Col>
          </Row>
          <StarWarList
            currentPage={currentPage}
            totalRecords={totalRecords}
            data={people}
            fetchBooks={people}
            match={match}
            location={location}
          />
          <Switch>
            <Route path="/page/:id" children={<Child />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}
function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  console.log("id", id);
  paramId = id > 0 ? id : 1;
  return (
    <div>
      {/* <h3>ID: {id}</h3> */}
    </div>
  );
}
export default App;