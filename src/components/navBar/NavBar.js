import React, { Component } from "react";
import axios from "axios";
import { getUser, getCart, clearCart } from "../../redux/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./navBar.scss";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      toggleLink: false
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount = async () => {
    const user = await axios.get("/api/userData");
    await this.props.getUser(user.data);
    if (this.props.user !== "") {
      const cart = await axios.get(`/api/getCart/${this.props.user.user_id}`);
      await this.props.getCart(cart.data);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.cart.length !== this.props.cart.length) {
      this.getUserCart();
    }
  };

  toggleLink = () => {
    if (this.state.toggleLink === false) {
      this.setState({
        toggleLink: true
      });
    } else {
      this.setState({
        toggleLink: false
      });
    }
  };

  getUserCart = async () => {
    if (this.props.user !== "") {
      const cart = await axios.get(`/api/getCart/${this.props.user.user_id}`);
      if (cart.data.length !== 0) {
        await this.props.getCart(cart.data);
      }
    }
  };

  login = () => {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  };

  logout = async () => {
    const logout = await axios.get("/api/logout");
    await this.props.getUser(logout.data);
    await this.props.clearCart();
  };

  render() {
    const { user, cart } = this.props;
    let quantity = 0;
    cart.forEach(item => {
      quantity += item.quantity;
    });

    return (
      <div className="NavBar__Master">
        <div
          className="NavBar__HomeAndShopMobile"
          onClick={() => this.forceUpdate()}
        >
          {window.location.hash === "#/shop" ? (
            <Link to="/">
              <h1>Home</h1>
            </Link>
          ) : (
            <Link to="/shop">
              <h1>Shop</h1>
            </Link>
          )}
        </div>
        <div className="NavBar__LoginMobile">
          {!user ? (
            <div onClick={() => this.login()}>
              <h1>Login</h1>
            </div>
          ) : (
            <div onClick={() => this.logout()}>
              <h1>Logout</h1>
            </div>
          )}
        </div>
        <div className="NavBar__Home">
          <Link to="/">
            <h1>RealBooks</h1>
          </Link>
        </div>
        <div className="NavBar__Right">
          <div className="NavBar__Shop">
            <Link to="/shop">
              <h1>Shop</h1>
            </Link>
          </div>
          <h1 className="NavBar__LineDivider"> | </h1>
          <div className="NavBar__Login">
            {!user ? (
              <div onClick={() => this.login()}>
                <h1>Login</h1>
              </div>
            ) : (
              <div onClick={() => this.logout()}>
                <h1>Logout</h1>
              </div>
            )}
          </div>
          <h1 className="NavBar__LineDivider">|</h1>
          <div className="NavBar__Cart">
            <div
              className="NavBar__CartLink"
              onClick={() => this.props.toggleCart()}
            >
              <h1>Cart</h1>
              {cart.length !== 0 ? (
                <div className="NavBar__CartCounter">
                  <div className="NavBar__CartLength">{quantity}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  };
};

export default connect(
  mapStateToProps,
  { getUser, getCart, clearCart }
)(NavBar);
