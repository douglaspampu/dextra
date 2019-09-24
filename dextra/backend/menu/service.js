class Menu {
    constructor(){
        this.ingredients = {
            alface: 0.40,
            bacon: 2.0,
            hamburguer: 3.0,
            ovo: 0.8,
            queijo: 1.5
        };

        this.menu = {
            xbacon: ['bacon', 'hamburguer', 'queijo'],
            xburguer: ['hamburguer', 'queijo'],
            xegg: ['ovo', 'hamburguer', 'queijo'],
            xeggBacon: ['ovo', 'hamburguer', 'queijo', 'bacon']
        }

        this.fitDiscount = 0.1;

    }

    validateIngredients(ingredientsList) {
        return ingredientsList.filter(ingredient => this.ingredients[ingredient]).length === ingredientsList.length;
    }

    getMealPrice(meal) {
        if (this.menu[meal]) {
            return this._sumIngredientsPrice(this.menu[meal]);
        } else {
            throw new Error('MealNotFound');
        }
    }

    personalizeMeal(ingredients) {
        if (this.validateIngredients(ingredients)) {
            const price = this._sumIngredientsPrice(ingredients);
            return this.applyDiscount(ingredients, price);
        } else {
            throw new Error('IngredientNotFound');
        }
    }

    _sumIngredientsPrice(ingredients) {
        return ingredients.map(ingredient => this.ingredients[ingredient]).reduce((sum, ingredientPrice) => {
            return sum + ingredientPrice;
        },0 );
    }

    applyDiscount(ingredients, price) {
        const meatCountDiscount = ingredients.filter(ingredient => ingredient === 'hamburguer').length / 3;
        if (meatCountDiscount > 0) {
            price = price - this.ingredients['hamburguer'] * Math.floor(meatCountDiscount);
        }
        
        const cheeseCountDiscount = ingredients.filter(ingredient => ingredient === 'queijo').length / 3;
        if (cheeseCountDiscount > 0) {
            price = price - this.ingredients['queijo'] * Math.floor(cheeseCountDiscount);
        }

        if (this._findLettuce(ingredients) && !this._findBacon(ingredients)) {
            price = price - price * this.fitDiscount;
        }

        return price;
    }

    _findLettuce(ingredients) {
        return ingredients.find(ingredient => {
            return ingredient === 'alface';
        })
    }

    _findBacon(ingredients) { 
        return ingredients.find(ingredient => {
            return ingredient === 'bacon';
        })
    }

    getIngredientPrice(ingredient) {
        return this.ingredients[ingredient];
    }

    getMealIngredients(mealName) {
        return this.menu[mealName];
        
    }


}

module.exports = Menu;