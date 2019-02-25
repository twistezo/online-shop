import DataUtils from './DataUtils'
import Chance from 'chance'
import uuidv1 from 'uuid/v1'

class DataGenerator {
  constructor() {
    this._data = []
    this._categories = [
      new Category('Category 0', [
        new Feature('C0 feature 0'),
        new Feature('C0 feature 1'),
        new Feature('C0 feature 2')
      ]),
      new Category('Category 1', [
        new Feature('C1 feature 0'),
        new Feature('C1 feature 1'),
        new Feature('C1 feature 2'),
        new Feature('C1 feature 3')
      ]),
      new Category('Category 2', [
        new Feature('C2 feature 0'),
        new Feature('C2 feature 1'),
        new Feature('C2 feature 2'),
        new Feature('C2 feature 3'),
        new Feature('C2 feature 4')
      ])
    ]
    this._paymentMethods = ['PayPal', 'PayU', 'Credit Card']
    this._deliveryOptions = [
      {
        name: 'UPS',
        price: 14.99
      },
      {
        name: 'DHL',
        price: 16.99
      },
      {
        name: 'DPD',
        price: 18.99
      }
    ]
  }

  set paymentMethods(value) {
    this._paymentMethods = value
  }

  set deliveryOptions(value) {
    this._deliveryOptions = value
  }

  generate(quantity) {
    const chance = new Chance()
    for (let i = 0; i < quantity; i++) {
      const category = DataUtils.randomArrayItem(this._categories)
      this._data.push(
        new Item(
          uuidv1(),
          chance.capitalize(chance.word({ syllables: 2, lenth: 6 })) + ' #' + i,
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
      )
    }

    const isCreatedWithSuccess =
      this.checkNullEmptyOrUndefinded(this._data) &&
      this.checkNullEmptyOrUndefinded(this._categories) &&
      this.checkNullEmptyOrUndefinded(this._paymentMethods) &&
      this.checkNullEmptyOrUndefinded(this._deliveryOptions)
    return isCreatedWithSuccess
      ? {
          items: this._data,
          categories: this._categories,
          paymentMethods: this._paymentMethods,
          deliveryOptions: this._deliveryOptions
        }
      : new Error('Generated data is broken. Some field is null or undefinded.')
  }

  checkNullEmptyOrUndefinded = value =>
    value !== null && value !== [] && value !== undefined

  generateRandomImages(chance, imagesNum) {
    let images = []
    for (let j = 0; j < imagesNum; j++) {
      images.push(
        'https://avatars.dicebear.com/v2/identicon/' +
          chance.word({ length: 15 }) +
          '.svg'
      )
    }
    return images
  }

  generateRandomReviews(chance, reviewsNum) {
    let reviews = []
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
      )
    }
    return reviews
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
    this._id = id
    this._name = name
    this._price = price
    this._descriptionShort = descriptionShort
    this._descriptionLong = descriptionLong
    this._categoryName = categoryName
    this._featuresNames = featuresNames
    this._reviews = reviews
    this._imagesSources = imagesSources
    this._quantityOnStock = quantityOnStock
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get price() {
    return this._price
  }

  get descriptionShort() {
    return this._descriptionShort
  }

  get descriptionLong() {
    return this._descriptionLong
  }

  get categoryName() {
    return this._categoryName
  }

  get featuresNames() {
    return this._featuresNames
  }

  get reviews() {
    return this._reviews
  }

  get imagesSources() {
    return this._imagesSources
  }

  get quantityOnStock() {
    return this._quantityOnStock
  }

  set quantityOnStock(value) {
    this._quantityOnStock = value
  }
}

class Category {
  constructor(name, features) {
    this._name = name
    this._features = features
  }

  get name() {
    return this._name
  }

  get features() {
    return this._features
  }
}

class Feature {
  constructor(name) {
    this._name = name
    this._state = false
  }

  get name() {
    return this._name
  }

  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
  }

  switchState() {
    this._state = !this._state
  }
}

class Review {
  constructor(name, date, text) {
    this._name = name
    this._date = date
    this._text = text
  }

  get name() {
    return this._name
  }

  get date() {
    return this._date
  }

  get text() {
    return this._text
  }
}

class CartItem {
  constructor(itemId, price) {
    this._itemId = itemId
    this._quantity = 0
    this._price = price
    this._deliveryCost = 0
    this._totalPrice = 0
  }

  get itemId() {
    return this._itemId
  }

  get quantity() {
    return this._quantity
  }

  get price() {
    return this._price
  }

  get deliveryCost() {
    return this._deliveryCost
  }

  set deliveryCost(value) {
    this._deliveryCost = value
  }

  get totalPrice() {
    return this._totalPrice
  }

  setQuantity(quantity) {
    this._quantity = quantity
    this._totalPrice = DataUtils.roundToTwoDecimalPlaces(
      this._quantity * this._price
    )
  }
}

export { DataGenerator, Item, Category, Feature, Review, CartItem }
