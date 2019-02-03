import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DataFilter from "../data/DataFilter";
import SidebarContainer from "./Sidebar/SidebarContainer";
import ViewerContainer from "./Viewer/ViewerContainer";
import ItemDetailsContainer from "./ItemDetails/ItemDetailsContainer";
import MenuContainer from "./Menu/MenuContainer";
import CartContainer from "./Cart/CartContainer";
import { Item, Category } from "../data/DataGenerator";
import CartUtils from "./Cart/CartUtils";

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
    this.handleResetReceivedandFilteredData();
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
        items: DataFilter.filterByCategoryAndFeature(
          this.state.initialData.items,
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
        items: DataFilter.filterBySearchValue(
          this.state.initialData.items,
          searchValue
        )
      },
      controllers: {
        ...this.state.controllers,
        shouldExpandViewer: true
      }
    }));
  };

  handleItemClick = activeItem => {
    this.handleResetReceivedandFilteredData();
    this.setState(() => ({
      receivedData: {
        ...this.state.receivedData,
        activeItem
      }
    }));
  };

  handleAddReview = (review, itemId) => {
    let item = this.state.initialData.items.find(item => item.id === itemId);
    if (item.reviews.find(r => r.name === review.name) === undefined)
      item.reviews.push(review);
  };

  handleAddToCart = itemId => {
    let result = CartUtils.recalculateOnAdd(
      itemId,
      this.state.initialData.items,
      this.state.cartData
    );
    if (result.isOk) {
      this.setState(() => ({
        cartData: result.cartData
      }));
    }
  };

  handleRemoveFromCart = cartItem => {
    let result = CartUtils.recalculateOnRemove(
      cartItem,
      this.state.cartData,
      this.state.initialData.items
    );
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
    let result = CartUtils.recalculateAllAfterItemQuantityChange(
      this.state.initialData.items,
      this.state.cartData,
      cartItem,
      initialItemQuantyToAdd,
      cartItemQuantityToAdd
    );

    this.setState(() => ({
      initialData: {
        ...this.state.initialData,
        items: result.items
      },
      cartData: result.cartData
    }));
  };

  handlePurchaseComplete = () => {
    this.resetCart();
  };

  handleResetReceivedandFilteredData = () => {
    this.setState(() => ({
      receivedData: {
        searchValue: "",
        activeCategory: this.props.data.categories[0].name,
        activeFeatures: [],
        activeItem: {}
      },
      filteredData: {
        items: DataFilter.filterByCategoryAndFeature(
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
  };

  resetCart() {
    this.setState(() => ({
      cartData: {
        cartItems: [],
        cartItemsSum: 0
      }
    }));
  }

  Viewer = () => {
    let shouldExpandViewer = this.state.controllers.shouldExpandViewer;
    let viewerRows = this.state.controllers.viewerRows;
    let viewerColumns = this.state.controllers.viewerColumns;
    let rows = shouldExpandViewer ? viewerRows + 1 : viewerRows;
    let columns = shouldExpandViewer ? viewerColumns + 1 : viewerColumns;

    const ViewerComponent = () => (
      <ViewerContainer
        viewerRows={rows}
        viewerColumns={columns}
        filteredItems={this.state.filteredData.items}
        onItemClick={this.handleItemClick}
        onAddToCartClick={this.handleAddToCart}
      />
    );

    return (
      <div>
        {shouldExpandViewer ? (
          <ViewerComponent />
        ) : (
          <Row>
            <Col sm={3}>
              <SidebarContainer
                categories={this.props.data.categories}
                activeCategory={this.state.receivedData.activeCategory}
                onSidebarChange={this.handleSidebarChange}
              />
            </Col>
            <Col sm={9}>
              <ViewerComponent />
            </Col>
          </Row>
        )}
      </div>
    );
  };

  render() {
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
          <Route
            exact
            path="(/online-shop/|/online-shop/search)"
            component={this.Viewer}
          />
          <Route
            path="/online-shop/cart"
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
            path={
              "/online-shop/item-details/item-id-" +
              this.state.receivedData.activeItem.id
            }
            component={() => (
              <ItemDetailsContainer
                initialItems={this.state.initialData.items}
                item={this.state.receivedData.activeItem}
                onAddReview={this.handleAddReview}
                onAddToCartClick={this.handleAddToCart}
              />
            )}
          />
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
