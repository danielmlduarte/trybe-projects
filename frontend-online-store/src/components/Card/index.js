import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addToCart } from '../../services/cartApi';

import './style.css'

class Card extends Component {
  render() {
    let { searchInput } = this.props;
    const { categoryID, product } = this.props;
    const {
      title,
      thumbnail,
      price,
      id,
      shipping: { free_shipping: freeShipping },
    } = product;
    searchInput = (searchInput !== '') ? searchInput : false;
    return (
      <article data-testid="product" className="card-container">
        <header className="card-header">
          {freeShipping && <span className="card-freeshipping-tag" data-testid="free-shipping">Frete Grátis</span>}
          <img className="card-image" alt="product thumbnail" src={ thumbnail } />
        </header>
        <main className="card-main">
          <h2 className="card-title">{title}</h2>
          <p>{`R$ ${price}`}</p>
          <Link
            className="card-button-details"
            to={ `/product/${id}/${categoryID}/${searchInput}` }
            data-testid="product-detail-link"
          >
            Detalhes do produto
          </Link>
        </main>
        <footer className="card-footer">
          <button
            className="cart-button-cart btn btn-success"
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => addToCart(product) }
          >
            Adicionar ao carrinho
          </button>
        </footer>
      </article>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  categoryID: PropTypes.string.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default Card;
