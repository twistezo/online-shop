import { arrayContainsAllElementsFromAnother } from "../data/Utils";

class DataFilter {
  constructor(initialItems) {
    this.initialItems = initialItems;
  }

  filterByCategoryAndFeature(activeCategory, activeFeatures) {
    let allFeaturesAreOff = activeFeatures.every(
      filter => filter.getState() === false
    );

    if (allFeaturesAreOff) {
      return Object.values(
        this.initialItems.filter(item => {
          return item.getCategoryName() === activeCategory;
        })
      );
    } else {
      return this.initialItems.filter(item => {
        return (
          arrayContainsAllElementsFromAnother(
            item.getFeaturesNames(),
            activeFeatures
              .filter(f => f.getState() === true)
              .map(f => f.getName())
          ) && item.getCategoryName() === activeCategory
        );
      });
    }
  }

  filterBySearchValue(value) {
    let searchedValue = value.toLowerCase();
    return this.initialItems.filter(
      item =>
        item
          .getName()
          .toLowerCase()
          .startsWith(searchedValue) ||
        item
          .getDescription()
          .toLowerCase()
          .startsWith(searchedValue) ||
        item
          .getPrice()
          .toString()
          .startsWith(searchedValue)
    );
  }
}

export default DataFilter;
