import React, { useContext } from 'react';

import { CategoriesContext } from '../../CategoriesContext';
import './Breadcrumb.scss';

export default function Breadcrumb({ ...props }) {
  const [categories, _] = useContext(CategoriesContext);
  return (
    <div className="bread-crumb">
      {categories.length ? categories.join(' > ') : "Sin categoría"}
    </div>
  )
}