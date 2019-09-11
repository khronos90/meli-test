import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import './SearchInput.scss';

import magGlass from './ic_Search.png';

function SearchView({history, match, ...props}) {
  const [query, setQuery] = useState('')

  const onClick = () => {
    history.push(`/items?query=${query}`)
  }

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
  }

  return (
    <div className="search-input">
      <input
        type="text"
        className="input border-radius-4px__left"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nunca dejes de buscar"
        onKeyDown={onKeyPress}
      />
      <button
        className="btn search-btn border-radius-4px__right"
        onClick={onClick}>
        <img alt="Imagen de lupa de búsqueda" src={magGlass} /></button>
    </div>)
}

export default withRouter(SearchView);