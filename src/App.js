import React, { Component } from "react";
import NavBar from "./components/navBar/NavBar";
import Cart from "./components/cart/Cart";
import "./App.scss";
import routes from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false
    };
    this.toggleCart = this.toggleCart.bind(this);
  }

  toggleCart = () => {
    if (this.state.showCart === false) {
      this.setState({
        showCart: true
      });
    } else {
      this.setState({
        showCart: false
      });
    }
  };

  render() {
    const { showCart } = this.state;
    return (
      <div className="App__Master">
        <div className="App__NavBar">
          <NavBar showCart={showCart} toggleCart={this.toggleCart} />
          {routes}
        </div>
        <div>
          {showCart && (
            <Cart
              className="App__Cart"
              showCart={showCart}
              toggleCart={this.toggleCart}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
