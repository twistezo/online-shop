import React, { Component } from "react";

import "./App.css";

import Data from "./data/Data";
import Layout from "./components/Layout";

class App extends Component {
  static dataQuantity = 100;

  constructor() {
    super();
    this.data = {
      items: [],
      categories: []
    };
    this.generateData();
  }

  generateData() {
    const data = new Data();
    data.generate(App.dataQuantity);
    this.data.items = data.getItems();
    this.data.categories = data.getCategories();
  }

  render() {
    return <Layout data={this.data} />;
  }
}

export default App;
