import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DataFilter from "../data/DataFilter";
import SidebarContainer from "./Sidebar/SidebarContainer";
import ViewerContainer from "./Viewer/ViewerContainer";
import ItemDetailsContainer from "./ItemDetails/ItemDetailsContainer";
import MenuContainer from "./Menu/MenuContainer";
import CartContainer from "./Cart/CartContainer";
import { Item, Category } from "../data/DataGenerator";
import CartUtils from "./Cart/CartUtils";
import DataUtils from "../data/DataUtils";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        items: props.data.items,
        categories: props.data.categories,
        paymentMethods: props.data.paymentMethods,
        deliveryOptions: props.data.deliveryOptions
      },
      receivedData: {
        searchValue: "",
        activeCategory: this.props.data.categories[0].name,
        activeFeatures: []
      },
      filteredData: {
        items: DataFilter.filterByCategoryAndFeature(
          this.props.data.items,
          this.props.data.categories[0].name,
          []
        )
      },
      cartData: {
        cartItems: [],
        cartItemsSum: 0
      }
    };
  }

  componentDidMount() {
    this.loadCartDataFromLocalStorage();
  }

  handleSidebarChange = (activeCategory, activeFeatures) => {
    this.setState(() => ({
      receivedData: {
        ...this.state.receivedData,
        activeCategory,
        activeFeatures
      },
      filteredData: {
        ...this.state.filteredData,
        items: DataFilter.filterByAllOptions(
          this.state.initialData.items,
          this.state.receivedData.searchValue,
          activeCategory,
          activeFeatures
        )
      }
    }));
  };

  handleSearchChange = searchValue => {
    this.setState(() => ({
      receivedData: {
        ...this.state.receivedData,
        searchValue
      },
      filteredData: {
        ...this.state.filteredData,
        items: DataFilter.filterByAllOptions(
          this.state.initialData.items,
          searchValue,
          this.state.receivedData.activeCategory,
          this.state.receivedData.activeFeatures
        )
      }
    }));
  };

  handleAddReview = (review, itemId) => {
    let items = [...this.state.initialData.items];
    let item = items.find(item => item.id === itemId);
    if (item.reviews.find(r => r.name === review.name) === undefined) {
      item.reviews.push(review);
      DataUtils.saveToLocalStorage("items", items);
      this.setState(() => ({
        initialData: {
          ...this.state.initialData,
          items
        }
      }));
    }
  };

  handleAddToCart = itemId => {
    const result = CartUtils.recalculateOnAdd(
      itemId,
      this.state.initialData.items,
      this.state.cartData
    );
    if (result.isOk) {
      DataUtils.saveToLocalStorage("items", this.state.initialData.items);
      this.saveCartDataToLocalStorage(result.cartData);
      this.setState(() => ({
        cartData: result.cartData
      }));
    }
  };

  handleRemoveFromCart = cartItem => {
    const result = CartUtils.recalculateOnRemove(
      cartItem,
      this.state.cartData,
      this.state.initialData.items
    );
    DataUtils.saveToLocalStorage("items", this.state.initialData.items);
    this.saveCartDataToLocalStorage(result.cartData);
    this.setState(() => ({
      initialData: {
        ...this.state.initialData,
        items: result.items
      },
      cartData: result.cartData
    }));
  };

  handleItemQuantityChange = (
    cartItem,
    initialItemQuantyToAdd,
    cartItemQuantityToAdd
  ) => {
    const result = CartUtils.recalculateAllAfterItemQuantityChange(
      this.state.initialData.items,
      this.state.cartData,
      cartItem,
      initialItemQuantyToAdd,
      cartItemQuantityToAdd
    );
    DataUtils.saveToLocalStorage("items", result.items);
    this.saveCartDataToLocalStorage(result.cartData);
    this.setState(() => ({
      initialData: {
        ...this.state.initialData,
        items: result.items
      },
      cartData: result.cartData
    }));
  };

  handlePurchaseComplete = () => {
    DataUtils.saveToLocalStorage("items", this.state.initialData.items);
    DataUtils.saveToLocalStorage("cartItems", []);
    DataUtils.saveToLocalStorage("cartItemsSum", 0);
    this.setState(() => ({
      cartData: {
        cartItems: [],
        cartItemsSum: 0
      }
    }));
  };

  loadCartDataFromLocalStorage = () => {
    const cartData = {
      cartItems: DataUtils.loadFromLocalStorage(
        "cartItems",
        DataUtils.rebuildCartItemsFromJson
      ),
      cartItemsSum: DataUtils.loadFromLocalStorage("cartItemsSum")
    };
    if (cartData.cartItems !== null && cartData.cartItemsSum !== null) {
      this.setState({
        cartData
      });
    }
  };

  saveCartDataToLocalStorage = cartData => {
    DataUtils.saveToLocalStorage("cartItems", cartData.cartItems);
    DataUtils.saveToLocalStorage("cartItemsSum", cartData.cartItemsSum);
  };

  handleResetReceivedandFilteredData = () => {
    this.setState(() => ({
      receivedData: {
        searchValue: "",
        activeCategory: this.props.data.categories[0].name,
        activeFeatures: []
      },
      filteredData: {
        items: DataFilter.filterByCategoryAndFeature(
          this.props.data.items,
          this.props.data.categories[0].name,
          []
        )
      }
    }));
  };

  Viewer = () => {
    return (
      <Row>
        <Col sm={3}>
          <SidebarContainer
            categories={this.props.data.categories}
            activeCategory={this.state.receivedData.activeCategory}
            onSidebarChange={this.handleSidebarChange}
          />
        </Col>
        <Col sm={9}>
          <ViewerContainer
            filteredItems={this.state.filteredData.items}
            onAddToCartClick={this.handleAddToCart}
          />
        </Col>
      </Row>
    );
  };

  NoMatch = ({ location }) => (
    <div className="text-center">
      <div className="pb-2">
        <h1>Error 404</h1>
        <h3>This page doesn't exists.</h3>
      </div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );

  render() {
    const publicURL = process.env.PUBLIC_URL;
    return (
      <Router>
        <Container>
          <Row>
            <MenuContainer
              searchValue={this.state.receivedData.searchValue}
              onSearchChange={this.handleSearchChange}
              cartItemsLength={this.state.cartData.cartItems.length}
              onResetReceivedandFilteredData={
                this.handleResetReceivedandFilteredData
              }
            />
          </Row>
          <Switch>
            <Route
              exact
              path={"(" + publicURL + "|" + publicURL + "/search)"}
              component={this.Viewer}
            />
            <Route
              path={publicURL + "/cart"}
              component={route => (
                <CartContainer
                  cartItems={this.state.cartData.cartItems}
                  cartItemsSum={this.state.cartData.cartItemsSum}
                  initialData={this.state.initialData}
                  routeUrl={route.match.url}
                  onChangeItemQuantity={this.handleItemQuantityChange}
                  onRemoveCartItem={this.handleRemoveFromCart}
                  onPurchaseComplete={this.handlePurchaseComplete}
                />
              )}
            />
            <Route
              path={publicURL + "/item-details/item-id-:id"}
              component={route => (
                <ItemDetailsContainer
                  initialItems={this.state.initialData.items}
                  routeParamId={route.match.params.id}
                  onAddReview={this.handleAddReview}
                  onAddToCartClick={this.handleAddToCart}
                />
              )}
            />
            <Route component={this.NoMatch} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

MainContainer.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
    categories: PropTypes.arrayOf(PropTypes.instanceOf(Category)),
    paymentMethods: PropTypes.arrayOf(PropTypes.string),
    deliveryOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.num
      })
    )
  })
};

export default MainContainer;
