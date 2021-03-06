## Online-shop

### Description

Online-shop with minimalist design and built-in mock products generator.

Latest version: https://twistezo.github.io/online-shop/

### Features

- navigate, search and filter through product list, categories
- products details (description, photos, reviews)
- cart items flow (add, remove, change quantity)
- cart view, checkout and summary/confirmation page
- store user session
- mock data generator

Note:

1. This project is deliberately written without Redux.
2. Built-in mock `DataGenerator` create and store random products data on client side. So during the first run time app saves generated data in user browser local storage. This prevents to losing data when user refreshes page and storing user movements like holding products in cart or add products review.
3. Component `/src/App.js` fetches data from `DataGenerator` in async way and returns one of three Container depends on Promise status (WaitContainer, ErrorContainer, MainContainer).

### Tools

React, Bootstrap

### Build, run, test

Build: `npm install`

Run in development mode: `npm start`

Build in production mode: `npm run build`

Run locally in production mode:

```
npm install -g serve
serve -s build
```

Test: `npm test`

