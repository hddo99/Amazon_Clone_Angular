import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: any[] = [];  // a temp item array
  constructor() { }

  addProduct = (product) => {
    let itemsFromLocalStorage = this.get_shopping_cart_items();
    if(itemsFromLocalStorage){  // if cart already has items
      itemsFromLocalStorage.push(product)    // push item to cart
      localStorage.setItem('shopping_cart', JSON.stringify(itemsFromLocalStorage))
    }
    else {      // no items in cart yet
      this.items.push(product) 
      localStorage.setItem('shopping_cart', JSON.stringify(this.items))
    }
  }

  get_shopping_cart_items = () => {
    let items = localStorage.getItem('shopping_cart');
    return JSON.parse(items);
  }

  getCartLength = () => {
    let items = this.get_shopping_cart_items();
    return items ? this.get_shopping_cart_items().length : 0;
  }

  getTotal = ()=>{
    let items = this.get_shopping_cart_items();
    return items ?.reduce((acc, item)=> acc+ item.price, 0)
  }

  removerItem=(p)=>{
    console.log('calling remover ', p)
    let items = this.get_shopping_cart_items();
    
    const index = items.findIndex(item=> item.id == p.id);
    if(index>=0){
      console.log('hitting if')
      items.splice(index, 1);
      return localStorage.setItem('shopping_cart', JSON.stringify(items))
    }

  }
}
