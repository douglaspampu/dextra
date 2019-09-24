const menu = require('./service');

class menuController {
    constructor() {
        this.Menu = new menu();
    }

    getMenuMeals() {
        return this.Menu.menu;
    }

    getIngredients() {
        return this.Menu.ingredients;
    }

    placeOrder(body) {
        if (body.meal) {
            return this.Menu.getMealPrice(body.meal);
        } else if (body.ingredients) {
            return this.Menu.personalizeMeal(body.ingredients);
        } else {
            throw new Error ('OperationNotSupported');
        }
    }
}

module.exports = menuController;