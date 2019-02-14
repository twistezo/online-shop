import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import MainContainer from "../components/MainContainer";
import { DataGenerator } from "../data/DataGenerator";

it("conditional rendering without crashing", () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  jest.spyOn(instance, "WaitContainer");
  jest.spyOn(instance, "ErrorContainer");

  // initial states
  expect(wrapper.state().data).toBe(null);
  expect(wrapper.state().error.occured).toBe(false);
  expect(wrapper.state().error.text).toBe("");

  // WaitContainer on start
  wrapper.setState({});
  expect(wrapper.find(instance.WaitContainer).length).toBe(1);
  expect(wrapper.find(instance.ErrorContainer).length).toBe(0);
  expect(wrapper.find(MainContainer).length).toBe(0);

  // ErrorContainer
  wrapper.setState({
    error: {
      occured: true
    }
  });
  expect(wrapper.find(instance.WaitContainer).length).toBe(0);
  expect(wrapper.find(instance.ErrorContainer).length).toBe(1);
  expect(wrapper.find(MainContainer).length).toBe(0);

  // MainContainer
  wrapper.setState({
    data: new DataGenerator().generate(10),
    error: {
      occured: false
    }
  });
  expect(wrapper.find(instance.WaitContainer).length).toBe(0);
  expect(wrapper.find(instance.ErrorContainer).length).toBe(0);
  expect(wrapper.find(MainContainer).length).toBe(1);
});
