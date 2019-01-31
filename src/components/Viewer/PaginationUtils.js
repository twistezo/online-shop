class PaginationUtils {
  static getPagesLen = (itemsLength, cardsData) =>
    Math.ceil(itemsLength / (cardsData.rows * cardsData.columns)) - 1;

  static getFirstItemNumOnActivePage = cardsData => {
    let itemsPerPage = cardsData.rows * cardsData.columns;
    let activePage = cardsData.activePage;
    let firstItemOnActivePage = cardsData.firstItemNumOnActivePage;

    if (activePage === 0) {
      firstItemOnActivePage = 0;
    } else {
      firstItemOnActivePage = itemsPerPage * activePage;
    }
    return firstItemOnActivePage;
  };

  static handlePage(cardsData, newActivePageNum) {
    cardsData.activePage = newActivePageNum;
    cardsData.firstItemNumOnActivePage = PaginationUtils.getFirstItemNumOnActivePage(
      cardsData
    );
    return cardsData;
  }
}

export default PaginationUtils;
