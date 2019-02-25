import DataUtils from '../data/DataUtils'

it('randomBetween', () => {
  const result = DataUtils.randomBetween(0, 5)
  expect(result).toBeGreaterThanOrEqual(0)
  expect(result).toBeLessThan(5)
})

it('roundToTwoDecimalPlaces', () => {
  const a = DataUtils.roundToTwoDecimalPlaces(2.34232)
  const b = DataUtils.roundToTwoDecimalPlaces(2.4444444)
  expect(a).toBe(2.34)
  expect(b).toBe(2.44)
})

it('arrayContainsAllElementsFromAnother', () => {
  const arrayA = [0, 1, 2, 3, 4, 5]
  let arrayB = [1, 2, 3]
  expect(
    DataUtils.arrayContainsAllElementsFromAnother(arrayA, arrayB)
  ).toBeTruthy()

  arrayB = [4, 5, 6]
  expect(
    DataUtils.arrayContainsAllElementsFromAnother(arrayA, arrayB)
  ).toBeFalsy()
})
