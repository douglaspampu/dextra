import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { ObjectUnsubscribedError } from 'rxjs';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  ingredients = {};
  selectedIngredients = [];
  loading: boolean;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.loading = true;

    this.menuService.getIngredients().subscribe(response => {
      this.ingredients = response['menu'];
      this.loading = false;
    });
  }

  getIngredients(){
    return Object.keys(this.ingredients);
  }

  addIngredient(ingredient) {
    this.selectedIngredients.push(ingredient);
  }

  buyMeal() {
    this.menuService.buyMeal({'ingredients': this.selectedIngredients}).subscribe(response => {
      alert('Seu lanche custou: ' + response['finalPrice']);
      this.selectedIngredients = [];
    });
  }
}
