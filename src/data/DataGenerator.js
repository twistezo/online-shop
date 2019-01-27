import {
  randomBetween,
  roundToTwoDecimalPlaces,
  randomArrayItem,
  arrayFromArrayRandomItems
} from "./Utils";
import uuidv1 from "uuid/v1";
import Chance from "chance";

class DataGenerator {
  constructor() {
    this.data = [];
    this.categories = [
      new Category("Category 0", [
        new Feature("C0 feature 0"),
        new Feature("C0 feature 1"),
        new Feature("C0 feature 2")
      ]),
      new Category("Category 1", [
        new Feature("C1 feature 0"),
        new Feature("C1 feature 1"),
        new Feature("C1 feature 2"),
        new Feature("C1 feature 3")
      ]),
      new Category("Category 2", [
        new Feature("C2 feature 0"),
        new Feature("C2 feature 1"),
        new Feature("C2 feature 2"),
        new Feature("C2 feature 3"),
        new Feature("C2 feature 4")
      ])
    ];
  }

  generate(quantity) {
    let chance = new Chance();
    for (let i = 0; i < quantity; i++) {
      let category = randomArrayItem(this.categories);
      this.data.push(
        new Item(
          uuidv1(),
          chance.capitalize(chance.word({ syllables: 2, lenth: 6 })) + " #" + i,
          roundToTwoDecimalPlaces(randomBetween(1, 1000)),
          chance.sentence(),
          category.name,
          arrayFromArrayRandomItems(category.features.map(f => f.name)),
          "https://avatars.dicebear.com/v2/identicon/" +
            chance.word({ length: 15 }) +
            ".svg"
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
  constructor(
    id,
    name,
    price,
    description,
    categoryName,
    featuresNames,
    imageSrc
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.categoryName = categoryName;
    this.featuresNames = featuresNames;
    this.imageSrc = imageSrc;
  }
}

class Category {
  constructor(name, features) {
    this.name = name;
    this.features = features;
  }
}

class Feature {
  constructor(name) {
    this.name = name;
    this.state = false;
  }

  setState(state) {
    this.state = state;
  }

  switchState() {
    this.state = !this.state;
  }
}

export { DataGenerator, Item, Category, Feature };
