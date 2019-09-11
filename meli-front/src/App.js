import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';

import './App.scss';
import './styles/shared.scss';

import { CategoriesProvider } from './components/CategoriesContext';
import SearchView from './components/SearchView'
import QueryResultsView from './components/QueryResultsView';
import Breadcrumb from './components/shared/Breadcrumb';
import DetailView from './components/DetailView';

function App() {
  return (
    <Router history={history}>
      <CategoriesProvider>
        <div className="app-container">
          <SearchView />
          <div className="container">
            <div className="content">
              <Breadcrumb />
            </div>
          </div>
          <div className="container">
            <Route exact path="/items" component={QueryResultsView} />
            <Route path="/items/:id" component={DetailView} />
          </div>
        </div>
      </CategoriesProvider>
    </Router>
  );
}

export default App;
