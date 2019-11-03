import React, { Component } from "react";
import Recommended from "./recommended/Recommended";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductMobile from "./productMobile/ProductMobile";
import ProductDesktop from "./productDesktop/ProductDesktop";
import { getUser, getCart } from "../../redux/reducer";
import { connect } from "react-redux";
import "./productView.scss";

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      book: [
        {
          title: "",
          author: "",
          description: "",
          id: 0,
          image: "",
          pages: 0,
          price: 0,
          subject: []
        }
      ],
      recommendations: []
    };
    this.addCount = this.addCount.bind(this);
    this.subtractCount = this.subtractCount.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateCart = this.updateCart.bind(this);
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.getBook();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.match.params !== this.props.match.params) {
      window.scrollTo(0, 0);
      this.getBook();
    }
  };

  getBook = async () => {
    const { id } = this.props.match.params;
    const book = await axios.get(`/api/book/${id}`)
    await this.setState({
      book: book.data
    })
    const subject = this.state.book[0].subject[0];
    const recommendations = await axios.get(`/api/recommendations/${id}/${subject}`)
    await this.setState({
      recommendations: recommendations.data
    })
  };


  addCount = () => {
    if (this.state.count < 99) {
      this.setState({
        count: this.state.count + 1
      });
    }
  };

  subtractCount = () => {
    if (this.state.count > 1) {
      this.setState({
        count: this.state.count - 1
      });
    }
  };

  addItem = async items => {
    await axios.post("/api/addToCart/", items)
    await this.getCart()
  };

  updateCart = async update => {
   await axios.put("/api/updateCart/", update)
   await this.getCart()
  };

  getCart = async () => {
    if (this.props.user !== ""){
      const user = await axios.get(`/api/getCart/${this.props.user.user_id}`)
      if(user.data.length !== 0){
        this.props.getCart(user.data)
      }
    }
  };


  addToCart = () => {
    const { id, price, image, title } = this.state.book[0];
    const { count } = this.state;
    const { cart } = this.props;
    const { user_id } = this.props.user;
    const items = {
      id: id,
      title: title,
      count: count,
      user_id: user_id,
      price: price,
      image: image
    };
    if (!this.props.user) {
      alert("Please login");
    } else {
      if (cart.length === 0) {
        this.addItem(items);
      } else {
        let item = cart.filter(obj => {
          return obj.book_id === parseInt(this.props.match.params.id);
        });
        if (item.length === 0) {
          this.addItem(items);
        } else {
          const cart_item_id = item[0].cart_item_id;
          const quantity = item[0].quantity;
          const updated_quantity = quantity + count;
          const update = {
            quantity: updated_quantity,
            cart_item_id: cart_item_id,
            user_id: user_id
          };
          this.updateCart(update);
        }
      }
    }
  };

  render() {
    const {
      author,
      description,
      id,
      image,
      pages,
      price,
      subject,
      title
    } = this.state.book[0];
    const { count, recommendations } = this.state;
    const subjects = subject.map(subject => {
      return (
        <Link to={`/category/${subject}`} key={subject}>
          <h3>{subject}</h3>
        </Link>
      );
    });

    const related = recommendations.map(book => {
      return (
        <Recommended
          className="Shop__Book"
          key={book.id}
          title={book.title}
          author={book.author}
          image={book.image}
          id={book.book_id}
        />
      );
    });

    return (
      <div className="ProductView__Master">
        <div className="ProductView__Mobile">
          <ProductMobile
            key={id}
            subjects={subjects}
            author={author}
            description={description}
            id={id}
            image={image}
            pages={pages}
            price={price}
            title={title}
            count={count}
            addCount={this.addCount}
            subtractCount={this.subtractCount}
            addToCart={this.addToCart}
          />
        </div>
        <div className="ProductView__Desktop">
          <ProductDesktop
            key={id}
            subjects={subjects}
            author={author}
            description={description}
            id={id}
            image={image}
            pages={pages}
            price={price}
            title={title}
            count={count}
            addCount={this.addCount}
            subtractCount={this.subtractCount}
            addToCart={this.addToCart}
            related={related}
          />
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
)(ProductView);
