import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DataFilter from "../data/DataFilter";
import SidebarContainer from "./Sidebar/SidebarContainer";
import ViewerContainer from "./Viewer/ViewerContainer";
import ItemDetails from "./ItemDetails";
import Menu from "./Menu";
import CartContainer from "./Cart/CartContainer";
import { Item, CartItem, Category } from "../data/DataGenerator";
import { roundToTwoDecimalPlaces } from "../data/Utils";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        items: props.data.items,
        categories: props.data.categories
      },
      receivedData: {
        searchValue: "",
        activeCategory: "",
        activeFeatures: [],
        activeItem: {}
      },
      filteredData: {
        items: []
      },
      controllers: {
        viewerRows: 2,
        viewerColumns: 2,
        shouldExpandViewer: false
      },
      cartData: {
        cartItems: [],
        cartItemsSum: 0
      }
    };
  }

  componentWillMount() {
    this.resetReceivedandFilteredData();
  }

  handleSearchChange = searchValue => {
    if (searchValue === "") {
      this.resetReceivedandFilteredData();
    } else {
      this.setState(() => ({
        receivedData: {
          ...this.state.receivedData,
          searchValue
        },
        filteredData: {
          ...this.state.filteredData,
          items: this.filterBySearchValue(
            this.state.initialData.items,
            searchValue
          )
        },
        controllers: {
          ...this.state.controllers,
          shouldExpandViewer: true
        }
      }));
    }
  };

  handleHomeClick = () => {
    this.resetReceivedandFilteredData();
  };

  handleSidebarChange = (activeCategory, activeFeatures) => {
    this.setState(() => ({
      receivedData: {
        ...this.state.receivedData,
        activeCategory,
        activeFeatures
      },
      filteredData: {
        ...this.state.filteredData,
        items: this.filterByCategoryAndFeature(
          this.state.initialData.items,
          activeCategory,
          activeFeatures
        )
      }
    }));
  };

  handleItemClick = activeItem => {
    this.resetReceivedandFilteredData();
    this.setState(() => ({
      receivedData: {
        ...this.state.receivedData,
        activeItem
      }
    }));
  };

  handleAddReview = (review, itemId) => {
    let initialItems = this.state.initialData.items;
    let item = initialItems.find(item => item.id === itemId);
    if (item.reviews.find(r => r.name === review.name) === undefined)
      item.reviews.push(review);
  };

  handleAddToCartClick = itemId => {
    let cartData = this.state.cartData;
    if (
      cartData.cartItems.find(cartItem => cartItem.itemId === itemId) ===
      undefined
    ) {
      let item = this.state.initialData.items.find(item => item.id === itemId);

      if (item.quantityOnStock !== 0) {
        item.quantityOnStock -= 1;
        let newCartItem = new CartItem(itemId, item.price);
        newCartItem.setQuantity(1);
        cartData.cartItems.push(newCartItem);
        cartData.cartItemsSum = this.calculateCartItemsSum();
        this.setState(() => ({
          cartData
        }));
      }
    }
  };

  handleItemQuantityChange = (
    cartItem,
    initialItemQuantyToAdd,
    cartItemQuantityToAdd
  ) => {
    let items = this.state.initialData.items;
    let cartData = this.state.cartData;
    let initialItem = items.find(i => i.id === cartItem.itemId);
    let changedCartItem = cartData.cartItems.find(
      c => c.itemId === cartItem.itemId
    );

    if (
      // decrease quantity
      (initialItemQuantyToAdd > 0 && changedCartItem.quantity > 0) ||
      // increase quantity
      (initialItemQuantyToAdd < 0 && initialItem.quantityOnStock > 0)
    ) {
      initialItem.quantityOnStock += initialItemQuantyToAdd;
      let newQuantityOfChangedItem =
        changedCartItem.quantity + cartItemQuantityToAdd;
      changedCartItem.setQuantity(newQuantityOfChangedItem);
      cartData.cartItemsSum = this.calculateCartItemsSum();

      this.setState(() => ({
        initialData: {
          ...this.state.initialData,
          items
        },
        cartData
      }));
    }
  };

  handleRemoveCartItem = cartItem => {
    let items = this.state.initialData.items;
    let cartData = this.state.cartData;
    let initialItem = items.find(i => i.id === cartItem.itemId);
    let changedCartItemIndex = cartData.cartItems
      .map(i => i.itemId)
      .indexOf(cartItem.itemId);
    let changedCartItem = cartData.cartItems[changedCartItemIndex];
    let quantitiesToGiveBack = changedCartItem.quantity;
    cartData.cartItems.splice(changedCartItemIndex, 1);
    cartData.cartItemsSum = this.calculateCartItemsSum();
    initialItem.quantityOnStock += quantitiesToGiveBack;
    this.setState(() => ({
      initialData: {
        ...this.state.initialData,
        items
      },
      cartData
    }));
  };

  handlePurchaseComplete = () => {
    this.resetCart();
  };

  calculateCartItemsSum = () =>
    this.state.cartData.cartItems.length > 0
      ? roundToTwoDecimalPlaces(
          this.state.cartData.cartItems
            .map(i => i.totalPrice)
            .reduce((a, b) => a + b)
        )
      : 0;

  filterByCategoryAndFeature = (initialItems, activeCategory, activefeatures) =>
    new DataFilter(initialItems).filterByCategoryAndFeature(
      activeCategory,
      activefeatures
    );

  filterBySearchValue = (initialItems, itemName) =>
    new DataFilter(initialItems).filterBySearchValue(itemName);

  resetReceivedandFilteredData() {
    this.setState(() => ({
      receivedData: {
        searchValue: "",
        activeCategory: this.props.data.categories[0].name,
        activeFeatures: [],
        activeItem: {}
      },
      filteredData: {
        items: this.filterByCategoryAndFeature(
          this.props.data.items,
          this.props.data.categories[0].name,
          []
        )
      },
      controllers: {
        ...this.state.controllers,
        shouldExpandViewer: false
      }
    }));
  }

  resetCart() {
    this.setState(() => ({
      cartData: {
        cartItems: [],
        cartItemsSum: 0
      }
    }));
  }

  View = () => {
    return (
      <Row>
        <Col sm={4}>
          <SidebarContainer
            categories={this.props.data.categories}
            activeCategory={this.state.receivedData.activeCategory}
            onSidebarChange={this.handleSidebarChange}
          />
        </Col>
        <Col sm={8}>
          <this.ViewerComponent
            rows={this.state.controllers.viewerRows}
            columns={this.state.controllers.viewerColumns}
          />
        </Col>
      </Row>
    );
  };

  ViewerComponent = props => {
    return (
      <ViewerContainer
        viewerRows={props.rows}
        viewerColumns={props.columns}
        filteredItems={this.state.filteredData.items}
        onItemClick={this.handleItemClick}
        onAddToCartClick={this.handleAddToCartClick}
      />
    );
  };

  SearchResult = () => {
    return (
      <ViewerContainer
        filteredItems={this.state.filteredData.items}
        onItemClick={this.handleItemClick}
        onAddToCartClick={this.handleAddToCartClick}
      />
    );
  };

  ItemDetails = () => {
    return (
      <ItemDetails
        initialItems={this.state.initialData.items}
        item={this.state.receivedData.activeItem}
        onAddReview={this.handleAddReview}
        onAddToCartClick={this.handleAddToCartClick}
      />
    );
  };

  CartContainer = route => {
    return (
      <CartContainer
        cartItems={this.state.cartData.cartItems}
        cartItemsSum={this.state.cartData.cartItemsSum}
        initialItems={this.state.initialData.items}
        routeUrl={route.match.url}
        onChangeItemQuantity={this.handleItemQuantityChange}
        onRemoveCartItem={this.handleRemoveCartItem}
        onPurchaseComplete={this.handlePurchaseComplete}
      />
    );
  };

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col sm={12}>
              <Menu
                searchValue={this.state.receivedData.searchValue}
                onSearchChange={this.handleSearchChange}
                onHomeClick={this.handleHomeClick}
                cartItemsLength={this.state.cartData.cartItems.length}
              />
            </Col>
          </Row>
          {this.state.controllers.shouldExpandViewer ? (
            <this.ViewerComponent
              rows={this.state.controllers.viewerRows + 1}
              columns={this.state.controllers.viewerColumns + 1}
            />
          ) : (
            <Route exact path="/" component={this.View} />
          )}
          <Route path="/cart" component={this.CartContainer} />
          <Route
            path={
              "/item-details/item-id-" + this.state.receivedData.activeItem.id
            }
            component={this.ItemDetails}
          />
        </Container>
      </Router>
    );
  }
}

MainContainer.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
    categories: PropTypes.arrayOf(PropTypes.instanceOf(Category))
  })
};

export default MainContainer;
