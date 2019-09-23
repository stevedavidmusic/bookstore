import React, { Component } from "react";
import CartItems from "./cartItems/CartItems";
import StripeCheckout from "react-stripe-checkout";
import { getUser, getCart } from "../../redux/reducer";
import { connect } from "react-redux";
import axios from "axios";
import { ReactComponent as Exit } from "../../assets/exit.svg";
import "./cart.scss";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: ""
    };
  }

  deleteItem = (cart_item_id, user_id) => {
    axios.delete(`/api/deleteItem/${cart_item_id}`).then(() => {
      axios.get(`/api/getCart/${user_id}`).then(res => {
        this.props.getCart(res.data);
      });
    });
  };

  editCount = (quantity, cart_item_id, user_id, mode) => {
    if (mode === "plus") {
      quantity = quantity + 1;
    } else {
      quantity = quantity - 1;
    }
    let items = {
      quantity: quantity,
      cart_item_id: cart_item_id,
      user_id: user_id
    };
    if (quantity === 0) {
      this.deleteItem(cart_item_id, user_id);
    } else {
      axios.put(`/api/updateCart`, items).then(res => {
        this.props.getCart(res.data);
      });
    }
  };

  onToken = token => {
    const { user_id } = this.props.user;
    axios
      .post("/api/stripe", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: token.id
      })
      .then(() => {
        axios.delete(`/api/deleteCart/${user_id}`).then(res => {
          this.props.getCart(res.data);
        });
      })
      .then(() => {
        alert("Transaction Complete!");
      });
  };

  render() {
    const { cart } = this.props;
    const cartItems = cart.map(item => {
      return {
        book_id: item.book_id,
        cart_item_id: item.cart_item_id,
        quantity: item.quantity,
        user: item.user_id,
        image: item.image,
        title: item.title,
        price: item.price
      };
    });
    let total = 0;
    cart.forEach(obj => {
      total += obj.price * obj.quantity;
    });

    return (
      <div className="Cart__Master">
        <div className="Cart__CartContainer">
          <div className="Cart__ExitIcon">
            <Exit onClick={() => this.props.toggleCart()} />
          </div>
          {cart.length === 0 ? (
            <div className="Cart__Empty"><h1>Cart is Empty</h1></div>
          ) : (
            <div className="Cart__CartItems">
              <CartItems
                cartItems={cartItems}
                deleteItem={this.deleteItem}
                editCount={this.editCount}
                className="Cart__CartItems"
              />
              <div className="Cart__CheckoutContainer">
                <div className="Cart__Price">
                  <h3>TOTAL ${total}</h3>
                </div>
                <div className="Cart__StripeButton">
                  <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_3o1ZktybntixHkDxm6ks3LBr"
                  />
                </div>
              </div>
            </div>
          )}
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
  { getUser, getCart }
)(Cart);
