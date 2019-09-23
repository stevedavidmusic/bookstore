import React, { Component } from "react";
import "./categoryBar.scss";

class CategoryBar extends Component {
  changeCategory = e => {
    const { host } = window.location;
    const { value } = e.target;
    window.location = `http://${host}/#/category/${value}`;
  };

  render() {
    return (
      <div className="CategoryBar__Master" onChange={this.changeCategory}>
        <select className="CategoryBar__Dropdown">
          <option value="Biographies">
            Biographies
          </option>
          <option value="Business">
            Business
          </option>
          <option value="Cooking">Cooking</option>
          <option value="Entrepreneurship">Entrepreneurship</option>
          <option value={"Health & Fitness"}>{"Health & Fitness"}</option>
          <option value="Humor">Humor</option>
          <option value="Investing">Investing</option>
          <option value="Personal Finance">Personal Finance</option>
          <option value="Self-Improvement">Self-Improvement</option>
          <option value="Spirituality">Spirituality</option>
          <option value="Sports">Sports</option>
          <option value="Weight Loss">Weight Loss</option>
        </select>
      </div>
    );
  }
}

export default CategoryBar;
