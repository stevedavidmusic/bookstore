import React from "react";
import { Link } from "react-router-dom";
import Book from "../book/Book";
import "./home.scss";

const Home = () => {
  return (
    <div className="Home__Master">
      <div className="Home__BannerContainer">
        <h1>REAL STORIES BY REAL PEOPLE</h1>
      </div>
      <div className="Home__BiographiesContainer">
        <div className="Home__Biographies">
          <Link to="/category/Biographies">
            <h1>BIOGRAPHIES</h1>
          </Link>
        </div>
        <div className="Home__Books">
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51kXC17zsfL._SX331_BO1,204,203,200_.jpg"
            id={33}
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51tp-82926L._SX330_BO1,204,203,200_.jpg"
            id={34}
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/417FbtkRvpL._SX322_BO1,204,203,200_.jpg"
            id={40}
          />
        </div>
      </div>
      <div className="Home__SportsContainer">
        <div className="Home__Sports">
          <Link to="/category/Sports">
            <h1>SPORTS</h1>
          </Link>
        </div>
        <div className="Home__Books">
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51A5TYMQ5EL._SX308_BO1,204,203,200_.jpg"
            id="47"
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/511xebjzYyL.jpg"
            id={14}
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51UK%2Bi0GtiL._SX322_BO1,204,203,200_.jpg"
            id={50}
          />
        </div>
      </div>
      <div className="Home__BusinessContainer">
        <div className="Home__Business">
          <Link to="/category/Business">
            <h1>BUSINESS</h1>
          </Link>
        </div>
        <div className="Home__Books">
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51RsAjKh5qL._SX328_BO1,204,203,200_.jpg"
            id={11}
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/514gipLhaVL._SX322_BO1,204,203,200_.jpg"
            id={24}
          />
          <Book
            className="Home__Book"
            image="https://images-na.ssl-images-amazon.com/images/I/51UTgF%2BpOYL._SX330_BO1,204,203,200_.jpg"
            id={12}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
