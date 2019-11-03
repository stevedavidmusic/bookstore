module.exports = {
  getBooks: async (req, res) => {
    try {
      const books = await req.app.get("db").getBooks();
      await res.status(200).json(books);
    } catch (err) {
      console.log("getbooks ERROR", err);
    }
  },

  getBookInfo: async (req, res) => {
    const { id } = req.params;
    try {
      const info = await req.app.get("db").getBookInfo(id);
      await res.status(200).json(info);
    } catch (err) {
      console.log("getBookInfo", err);
    }
  },

  getBooksByAuthor: async (req, res) => {
    const { author } = req.params;
    try {
      const books = await req.app.get("db").getBooksByAuthor(author);
      await res.status(200).json(books);
    } catch (err) {
      console.log("getBooksByAuthor", err);
    }
  },

  getBooksByCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const books = await req.app.get("db").getBooksByCategory(category);
      await res.status(200).json(books);
    } catch (err) {
      console.log("getBooksByCategory", err);
    }
  },

  getCart: async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await req.app.get("db").getCart(id);
      await res.status(200).json(cart);
    } catch (err) {
      console.log("getCart", err);
    }
  },

  getRecommendations: async (req, res) => {
    let { subject, id } = req.params;
    try {
      const books = await req.app.get("db").getRecommendations(subject, id);
      await res.status(200).json(books);
    } catch (err) {
      console.log("getRecommendations", err);
    }
  },

  addToCart: async (req, res) => {
    const { id, count, user_id, price, image, title } = req.body;
    try {
      const item = await req.app
        .get("db")
        .addCartItem([id, count, user_id, price, image, title]);
      await res.status(200).json(item);
    } catch (err) {
      console.log("addToCart", err);
    }
  },

  updateCart: async (req, res) => {
    const { quantity, cart_item_id, user_id } = req.body;
    try {
      const item = await req.app
        .get("db")
        .updateItemCount(quantity, cart_item_id, user_id);
      await res.status(200).json(item);
    } catch (err) {
      console.log("updateCart", err);
    }
  },

  stripeCheckout: (req, res) => {
    const stripeToken = req.body;
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    stripe.charges.create(
      {
        amount: 1000,
        currency: "usd",
        description: "Example Charge",
        source: stripeToken.body
      },
      function(err, charge) {
        console.log("charge", charge);
        if (err) {
          res.send({
            success: false,
            message: "Error"
          });
        } else {
          res.send({
            success: true,
            message: "Success"
          });
        }
      }
    );
  },

  deleteItem: async (req, res) => {
    const { id } = req.params;
    try {
      const items = await req.app.get("db").deleteCartItem(id);
      await res.status(200).json(items);
    } catch (err) {
      console.log("deleteItem", err);
    }
  },

  deleteCart: async (req, res) => {
    const { id } = req.params;
      try {
      const cart = await req.app.get("db").deleteCart(id)
      await res.status(200).json(cart);
      } catch (err) {
        console.log("deleteCart ERROR", err)
      }
  }
};
