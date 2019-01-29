import { arrayContainsAllElementsFromAnother } from "./Utils";

class DataFilter {
  constructor(initialItems) {
    this.initialItems = initialItems;
  }

  filterByCategoryAndFeature(activeCategory, activeFeatures) {
    let allFeaturesAreOff = activeFeatures.every(
      filter => filter.state === false
    );

    if (allFeaturesAreOff) {
      return Object.values(
        this.initialItems.filter(item => {
          return item.categoryName === activeCategory;
        })
      );
    } else {
      return this.initialItems.filter(
        item =>
          arrayContainsAllElementsFromAnother(
            item.featuresNames,
            activeFeatures.filter(f => f.state === true).map(f => f.name)
          ) && item.categoryName === activeCategory
      );
    }
  }

  filterBySearchValue(value) {
    let searchedValue = value.toLowerCase();
    return this.initialItems.filter(
      item =>
        item.name.toLowerCase().includes(searchedValue) ||
        item.descriptionShort.toLowerCase().includes(searchedValue) ||
        item.descriptionLong.toLowerCase().includes(searchedValue) ||
        item.price.toString().includes(searchedValue)
    );
  }
}

export default DataFilter;
