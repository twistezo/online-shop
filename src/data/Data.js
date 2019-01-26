import {
  randomBetween,
  roundToTwoDecimalPlaces,
  randomArrayItem
} from "./Utils";
import uuidv1 from "uuid/v1";

class Data {
  constructor() {
    this.data = [];
    this.categories = [
      new Category("Category 0", [
        new Filter("C0 filter 0"),
        new Filter("C0 filter 1"),
        new Filter("C0 filter 2")
      ]),
      new Category("Category 1", [
        new Filter("C1 filter 0"),
        new Filter("C1 filter 1"),
        new Filter("C1 filter 2"),
        new Filter("C1 filter 3")
      ]),
      new Category("Category 2", [
        new Filter("C2 filter 0"),
        new Filter("C2 filter 1"),
        new Filter("C2 filter 2"),
        new Filter("C2 filter 3"),
        new Filter("C2 filter 4")
      ])
    ];
  }

  generate(quantity) {
    for (let i = 0; i < quantity; i++) {
      this.data.push(
        new Item(
          uuidv1(),
          "Product " + i,
          roundToTwoDecimalPlaces(randomBetween(1, 1000)),
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut diam magna.",
          randomArrayItem(this.categories)
        )
      );
    }
  }

  getItems() {
    return this.data;
  }

  getCategories() {
    return this.categories;
  }
}

class Item {
  constructor(id, name, price, description, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  getCategory() {
    return this.category;
  }

  getDescription() {
    return this.description;
  }
}

class Category {
  constructor(name, filters) {
    this.name = name;
    this.filters = filters;
  }

  getName() {
    return this.name;
  }

  getFilters() {
    return this.filters;
  }
}

class Filter {
  constructor(name) {
    this.name = name;
    this.state = false;
  }

  getName() {
    return this.name;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = state;
  }

  switchState() {
    this.state = !this.state;
  }
}

export default Data;
