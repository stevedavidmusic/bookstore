import React from "react";
import { Link } from "react-router-dom";
import './recommended.scss'; 

const Recommended = props => {
  return (
    <div className="Recommended__Master">
      <Link to={`/productview/${props.id}`}>
        <img
          className="Recommended__Image"
          src={props.image}
          alt={`${props.title} by ${props.author}`}
        />
      </Link>
      <div className="Recommended__Title">
        <Link to={`/productview/${props.id}`}>
          <h2>{props.title}</h2>
        </Link>
      </div>
      <div className="Product__Author">
        <h3>
          by{" "}
          <Link to={`/author/${props.author}`} >
            <span>{props.author}</span>
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Recommended;
