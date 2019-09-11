const express = require('express');
const app = express();
const cors = require('cors')

const bodyParse = require('body-parser');
const PORT = 8001;

const { author,
  getCategories,
  jsonToProductList,
  jsonToProductDetails } = require('./helpers');
const { fetchProduct,
  fetchProductDesc,
  fetchProductList,
  fetchCurrency } = require('./product_api');


app.use(bodyParse.urlencoded({ extended: true }));
const currencyManager = fetchCurrency();
app.use(cors());
app.set('getCurrency', currencyManager);

app.get('/api/items', (req, res) => {
  const query = req.query.query;
  if (query) {
    const currencyManager = req.app.get('getCurrency');
    fetchProductList(query)
      .then(data => {
        const { results, filters } = data.data;
        if (results.length) {
          const uniqueCurrencies = new Set(results.map(e => e.currency_id));
          Promise.all(Array.from(uniqueCurrencies).map(e => currencyManager(e)))
            .then(currencies => {
              const items = jsonToProductList(results, ...currencies)
              const response = {
                author,
                categories: getCategories(filters),
                items
              }
              return res.status(200).send(response);
            })
            .catch(err => res.status(500));
        }
      }).catch(err => {
        console.warn(err)
        return res
          .status(err.response.data.status)
          .send({ err: err.response.data })
      })
  } else {
    return res.status(200).send("No query");
  }
});

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    const currencyManager = req.app.get('getCurrency');
    Promise.all([fetchProduct(id), fetchProductDesc(id)])
      .then(([itemDetails, itemDescription]) => {
        if (itemDetails.data) {
          currencyManager(itemDetails.data.currency_id)
            .then(currency => {
              const response = {
                author,
                item: jsonToProductDetails(itemDetails.data, itemDescription.data, currency),
              }
              return res
                .status(200)
                .send(response)
            })
        } else {
          return res.status(404).send("No se encontraron articulos");
        }
      })
      .catch(err => {
        console.warn(err)
        return res
          .status(err.response.data.status)
          .send({ err: err.response.data })
      })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
