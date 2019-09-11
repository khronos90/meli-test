import React from 'react';

import './NotFound.scss';

export default function NotFound({message, ...props}) {
  return (
    <div className="not-found border-radius-4px">
      <span>{message}</span>
    </div>
  )
}