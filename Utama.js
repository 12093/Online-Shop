import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
// Load Navbar
import Navbar from "./component/Navbar";
// Load halaman
import Cart from "./client/Cart";
import Payment from "./client/Payment";
import Checkout from "./client/Checkout";
import Profil from "./client/Profil";
import Produk from "./client/Produk";
import Product from "./page/Product";
import Register from "./page/Register";
import User from "./page/User";
import Login from "./page/Login";
import Order from "./client/Order";

class Utama extends Component {
  render = () => {
    return (
      <Switch>
        {/* Load component tiap halaman */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/product">
          <Navbar />
          <Product />
        </Route>
        <Route path="/produk">
          <Navbar />
          <Produk />
        </Route>
        <Route path="/user">
          <Navbar />
          <User />
        </Route>
        <Route path="/cart">
          <Navbar />
          <Cart />
        </Route>
        <Route path="/checkout">
          <Navbar />
          <Checkout />
        </Route>
        <Route path="/payment">
          <Navbar />
          <Payment />
        </Route>
        <Route path="/Profil">
          <Navbar />
          <Profil />
        </Route>
        <Route path="/Order">
          <Navbar />
          <Order />
        </Route>
      </Switch>
      
    );
  }
}

export default Utama;
