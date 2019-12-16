import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  itemsObjects = {
    small: {
      number: 0,
      minus: true,
      plus: false,
      price: 150
    },
    medium: {
      number: 1,
      minus: true,
      plus: false,
      price: 200
    },
    large: {
      number: 0,
      minus: true,
      plus: false,
      price: 300
    },
    adults: {
      number: 1,
      minus: true,
      plus: false
    },
    children: {
      number: 0,
      minus: true,
      plus: false
    },
    maxTotalPrice : 1000,
    minTotalPrice: 200
  }
  
  
  
  arrayList = [];
  totalPrice: Number;
  constructor() {
   this.totalPrice=200;
    
  }

  getTotalPrice = (small,medium,large) =>{
    const totalPrice =
      (small.number * small.price) +
      (medium.number * medium.price) +
      (large.number * large.price);
    return totalPrice;
  }

  handler(name, type) {
    let newItemsObjects = this.itemsObjects;
    name = name.toLowerCase();
    let value = newItemsObjects[name].number
    console.log(name + value)
    if (type === 'minus')
      value -= 1;
    else value += 1;
    newItemsObjects[name.toLowerCase()].number = value;
    
    this.disabledButtonHandler(newItemsObjects, name, type);
    this.totalPrice = this.getTotalPrice(newItemsObjects.small,newItemsObjects.medium,newItemsObjects.large);
  }

  disabledButtonHandler(props, name, type) {

    let newItemsObjects = props;
    const { small, medium, large } = newItemsObjects;
    switch (name) {
      case 'small':
        if (type === 'plus') {
          newItemsObjects.children.number += 1;
          if (newItemsObjects.small.number % 2 === 0) {
            newItemsObjects.small.number = 0;
            newItemsObjects.medium.number += 1;
            if (newItemsObjects.medium.number % 2 === 0) {
              newItemsObjects.medium.number = 0;
              newItemsObjects.large.number += 1;
            }
          }
        } else {
          newItemsObjects.children.number -= 1;
        }
        break;
      case 'medium':
        if (type === 'plus') {
          newItemsObjects.adults.number += 1;
          if (newItemsObjects.medium.number % 2 === 0) {
            newItemsObjects.medium.number = 0;
            newItemsObjects.large.number += 1;
          }
        } else {
          if (newItemsObjects.adults.number > 1) newItemsObjects.adults.number -= 1;
          else newItemsObjects.children.number -= 2;
        }
        break;
      case 'large':
        if (type === 'plus') {
          newItemsObjects.adults.number += 2;
        } else {
          if (newItemsObjects.adults.number > 1)
            if (newItemsObjects.adults.number === 2) {
              newItemsObjects.adults.number -= 1;
              newItemsObjects.children.number -= 2;
            } else {
              newItemsObjects.adults.number -= 2;
            }
          else newItemsObjects.children.number -= 4;
        }
        break;
      case 'adults':
        if (type === 'plus') {
          newItemsObjects.medium.number += 1;
          if (newItemsObjects.medium.number % 2 === 0) {
            newItemsObjects.medium.number = 0;
            newItemsObjects.large.number += 1;
          }
        } else {
          if (newItemsObjects.medium.number > 1) newItemsObjects.medium.number -= 1;
          else {
            newItemsObjects.medium.number += 1;
            newItemsObjects.large.number -= 1;
          }
        }
        break;
      case 'children':
        if (type === 'plus') {
          newItemsObjects.small.number += 1;
          if (newItemsObjects.small.number % 2 === 0) {
            newItemsObjects.small.number = 0;
            newItemsObjects.medium.number += 1;
            if (newItemsObjects.medium.number % 2 === 0) {
              newItemsObjects.medium.number = 0;
              newItemsObjects.large.number += 1;
            }
          }
        } else {
          if (newItemsObjects.small.number > 0) newItemsObjects.small.number -= 1;
          else if (newItemsObjects.large.number > 0) {
            if (newItemsObjects.medium.number > 0) {
              newItemsObjects.medium.number -= 1;
              newItemsObjects.small.number += 1;
            } else {
              newItemsObjects.large.number -= 1;
              newItemsObjects.medium.number += 1;
              newItemsObjects.small.number += 1;
            }
          }
        }
        break;
      default:
        break;
    }
   
    newItemsObjects.totalPrice=this.getTotalPrice(small,medium,large);
    Object.keys(newItemsObjects).map((ele) => {
      if (typeof (newItemsObjects[ele]) === "object") {
        if (newItemsObjects[ele]['number'] < 1)
          newItemsObjects[ele]['minus'] = true;
        else
          newItemsObjects[ele]['minus'] = false;
        if (newItemsObjects[ele]['price'] !== undefined) {
          if ((newItemsObjects.totalPrice + newItemsObjects[ele]['price']) / newItemsObjects[ele]['price'] > newItemsObjects.maxTotalPrice / newItemsObjects[ele]['price'])
            newItemsObjects[ele]['plus'] = true;
          else
            newItemsObjects[ele]['plus'] = false
          if (((newItemsObjects.totalPrice - newItemsObjects[ele]['price']) / newItemsObjects[ele]['price'] < newItemsObjects.minTotalPrice / newItemsObjects[ele]['price']) || newItemsObjects[ele].number === 0)
            newItemsObjects[ele]['minus'] = true;
          else
            newItemsObjects[ele]['minus'] = false
        } else {
          if (newItemsObjects.medium.plus && newItemsObjects.large.plus && newItemsObjects.small.plus) {
            newItemsObjects.adults.plus = true;
            newItemsObjects.children.plus = true;
          } else {
            newItemsObjects.adults.plus = false;
            newItemsObjects.children.plus = false;
          }
          if (newItemsObjects.adults.number === 1) newItemsObjects.adults.minus = true;
          else newItemsObjects.adults.minus = false;
        }
      }
      return ele;
    });

  }
  

  ngOnInit() {
    this.arrayList = Object.keys(this.itemsObjects);
  
    this.arrayList=this.arrayList.slice(0,5)
     
  }

}
