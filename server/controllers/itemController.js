module.exports = {
  getBooks: (req, res ) => {
    req.app
      .get("db")
      .getBooks()
      .then(books => {
        res.status(200).json(books);
      })
      .catch(err => console.log("getbooks ERROR", err));
  },

  getBookInfo: (req, res ) => {
    const { id } = req.params;
    req.app
      .get("db")
      .getBookInfo(id)
      .then(book => {
        res.status(200).json(book);
      })
      .catch(err => console.log("getBookInfo", err));
  },

  getBooksByAuthor: (req, res ) => {
    const { author } = req.params;
    req.app
      .get("db")
      .getBooksByAuthor(author)
      .then(books => {
        res.status(200).json(books);
      })
      .catch(err => console.log("getBooksByAuthor", err));
  },

  getBooksByCategory: (req, res ) => {
    const { category } = req.params;
    req.app
      .get("db")
      .getBooksByCategory(category)
      .then(books => {
        res.status(200).json(books);
      })
      .catch(err => console.log("getBooksByCategory", err));
  },

  getCart: (req, res ) => {
    const { id } = req.params;
    req.app
      .get("db")
      .getCart(id)
      .then(cart => {
        res.status(200).json(cart);
      })
      .catch(err => console.log("getCart", err));
  },

  getRecommendations: (req, res ) => {
    let { subject, id } = req.params;
    req.app
      .get("db")
      .getRecommendations(subject, id)
      .then(books => {
        res.status(200).json(books);
      })
      .catch(err => console.log("getRecommendations", err));
  },

  addToCart: (req, res ) => {
    const { id, count, user_id, price, image, title } = req.body;
    req.app
      .get("db")
      .addCartItem([id, count, user_id, price, image, title])
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => console.log("addToCart", err));
  },

  updateCart: (req, res ) => {
    const { quantity, cart_item_id, user_id } = req.body;
    req.app
      .get("db")
      .updateItemCount(quantity, cart_item_id, user_id)
      .then(item => {
        res.status(200).json(item);
      })
      .catch(err => console.log("updateCart", err));
  },

  stripeCheckout: (req, res ) => {
    const stripeToken = req.body;
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
    
    stripe.charges.create({
        amount: 1000,
        currency: 'usd',
        description: 'Example Charge',
        source: stripeToken.body
      }, function(err, charge) {
          console.log('charge', charge)
          if(err){
            res.send({
                success: false,
                message: 'Error'
            })
          } else {
            res.send({
            success: true,
            message: 'Success'
         })
          }
      });  
  }, 

  deleteItem: (req, res ) => {
    const { id } = req.params;
    req.app
      .get("db")
      .deleteCartItem(id)
      .then(items => {
        res.status(200).json(items);
      })
      .catch(err => console.log("deleteItem", err));
  },

  deleteCart: (req, res ) => {
    console.log("DELETE CART START")
    const { id } = req.params
    req.app.get("db").deleteCart(id).then((cart) => {
      res.status(200).json(cart)
    })
  }
};
