import { DataGenerator, Category, Feature } from '../data/DataGenerator'

it('generate with success', () => {
  const itemsNum = 10
  let dataGenerator = new DataGenerator()
  let generated = dataGenerator.generate(itemsNum)

  expect(generated.items.length).toEqual(itemsNum)
  expect(generated.categories.length).toEqual(3)
  expect(generated.paymentMethods.length).toEqual(3)
  expect(generated.deliveryOptions.length).toEqual(3)
  expect(generated.categories).toContainEqual(
    new Category('Category 1', [
      new Feature('C1 feature 0'),
      new Feature('C1 feature 1'),
      new Feature('C1 feature 2'),
      new Feature('C1 feature 3')
    ])
  )
  expect(generated.paymentMethods).toContainEqual('PayPal')
  expect(generated.deliveryOptions).toContainEqual({
    name: 'UPS',
    price: 14.99
  })
})

it('generate with error', () => {
  let dataGenerator = new DataGenerator()
  dataGenerator.paymentMethods = null
  expect(dataGenerator.generate(10)).toEqual(
    new Error('Generated data is broken. Some field is null or undefinded.')
  )
})
