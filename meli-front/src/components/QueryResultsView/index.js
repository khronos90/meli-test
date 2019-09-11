import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import './QueryResultsView.scss';
import '../../styles/shared.scss';
import Article from '../shared/Article';
import { CategoriesContext } from '../CategoriesContext';
import NotFound from '../shared/NotFound';

function QueryResultsView({ history, ...props }) {
  const [_, setCategories] = useContext(CategoriesContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const queryValue = queryString.parse(history.location.search).query;

    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:8001/api/items?query=' + queryValue,
      );
      const newItems = result.data;
      setData(newItems.items ? newItems.items : []);
      setCategories(newItems.categories ? newItems.categories : [])
    };

    fetchData();
  }, [history.location.search])

  return (
    <main className="content query-results border-radius-4px">
      {data.length > 0 ?
        data.map((art, idx) => {
          return (
            <React.Fragment key={idx}>
              <Article {...art} />
            </React.Fragment>
          )
        }) : <NotFound message="No se encontraron artículos"/>}
    </main>
  )
}

export default withRouter(QueryResultsView);