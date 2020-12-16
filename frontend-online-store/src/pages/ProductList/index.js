import React, { Component } from 'react';

import Card from '../../components/Card';
import CartButton from '../../components/CartButton';
import CategoryList from '../../components/CategoryList';

import { getProductsFromCategoryAndQuery } from '../../services/api';

import './style.css'

class ProductList extends Component {
  constructor() {
    super();

    this.state = {
      results: [],
      searchInput: '',
      categoryID: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSearch() {
    const { searchInput } = this.state;
    getProductsFromCategoryAndQuery('', searchInput)
      .then(({ results }) => this.setState({ results }));
  }

  handleChangeCategory(categoryID) {
    const { searchInput } = this.state;
    getProductsFromCategoryAndQuery(categoryID, searchInput)
      .then(({ results }) => this.setState({ results }));
    this.setState({ categoryID });
  }

  render() {
    const { results, searchInput, categoryID } = this.state;
    return (
      <section className="body-container">
        <header className="header">
          <div className="search-bar-container" >            
            <label
              htmlFor="searchInput"
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </label>
            <input
              className="search-bar"
              id="searchInput"
              type="text"
              name="searchInput"
              value={ searchInput }
              data-testid="query-input"
              onChange={ this.handleInputChange }
            />
          </div>
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
          <CartButton />
        </header>
        <main className="main-container">
          <aside className="category-container">
            <CategoryList onChange={ this.handleChangeCategory } />
          </aside>
          <section className="products-container">
            {results.map((result) => (
              <Card
                key={ result.id }
                product={ result }
                categoryID={ categoryID }
                searchInput={ searchInput }
              />
            ))}
            {!results.length && <p>Nenhum produto foi encontrado</p>}
          </section>
        </main>
      </section>
    );
  }
}

export default ProductList;
