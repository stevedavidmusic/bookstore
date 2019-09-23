import React from "react";
import { ReactComponent as Exit } from "../../../assets/exit.svg";
import { ReactComponent as PlusSign } from "../../../assets/plus_sign.svg";
import { ReactComponent as MinusSign } from "../../../assets/minus_sign.svg";
import "./cartItems.scss";

const CartItems = props => {
  const { cartItems } = props;
  const mappedItems = cartItems.map(item => {
    return (
      <div className="CartItems__Master" key={item.cart_item_id}>
        {cartItems.length === 0 && <div>CART IS EMPTY</div>}
        <div className="CartItems__Image">
          <img src={item.image} alt={item.title} className="CartItems__Image" />
        </div>
        <div className="CartItems__Details">
          <div className="CartItems__Name">
            <h3>{item.title}</h3>
          </div>
          <div className="CartItems__Price">
            <h3>Price: ${item.price * item.quantity}</h3>
          </div>
          <div className="CartItems__Quantity">
            <h3>Quantity: </h3>
          </div>
          <div className="CartItems__Edit">
            <MinusSign
              className="CartItems__MinusSign"
              onClick={() =>
                props.editCount(
                  item.quantity,
                  item.cart_item_id,
                  item.user,
                  "minus"
                )
              }
            />
            <div className="CartItems__Count">
              <h3>{item.quantity}</h3>
            </div>
            <PlusSign
              className="CartItems__PlusSign"
              onClick={() =>
                props.editCount(
                  item.quantity,
                  item.cart_item_id,
                  item.user,
                  "plus"
                )
              }
            />
          </div>
        </div>
        <div className="CartItems__ExitIcon">
          <Exit
            onClick={() => props.deleteItem(item.cart_item_id, item.user)}
          />
        </div>
      </div>
    );
  });
  return <div className="CartProduct__Master">{mappedItems}</div>;
};

export default CartItems;
