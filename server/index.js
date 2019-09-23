const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const massive = require("massive");
const app = express();
const ac = require("./controllers/authController")
const ic = require("./controllers/itemController")

require("dotenv").config()

app.use(bodyParser.json());

app.use(
  session({
    secret: "mega hyper ultra secret",
    saveUninitialized: false,
    resave: false
  })
);

massive(process.env.CONNETION_STRING)
  .then(db => {
    console.log("Connected to DB");
    app.set("db", db);
  })
  // .catch(err => console.log(err));

app.use( express.static( `${__dirname}/../build` ) )

// GET
app.get("/api/userData", ac.getUserData);
app.get("/auth/callback", ac.login);
app.get("/api/logout", ac.logout);
app.get("/api/session_info", ac.sessionInfo);
app.get("/api/getBooks", ic.getBooks);
app.get("/api/book/:id", ic.getBookInfo);
app.get("/api/getCart/:id", ic.getCart)
app.get("/api/author/:author", ic.getBooksByAuthor)
app.get("/api/categories/:category", ic.getBooksByCategory)
app.get("/api/recommendations/:id/:subject", ic.getRecommendations)

// POST
app.post("/api/addToCart", ic.addToCart)
app.post("/api/stripe", ic.stripeCheckout)

// UPDATE
app.put("/api/updateCart", ic.updateCart)

// DELETE
app.delete("/api/deleteItem/:id", ic.deleteItem)
app.delete("/api/deleteCart/:id", ic.deleteCart)

const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Ready to rollout on PORT ${PORT}!`);
});
