import React, { Component } from "react";
import { DataGenerator } from "./data/DataGenerator";
import MainContainer from "./components/MainContainer";
import "./App.scss";

class App extends Component {
  static dataQuantity = 200;

  constructor() {
    super();
    this.data = {
      items: [],
      categories: []
    };
    this.generateData();
  }

  generateData() {
    const dataGenerator = new DataGenerator();
    dataGenerator.generate(App.dataQuantity);
    this.data.items = dataGenerator.getItems();
    this.data.categories = dataGenerator.getCategories();
  }

  render() {
    return <MainContainer data={this.data} />;
  }
}

export default App;
