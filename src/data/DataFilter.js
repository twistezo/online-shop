import DataUtils from "./DataUtils";

class DataFilter {
  static filterByCategoryAndFeature(
    initialItems,
    activeCategory,
    activeFeatures
  ) {
    let allFeaturesAreOff = activeFeatures.every(
      filter => filter.state === false
    );

    if (allFeaturesAreOff) {
      return Object.values(
        initialItems.filter(item => {
          return item.categoryName === activeCategory;
        })
      );
    } else {
      return initialItems.filter(
        item =>
          DataUtils.arrayContainsAllElementsFromAnother(
            item.featuresNames,
            activeFeatures.filter(f => f.state === true).map(f => f.name)
          ) && item.categoryName === activeCategory
      );
    }
  }

  static filterBySearchValue(initialItems, value) {
    let searchedValue = value.toLowerCase();
    return initialItems.filter(
      item =>
        item.name.toLowerCase().includes(searchedValue) ||
        item.descriptionShort.toLowerCase().includes(searchedValue) ||
        item.descriptionLong.toLowerCase().includes(searchedValue) ||
        item.price.toString().includes(searchedValue)
    );
  }
}

export default DataFilter;
