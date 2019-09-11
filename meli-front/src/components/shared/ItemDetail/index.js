import React from 'react';

import './ItemDetail.scss';
import { formatMoney } from '../../../helpers/currency';


export default function ItemDetail({title, price, description, sold_quantity, condition, picture, ...props}) {

  const itemConditionLocalized = (condition) => {
    switch (condition) {
      case 'new':
        return 'Nuevo';
      case 'used':
        return 'Usado';
      case 'Not specified by seller':
      default:
        return '';
    }
  }

  const itemsSold = (quantity) => {
    if (quantity) return `${quantity} vendidos`;
    return '0 vendidos';
  }

  const conditionAndQuantitySold = (item) => {
    return (
      <span>
        {itemConditionLocalized(condition)} - {itemsSold(sold_quantity)}
      </span>
    )
  }

  return (
    <React.Fragment>
      <div className="detail-view__image-container">
        <img className="border-radius-4px" alt={`Imagen de ${title}`} src={picture} />
      </div>
      <div className="detail-view__details-container">
        <div className="quantity-sold">
          {conditionAndQuantitySold(condition, sold_quantity)}
        </div>
        <div className="item-name">
          {title}
        </div>
        <div className="item-cost money-sign">
          {price && formatMoney(price)}
        </div>
        <div className="btn-buy-item">
          <button>Comprar</button>
        </div>
      </div>
      <div className="detail-view__description-container">
        <div className="description-title">
          Descripción del producto
        </div>
        <p className="description-content">
          {description}
        </p>
      </div>
      </React.Fragment>
  )
}