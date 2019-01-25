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

export { randomBetween, roundToTwoDecimalPlaces, randomArrayItem };
