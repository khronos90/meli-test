import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import ItemDetail from '../shared/ItemDetail';
import NotFound from '../shared/NotFound';

function DetailView({match, history, ...props}) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const artId = match.params.id;
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:8001/api/items/${artId}`,
        );
        setItem(result.data.item);
      };
    fetchData();
  }, [match.params.id])

  return (
    <div className="content detail-view">
      {(item ? 
      <ItemDetail {...item} />
      : <NotFound message="No se encontro el artículo." />
      )}
    </div>
  )
}

export default withRouter(DetailView)