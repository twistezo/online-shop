import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Item } from '../../../data/DataGenerator'
import { Container, Row } from 'react-bootstrap'

class ReviewsList extends Component {
  render() {
    const itemWithUpdatedReviews = this.props.initialItems.find(
      i => i.id === this.props.item.id
    )
    let reviews = []
    itemWithUpdatedReviews.reviews.forEach((review, i) => {
      reviews.push(
        <div key={i}>
          <Container className='pt-3'>
            <Row>
              {review.name} -{' '}
              {new Date(review.date).toLocaleString('pl-PL', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
              })}
            </Row>
            <Row>{review.text}</Row>
          </Container>
        </div>
      )
    })
    return reviews
  }
}

ReviewsList.propTypes = {
  item: PropTypes.instanceOf(Item),
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item))
}

export default ReviewsList
