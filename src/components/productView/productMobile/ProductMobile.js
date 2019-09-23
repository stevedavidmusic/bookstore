import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as MinusSign } from "../../../assets/minus_sign.svg";
import { ReactComponent as PlusSign } from "../../../assets/plus_sign.svg";
import "./productMobile.scss";

const ProductMobile = props => {
  return (
    <div className="ProductMobile__Master">
      <div className="ProductMobile__Image">
        <img src={props.image} alt={props.title} />
      </div>
      <div className="ProductMobile__Title">
        <h1>{props.title}</h1>
      </div>
      <div className="ProductMobile__Author">
            <h2>
              by{" "}
              <span className="ProductMobile_AuthorLink">
                {
                  <Link
                    className="ProductMobile__Author"
                    to={`/author/${props.author}`}
                  >
                    {props.author}
                  </Link>
                }
              </span>
            </h2>
      </div>
      <div className="ProductMobile__EditContainer">
        <div
          className="ProductMobile__MinusButton"
          onClick={() => props.subtractCount()}
        >
          <MinusSign className="ProductMobile__MinusSign" />
        </div>
        <div className="ProductMobile__Count">
          <h1>{props.count}</h1>
        </div>
        <div
          className="ProductMobile__AddButton"
          onClick={() => props.addCount()}
        >
          <PlusSign className="ProductMobile__PlusSign" />
        </div>
      </div>
      <div
        className="ProductMobile__AddToCart"
        onClick={() => props.addToCart()}
      >
        <h2>ADD TO CART</h2>
      </div>
      <div className="ProductMobile__DescriptionTag">
        <h3>DESCRIPTION</h3>
      </div>
      <div className="ProductMobile__Description">
        <h4>{props.description}</h4>
      </div>
      <div className="ProductMobile__MiscInfo">
        <h3>{props.pages} pages</h3>
        <span className="ProductMobile__SubjectsLink">
          <h3>{props.subjects}</h3>
        </span>
      </div>
    </div>
  );
};

export default ProductMobile;
