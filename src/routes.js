import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductView from "./components/productView/ProductView";
import Shop from "./components/shop/Shop";
import Author from "./components/author/Author";
import Category from "./components/category/Category"; 

export default (
  <Switch>
    <Route component={Home} exact path="/" />
    <Route component={ProductView} path="/productview/:id" />
    <Route component={Shop} path="/shop" />
    <Route component={Author} path="/author/:author/" />
    <Route component={Category} path="/category/:category" />
  </Switch>
);
