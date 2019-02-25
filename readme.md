## Online-shop

### Description

Online-shop created with React.

### Features

- navigate, search and filter through product list, categories
- products details (description, photos, reviews)
- cart items flow (add, remove, change quantity)
- cart view, checkout and summary/confirmation page
- store user session
- mock data generator

Note:

1. Built-in mock `DataGenerator` create and store random products data on client side. So during the first run time app saves generated data in user browser local storage. This prevents to losing data when user refreshes page and storing user movements like holding products in cart or add products review.
2. Component `/src/App.js` fetches data from `DataGenerator` in async way and returns one of three Container depends on Promise status (WaitContainer, ErrorContainer, MainContainer).

### Tools

React, Bootstrap

### Requirements

npm

### Build, run, test

Firstly: `npm install`

To run in development mode: `npm start`

To build in production mode: `npm run build`

To run locally prod mode:

```
npm install -g serve
serve -s build

```

Test: `npm test`

### Latest version

https://twistezo.github.io/online-shop/
