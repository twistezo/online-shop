import React, { Component } from "react";
import { DataGenerator } from "./data/DataGenerator";
import MainContainer from "./components/MainContainer";
import "./App.scss";

class App extends Component {
  static dataQuantity = 200;

  constructor() {
    super();
    this.state = {
      data: null,
      error: {
        occured: false,
        text: ""
      }
    };
  }

  componentDidMount() {
    this.generateData()
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        this.setState({
          error: {
            occured: true,
            text: err.message
          }
        });
      });
  }

  generateData = () =>
    new Promise((resolve, reject) => {
      const data = new DataGenerator().generate(App.dataQuantity);
      if (data instanceof Error) {
        reject(new Error("Generate mocks with DataGenerator failed."));
      } else {
        resolve(new DataGenerator().generate(App.dataQuantity));
      }
    });

  ErrorContainer = () => {
    return (
      <div className="text-center pt-5">
        <div className="pb-2">
          <h2>Error while fetching data. Please reload the page.</h2>
          <h5>Error message: "{this.state.error.text}"</h5>
        </div>
      </div>
    );
  };

  WaitContainer = () => {
    return (
      <div className="text-center pt-5">
        <div className="pb-2">
          <h2>Downloading data...</h2>
        </div>
      </div>
    );
  };

  render() {
    if (
      this.state.data !== null &&
      this.state.data !== undefined &&
      !this.state.error.occured
    ) {
      return <MainContainer data={this.state.data} />;
    } else if (this.state.error.occured) {
      return <this.ErrorContainer />;
    } else {
      return <this.WaitContainer />;
    }
  }
}

export default App;
