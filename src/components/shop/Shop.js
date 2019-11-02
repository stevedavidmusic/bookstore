import React, { Component } from "react";
import Product from "../product/Product";
import CategoryBar from "../categoryBar/CategoryBar";
import axios from "axios";
import "./shop.scss";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      category: ""
    };
  }

  componentDidMount = () => {
    axios.get("/api/getBooks").then(response => {
      this.setState({
        books: response.data
      });
    });
  };

  changeCategory = e => {
    this.setState({
      category: e.target.value
    });
    console.log(this.state.category);
  };

  render() {
    const { books, category } = this.state;
    
    const filteredBooks = books.filter(book => {
      if (category !== "") {
        return book.subject.includes(category);
      } else {
        return books;
      }
    });

    const showBooks = filteredBooks.map(book => {
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
            <CategoryBar changeCategory={this.changeCategory} />
          </div>
        </div>
        <div className="Shop__BooksContainer">{showBooks}</div>
      </div>
    );
  }
}

export default Shop;
