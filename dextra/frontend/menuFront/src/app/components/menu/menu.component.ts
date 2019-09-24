import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu = {};
  loading: boolean;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.loading = true;
    this.menuService.getMenu().subscribe(response => {
      this.menu = response['menu'];
      this.loading = false;
    });
  }

  getMenuItems() {
    return Object.keys(this.menu);
  }

  getIngredient(meal) {
    return this.menu[meal];
  }

  buyMeal(meal) {
    this.menuService.buyMeal({'meal': meal}).subscribe(response => {
      alert('Seu lanche custou: ' + response['finalPrice']);
    })
  }

}
