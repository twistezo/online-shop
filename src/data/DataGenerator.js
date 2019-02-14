import DataUtils from "./DataUtils";
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
    this.paymentMethods = ["PayPal", "PayU", "Credit Card"];
    this.deliveryOptions = [
      {
        name: "UPS",
        price: 14.99
      },
      {
        name: "DHL",
        price: 16.99
      },
      {
        name: "DPD",
        price: 18.99
      }
    ];
  }

  generate(quantity) {
    const chance = new Chance();
    for (let i = 0; i < quantity; i++) {
      const category = DataUtils.randomArrayItem(this.categories);
      this.data.push(
        new Item(
          uuidv1(),
          chance.capitalize(chance.word({ syllables: 2, lenth: 6 })) + " #" + i,
          DataUtils.roundToTwoDecimalPlaces(DataUtils.randomBetween(1, 1000)),
          chance.sentence({ words: 10 }),
          chance.paragraph(),
          category.name,
          DataUtils.arrayFromArrayRandomItems(
            category.features.map(f => f.name)
          ),
          this.generateRandomReviews(
            chance,
            Math.floor(DataUtils.randomBetween(2, 6))
          ),
          this.generateRandomImages(
            chance,
            Math.floor(DataUtils.randomBetween(2, 6))
          ),
          Math.floor(DataUtils.randomBetween(1, 11))
        )
      );
    }

    const isCreatedWithSuccess =
      this.checkNullOrUndefinded(this.data) &&
      this.checkNullOrUndefinded(this.categories) &&
      this.checkNullOrUndefinded(this.paymentMethods) &&
      this.checkNullOrUndefinded(this.deliveryOptions);
    return isCreatedWithSuccess
      ? {
          items: this.data,
          categories: this.categories,
          paymentMethods: this.paymentMethods,
          deliveryOptions: this.deliveryOptions
        }
      : new Error(
          "Generated data is broken. Some field is null or undefinded."
        );
  }

  checkNullOrUndefinded = value =>
    value !== null && value !== undefined && value !== [];

  generateRandomImages(chance, imagesNum) {
    let images = [];
    for (let j = 0; j < imagesNum; j++) {
      images.push(
        "https://avatars.dicebear.com/v2/identicon/" +
          chance.word({ length: 15 }) +
          ".svg"
      );
    }
    return images;
  }

  generateRandomReviews(chance, reviewsNum) {
    let reviews = [];
    for (let i = 0; i < reviewsNum; i++) {
      reviews.push(
        new Review(
          chance.name(),
          chance.date({
            string: false,
            american: false,
            year: 2018
          }),
          chance.sentence()
        )
      );
    }
    return reviews;
  }
}

class Item {
  constructor(
    id,
    name,
    price,
    descriptionShort,
    descriptionLong,
    categoryName,
    featuresNames,
    reviews,
    imagesSources,
    quantityOnStock
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.descriptionShort = descriptionShort;
    this.descriptionLong = descriptionLong;
    this.categoryName = categoryName;
    this.featuresNames = featuresNames;
    this.reviews = reviews;
    this.imagesSources = imagesSources;
    this.quantityOnStock = quantityOnStock;
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

class Review {
  constructor(name, date, text) {
    this.name = name;
    this.date = date;
    this.text = text;
  }
}

class CartItem {
  constructor(itemId, price) {
    this.itemId = itemId;
    this.quantity = 0;
    this.price = price;
    this.deliveryCost = 0;
    this.totalPrice = 0;
  }

  setQuantity(quantity) {
    this.quantity = quantity;
    this.totalPrice = DataUtils.roundToTwoDecimalPlaces(
      this.quantity * this.price
    );
  }
}

export { DataGenerator, Item, Category, Feature, Review, CartItem };
