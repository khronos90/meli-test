const axios = require('axios');

const API_URL = 'https://api.mercadolibre.com';
const PRODUCT_FETCH_LIST = API_URL + '/sites/MLA/search?q=';
const PRODUCT_FETCH = API_URL + '/items';
const CURRENCY_FETCH = API_URL + '/currencies';

const fetchProductList = async (query) => {
  return await axios({
    url: PRODUCT_FETCH_LIST + query,
    method: 'GET',
    params: { limit: 4 }
  })
}

const fetchProduct = (query) => {
  return axios({
    url: `${PRODUCT_FETCH}/${query}`,
    method: 'GET',
  })
}

const fetchProductDesc = (query) => {
  return axios({
    url: `${PRODUCT_FETCH}/${query}/description`,
    method: 'GET',
  })
}

const fetchCurrencyInfo = (query) => {
  return axios({
    url: `${CURRENCY_FETCH}/${query}`,
    method: 'GET',
  })
}

const fetchCurrency = () => {
  const currencies = {};
  return (currency) => {
    return new Promise((resolve, reject) => {
      if (currencies[currency]) resolve(currencies);
      fetchCurrencyInfo(currency)
        .then(currencyData => {
          currencies[currency] = {
            currency: currencyData.data.symbol,
            decimals: currencyData.data.decimal_places
          }
          resolve(currencies)
        })
        .catch(err => {
          reject(err);
        })
    })
  }
}

module.exports = {
  fetchProduct,
  fetchProductDesc,
  fetchProductList,
  fetchCurrency
}