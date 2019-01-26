class DataFilter {
  constructor(initialItems, activeCategory, filters) {
    this.initialItems = initialItems;
    this.activeCategory = activeCategory;
    this.filters = filters;
  }

  filter() {
    // console.log(this.initialItems);
    // console.log(this.activeCategory);
    // console.log(this.filters);

    let initialItems = this.initialItems;

    // let allFiltersAreOff = this.filters.every(
    //   filter => filter.getState() === false
    // );

    // if (allFiltersAreOff) {
    let a = initialItems.filter(item => {
      return item.getCategory().getName() === this.activeCategory;
    });
    return Object.values(a);
    // }
  }
}

export default DataFilter;
