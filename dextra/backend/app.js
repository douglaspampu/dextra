import express from 'express';
import bodyParser from 'body-parser';
var cors = require('cors');
const menuController = require('./menu/controler');

let Menu = new menuController();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/v1/menu', (req, res) => {
  res.status(200).send({
    success: 'true',
    menu: Menu.getMenuMeals()
  })
});

app.get('/api/v1/ingredients', (req, res) => {
  res.status(200).send({
    success: 'true',
    menu: Menu.getIngredients()
  });
});

app.post('/api/v1/placeOrder',  (req, res) => {
  try{
    const orderPrice = Menu.placeOrder(req.body);
    res.status(200).send({
      success: 'true',
      finalPrice: orderPrice
    })
  } catch (error) {
    res.status(500).send({
      success: 'false',
      errorStatus: error
    });
  }
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});