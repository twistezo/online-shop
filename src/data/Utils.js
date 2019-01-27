// min - inclusive, max - exclusive
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function roundToTwoDecimalPlaces(num) {
  return Math.round(num * 100) / 100;
}

function randomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function arrayFromArrayRandomItems(array) {
  return Array.from(array).filter(() => randomBoolean());
}

function randomBoolean() {
  return Math.random() >= 0.5;
}

function arrayContainsAllElementsFromAnother(array0, array1) {
  return array1
    .map(a => {
      return array0.some(b => {
        return b === a;
      });
    })
    .every(e => e);
}

export {
  randomBetween,
  roundToTwoDecimalPlaces,
  randomArrayItem,
  arrayFromArrayRandomItems,
  arrayContainsAllElementsFromAnother
};
