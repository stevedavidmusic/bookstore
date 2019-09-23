import React, { Component } from "react";
import Product from "../product/Product";
import "./author.scss";
import axios from "axios";

class Author extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount = () => {
    axios.get(`/api/author/${this.props.match.params.author}`).then(results => {
      this.setState({
        books: results.data
      });
    });
  };

  render() {
    const { books } = this.state;
    const { author } = this.props.match.params
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
      <div className="Author__Master">
        <div className="Author__BooksByAuthor">
            <h1>Books by {author} ({books.length})</h1>
        </div>
        <div className="Shop__BooksContainer">{showBooks}</div>
      </div>
    );
  }
}

export default Author;
