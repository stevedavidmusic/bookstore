import React from "react";
import { Link } from "react-router-dom";
import "./book.scss";

const Book = props => {
  return (
    <Link to={`/productview/${props.id}`} className="Book__Link">
    <img
      className="Book__Book"
      src={props.image}
      alt={`${props.title} by ${props.author}`}
    />
    </Link>
  );
};

export default Book;
