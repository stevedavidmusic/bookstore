import React, { Component } from "react";
import Product from "../product/Product";
import CategoryBar from "../categoryBar/CategoryBar";
import axios from "axios";
import "./shop.scss";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount = () => {
    axios.get("/api/getBooks").then(response => {
      this.setState({
        books: response.data
      });
    });
  };

  render() {
    const { books } = this.state;
    const showBooks = books.map(book => {
      return (
        <Product
          className="Shop__Book"
          key={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          id={book.id}
          price={book.price}
        />
      );
    });
    
    return (
      <div className="Shop__Master">
        <div className="Shop__DropdownContainer">
          <div className="Shop__DropdownText">
            <h1>Search by Category</h1>
          </div>
          <div className="Shop__DropdownMenu">
            <CategoryBar />
          </div>
        </div>
        <div className="Shop__BooksContainer">{showBooks}</div>
      </div>
    );
  }
}

export default Shop;
