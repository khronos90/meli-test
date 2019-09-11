import React from 'react';
import { Link } from 'react-router-dom';

import './Article.scss';
import shippingImg from './ic_shipping.png';
import { formatMoney } from '../../../helpers/currency';


export default function Article({ picture, price, title, province, free_shipping, id, ...props }) {
  return (
    <Link to={`/items/${id}`} className="article-item">
      <img src={picture}
        className="article-item__image border-radius-4px"
        alt={`Imagen de ${title}`}
        style={{ width: 180, height: 180, background: 'black' }}
      />
      <div className="article-item__description">
        <div
          className="article-item__cost money-sign">
          {formatMoney(price)}
          {free_shipping && <img alt="Imagen de camion de transporte" className="article-item__shipping-img" src={shippingImg}/>} 
        </div>
        <div
          className="article-item__title"
          dangerouslySetInnerHTML={{ __html: title }}>
        </div>
        <div
          className="article-item__province">
          {province}
        </div>
      </div>
      <hr className="article-item-line-separator" />
    </Link>
  );
}