import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url: string = 'http://localhost:5000/api/v1/'
  constructor(private http: HttpClient) { }

  getMenu(){
    return this.http.get(this.url + 'menu');
  }

  getIngredients(){
    return this.http.get(this.url + 'ingredients');
  }

  buyMeal(meal) {
    return this.http.post(this.url + 'placeOrder', meal);
  }
}