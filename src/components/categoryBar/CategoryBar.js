import React from "react";
import "./categoryBar.scss";

const CategoryBar = props =>  {
    return (
      <div className="CategoryBar__Master" onChange={props.changeCategory}>
        <select className="CategoryBar__Dropdown">
          <option value="">
            All
          </option>
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

export default CategoryBar;
