import React, { Component } from "react";
import CategoryBar from "../categoryBar/CategoryBar";
import Product from "../product/Product";
import "./category.scss";
import axios from "axios";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount = () => {
    this.getCategory();
  };

  componentDidUpdate = prevProps => {
    if(prevProps.match.params !== this.props.match.params){
      this.getCategory();
    }
  };

  getCategory = () => {
    const { category } = this.props.match.params;
    axios.get(`/api/categories/${category}`).then(results => {
      this.setState({
        books: results.data
      });
    });
  };

  render() {
    const { books } = this.state;
    const { category } = this.props.match.params;
    const showBooks = books.map(book => {
      return (
        <Product
          className="Shop__Book"
          key={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          id={book.book_id}
          price={book.price}
        />
      );
    });
    return (
      <div className="Category__Master">
        <div className="Category__BooksByCategory">
          <h1>
            Books by Subject: {category} ({books.length})
          </h1>
        </div>
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

export default Category;
