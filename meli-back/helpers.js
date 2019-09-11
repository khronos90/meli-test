const author = {
  name: "",
  lastname: ""
}

const getCategories = (values) => {
  if (values) {
    const filterCategory = values.filter(e => e.id === 'category');
    if (filterCategory.length && filterCategory.values) {
      const filterCategoryValues = filterCategory[0].values[0];
      const filterCategories = filterCategoryValues.path_from_root.map(e => e.name)
      return filterCategories;
    }
  }
  return [];
}

const currencyToPrice = (amount, {currency, decimals}) => {
  let intAmount = parseInt(amount);
  let decAmount = amount % intAmount;
  return {
    currency: currency,
    amount: intAmount,
    decimals: parseInt(decAmount * Math.pow(10, decimals))
  }
}

const jsonToProduct = (item, currency) => {
  return {
    id: item.id,
    title: item.title,
    price: {...currencyToPrice(item.price, currency)},
    condition: item.condition,
    free_shipping: item.shipping.free_shipping
  }
}

const jsonToProductList = (results, currencies) => {
  return results.map(item => {
    const itemParsed = jsonToProduct(item, currencies[item.currency_id]);
    return {
      ...itemParsed,
      picture: item.thumbnail,
    }
  })
}

const jsonToProductDetails = (item, itemDescription, currencies) => {
  return {
    ...jsonToProduct(item, currencies[item.currency_id]),
    picture: item.pictures[0].url,
    sold_quantity: item.sold_quantity,
    description: itemDescription.plain_text
  }
}

module.exports = {
  author,
  getCategories,
  jsonToProductList,
  jsonToProductDetails
};