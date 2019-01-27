import { arrayContainsAllElementsFromAnother } from "../data/Utils";

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
      return this.initialItems.filter(item => {
        return (
          arrayContainsAllElementsFromAnother(
            item.featuresNames,
            activeFeatures.filter(f => f.state === true).map(f => f.name)
          ) && item.categoryName === activeCategory
        );
      });
    }
  }

  filterBySearchValue(value) {
    let searchedValue = value.toLowerCase();
    return this.initialItems.filter(
      item =>
        item.name.toLowerCase().startsWith(searchedValue) ||
        item.description.toLowerCase().startsWith(searchedValue) ||
        item.price.toString().startsWith(searchedValue)
    );
  }
}

export default DataFilter;
