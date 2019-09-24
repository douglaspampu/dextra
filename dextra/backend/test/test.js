var assert = require('assert');
const menu = require('../menu/service');

let Menu = new menu();

describe('Menu tests', function() {
  describe('ingredients tests', function() {
    it ('should return true if all ingredients required in a payload exists in the menu', function() {
      assert.equal(true, Menu.validateIngredients(['ovo', 'hamburguer']));
    });
    it ('should return false if any of the ingredients does not exists on the menu', function() {
      assert.equal(false, Menu.validateIngredients(['peixe', 'hamburguer']));
    });
  });
  
  describe('menu tests', function() {
    it ('should return error when the meal is not found', function() {
      assert.throws(() => Menu.getMealPrice('xbacon1'), Error);
    });
    it ('should return the price of a xbacon', function() {
      const xbaconPrice = Menu.ingredients.bacon + Menu.ingredients.hamburguer + Menu.ingredients.queijo;
      assert.equal(xbaconPrice, Menu.getMealPrice('xbacon'))
    });
  });

  describe('personalized meals tests', function() {
    it ('should return error if an ingredient does not exists', function() {
      assert.throws(() => Menu.personalizeMeal(['peixe', 'hamburguer']), Error);
    });
    it ('should return the price of a meal', function() {
      const mealPrice = Menu.ingredients.ovo + Menu.ingredients.hamburguer;
      assert.equal(mealPrice, Menu.personalizeMeal(['ovo', 'hamburguer']));
    });
  });

  describe('promotions test', function() {
    it ('should not give discount if the ingredients does not apply to any rule', function() {
      assert.equal(1, Menu.applyDiscount(['teste'], 1))
    })
    it ('should return discount for a fit meal', function() {
      const lettuccePrice = Menu.ingredients.alface;
      const fitDiscountPrice = lettuccePrice - lettuccePrice * Menu.fitDiscount;
      assert.equal(fitDiscountPrice, Menu.applyDiscount(['alface'], lettuccePrice))
    });
    it ('should return discount for a much meat', function() {
      const hambuguersPrice = Menu.ingredients.hamburguer * 3;
      const muchMeatDiscount = Menu.ingredients.hamburguer * 2;
      assert.equal(muchMeatDiscount, Menu.applyDiscount(['hamburguer', 'hamburguer', 'hamburguer'], hambuguersPrice))
    });
    it ('should return double discount for a much meat', function() {
      const hambuguersPrice = Menu.ingredients.hamburguer * 6;
      const muchMeatDiscount = Menu.ingredients.hamburguer * 4;
      assert.equal(muchMeatDiscount, Menu.applyDiscount(['hamburguer', 'hamburguer', 'hamburguer', 
        'hamburguer', 'hamburguer', 'hamburguer'], hambuguersPrice))
    });
    it ('should return discount for a much cheese', function() {
      const cheesePrice = Menu.ingredients.queijo * 3;
      const muchCheeseDiscount = Menu.ingredients.queijo * 2;
      assert.equal(muchCheeseDiscount, Menu.applyDiscount(['queijo', 'queijo', 'queijo'], cheesePrice))
    });
    it ('should return one discount for a much cheese even whith 4 elements', function() {
      const cheesePrice = Menu.ingredients.queijo * 4;
      const muchCheeseDiscount = Menu.ingredients.queijo * 3;
      assert.equal(muchCheeseDiscount, Menu.applyDiscount(['queijo', 'queijo', 'queijo',  'queijo'], cheesePrice))
    });
    it ('should apply discount for much meat and much cheese', function () {
      const cheesePrice = Menu.ingredients.queijo * 3;
      const muchCheeseDiscount = Menu.ingredients.queijo * 2;
      const hambuguersPrice = Menu.ingredients.hamburguer * 3;
      const muchMeatDiscount = Menu.ingredients.hamburguer * 2;
      assert.equal(muchMeatDiscount + muchCheeseDiscount, 
        Menu.applyDiscount(['queijo', 'queijo', 'queijo', 
          'hamburguer', 'hamburguer', 'hamburguer'], cheesePrice + hambuguersPrice))
    });
  });
});
