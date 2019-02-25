import { Item, Review, CartItem } from './DataGenerator'

class DataUtils {
  // min - inclusive, max - exclusive
  static randomBetween = (min, max) => Math.random() * (max - min) + min

  static roundToTwoDecimalPlaces = num => Math.round(num * 100) / 100

  static randomArrayItem = array =>
    array[Math.floor(Math.random() * array.length)]

  static arrayFromArrayRandomItems = array =>
    Array.from(array).filter(() => DataUtils.randomBoolean())

  static randomBoolean = () => Math.random() >= 0.5

  static arrayContainsAllElementsFromAnother = (array0, array1) =>
    array1
      .map(a => {
        return array0.some(b => {
          return b === a
        })
      })
      .every(e => e)

  static getItemById = (initialItems, itemId) =>
    initialItems.find(item => item.id === itemId)

  static rebuildItemsFromJson = json =>
    json.map(i => {
      return new Item(
        i._id,
        i._name,
        i._price,
        i._descriptionShort,
        i._descriptionLong,
        i._categoryName,
        i._featuresNames,
        i._reviews.map(r => new Review(r._name, r._date, r._text)),
        i._imagesSources,
        i._quantityOnStock
      )
    })

  static rebuildCartItemsFromJson = json =>
    json.map(i => {
      let item = new CartItem(i._itemId, i._price)
      item.setQuantity(i._quantity)
      item.deliveryCost = i._deliveryCost
      return item
    })

  static saveToLocalStorage = (key, object) => {
    localStorage.setItem(key, JSON.stringify(object))
  }

  static loadFromLocalStorage = (key, rebuilder) => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      if (rebuilder === undefined) {
        return JSON.parse(localStorage.getItem(key))
      } else {
        return rebuilder(JSON.parse(localStorage.getItem(key)))
      }
    } else {
      return null
    }
  }
}

export default DataUtils
