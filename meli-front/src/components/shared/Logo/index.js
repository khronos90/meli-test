import React from 'react';
import { withRouter } from 'react-router-dom';

import './Logo.scss';
import min_logo from "./Logo_ML.png";

function Logo({history, ...props}) {
  return (
    <img className="logo" alt="Logo de Mercado Libre" src={min_logo} onClick={() => history.push('/')}/>)
}

export default withRouter(Logo);