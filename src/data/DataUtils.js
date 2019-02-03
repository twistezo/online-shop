class DataUtils {
  // min - inclusive, max - exclusive
  static randomBetween = (min, max) => Math.random() * (max - min) + min;

  static roundToTwoDecimalPlaces = num => Math.round(num * 100) / 100;

  static randomArrayItem = array =>
    array[Math.floor(Math.random() * array.length)];

  static arrayFromArrayRandomItems = array =>
    Array.from(array).filter(() => DataUtils.randomBoolean());

  static randomBoolean = () => Math.random() >= 0.5;

  static arrayContainsAllElementsFromAnother = (array0, array1) =>
    array1
      .map(a => {
        return array0.some(b => {
          return b === a;
        });
      })
      .every(e => e);

  static getItemById = (initialItems, itemId) =>
    initialItems.find(item => item.id === itemId);
}

export default DataUtils;
