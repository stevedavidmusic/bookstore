import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MinusSign } from "../../../assets/minus_sign.svg";
import { ReactComponent as PlusSign } from "../../../assets/plus_sign.svg";
import "./productDesktop.scss";

const ProductDesktop = props => {
  return (
    <div className="ProductDesktop__Master">
      <div className="ProductDesktop__TopContainer">
        <div className="ProductDesktop__ImageContainer">
          <img
            className="ProductDesktop__Image"
            src={props.image}
            alt={props.title}
          />
        </div>
        <div className="ProductDesktop__BookInfo">
          <div className="ProductDesktop__Title">
            <h1>{props.title}</h1>
          </div>
          <div className="ProductDesktop__Author">
            <h2>
              by{" "}
              <span className="ProductDesktop__AuthorLink">
                <Link
                  className="ProductDesktop__Author"
                  to={`/author/${props.author}`}
                >
                  {props.author}
                </Link>
              </span>
            </h2>
          </div>
          <div className="ProductDesktop__MiscInfo">
            <h3>{props.pages} pages</h3>
            <span className="ProductDesktop__SubjectsLink">
              <h3>{props.subjects}</h3>
            </span>
            <div className="ProductDesktop__Price">
            <h3>${props.price}</h3>
          </div>
          </div>
        </div>
      </div>
      <div className="ProductDesktop__AddContainer">
        <div className="ProductDesktop__CountToggle">
          <div
            className="ProductDesktop__MinusButton"
            onClick={() => props.subtractCount()}
          >
            <MinusSign className="ProductDesktop__MinusSign" />
          </div>
          <div className="ProductDesktop__Count">
            <h3>{props.count}</h3>
          </div>
          <div
            className="ProductDesktop__AddButton"
            onClick={() => props.addCount()}
          >
            <PlusSign className="ProductDesktop__PlusSign" />
          </div>
          <div
            className="ProductDesktop__AddToCart"
            onClick={() => props.addToCart()}
          >
            <h3>ADD TO CART</h3>
          </div>
        </div>
      </div>
      <div className="ProductDesktop__Description">
        <h3>{props.description}</h3>
      </div>
      <div className="ProductDesktop__Recommended"> 
        <h1>Recommended</h1>
        <div className="ProductDesktop__RecommendedBooks">
          {props.related}
        </div>
      </div>
    </div>
  );
};

export default ProductDesktop;
