import React from "react";
import { Link } from "react-router-dom";
import "./product.scss";

const Product = props => {
  return (
    <div className="Product__Master" >
      <Link to={`/productview/${props.id}`}>
        <img
          className="Product__Image"
          src={props.image}
          alt={`${props.title} by ${props.author}`}
        />
      </Link>
      <div className="Product__Title">
        <Link to={`/productview/${props.id}`}>
          <h1>{props.title}</h1>
        </Link>
      </div>
      <div className="Product__Author">
        <h2>
          by{" "}
          <Link to={`/author/${props.author}`} >
            <span>{props.author}</span>
          </Link>
        </h2>
      </div>
      <span className="Product__Price">
        <h2>${props.price}</h2>
      </span>
    </div>
  );
};

export default Product;
