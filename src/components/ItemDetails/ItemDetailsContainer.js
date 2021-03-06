import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item } from '../../data/DataGenerator'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Review } from '../../data/DataGenerator'
import Images from './Images'
import ReviewsList from './Reviews/ReviewsList'
import DataUtils from '../../data/DataUtils'
import ReviewsForm from './Reviews/ReviewsForm'

class ItemDetailsContainer extends Component {
  handleAddToCart = () => {
    this.props.onAddToCartClick(this.props.routeParamId)
  }

  handleAddReview = (name, review) => {
    this.props.onAddReview(
      new Review(name, new Date(), review),
      this.props.routeParamId
    )
  }

  ItemNotExists = () => (
    <div className='text-center'>
      <div className='pb-2'>
        <h1>Error</h1>
        <h3>Item with given id '{this.props.routeParamId}' does not exists.</h3>
      </div>
    </div>
  )

  Container = props => {
    return (
      <Container className='pb-5'>
        <Row>
          <Col sm={6} className='pb-4 pb-sm-0'>
            <Images imagesSources={props.item.imagesSources} />
          </Col>
          <Col sm={6}>
            <Container>
              <Row>
                <h3>{props.item.name}</h3>
              </Row>
              <Row>
                <p>Id: {props.item.id}</p>
              </Row>
              <Row className='text-justify'>
                <p>{props.item.descriptionLong}</p>
              </Row>
              <Row>
                <Col className='align-self-center pl-0'>
                  <span className='float-left'>
                    On stock: {props.item.quantityOnStock}
                  </span>
                </Col>
                <Col className='pr-0'>
                  <Button
                    className='float-right'
                    disabled={props.item.quantityOnStock === 0}
                    onClick={this.handleAddToCart}
                  >
                    Add &nbsp; <i className='fas fa-cart-arrow-down' />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <hr className='mt-4 mb-4' />
        <Row>
          <Container className='pl-15'>
            <h4>Reviews</h4>
            <ReviewsList item={props.item} initialItems={props.initialItems} />

            <ReviewsForm onAddReview={this.handleAddReview} />
          </Container>
        </Row>
      </Container>
    )
  }

  render() {
    const idFromUrl = this.props.routeParamId
    const initialItems = this.props.initialItems
    return (
      <div>
        {DataUtils.getItemById(initialItems, idFromUrl) ? (
          <this.Container
            item={DataUtils.getItemById(initialItems, idFromUrl)}
            initialItems={initialItems}
          />
        ) : (
          <this.ItemNotExists />
        )}
      </div>
    )
  }
}

ItemDetailsContainer.propTypes = {
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  routeParamId: PropTypes.string,
  onAddReview: PropTypes.func,
  onAddToCartClick: PropTypes.func
}

export default ItemDetailsContainer
