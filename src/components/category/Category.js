import React, { Component } from "react";
import CategoryBar from "../categoryBar/CategoryBar";
import Product from "../product/Product";
import "./category.scss";
import axios from "axios";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      subject: ""
    };
  }

  componentDidMount = async () => {
    const books = await axios.get("/api/getBooks");
    await this.setState({
      books: books.data,
      subject: this.props.match.params
    });
  };

  changeCategory = e => {
    this.setState({
      subject: { category: e.target.value }
    });
  };

  render() {
    const { books, subject } = this.state;

    const filteredBooks = books.filter(book => {
      if (subject !== "") {
        return book.subject.includes(subject.category);
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
      <div className="Category__Master">
        <div className="Category__BooksByCategory">
          <h1>
            Books by Subject: {subject.category} ({showBooks.length})
          </h1>
        </div>
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

export default Category;
