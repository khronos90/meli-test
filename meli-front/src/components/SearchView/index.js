import React, { Component } from 'react';

import './SearchView.scss';

import SearchInput from '../shared/SearchInput'
import Logo from '../shared/Logo';

export default class SearchView extends Component {

  render() {
    console.log(window.location.host);
    return (
      <header className="header">
        <div className="content">
          <div className="search-view">
            <Logo style={{
              padding: 4,
              marginRight: 20
            }} />
            <SearchInput />
          </div>
        </div>
      </header>)
  }
}
