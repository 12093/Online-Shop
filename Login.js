import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      message: ""
    }
  }
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/online.shop/public/user/auth";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);

    axios.post(url, form)
      .then(response => {
        let logged = response.data.status;
        if (logged) {
          let role = localStorage.getItem("role")
          { role === "admin" ? window.location = "/login" : window.location = "/produk"}
          this.setState({ message: "Login Berhasil" });
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("role", JSON.stringify(response.data.role));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("id", JSON.stringify(response.data.user.id))
          if ( response.data.user.role === "admin" ) {
            window.location = "/product";
          } else {
            window.location = "/produk";
          }
        } else {
          this.setState({ message: "Login Gagal" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return (

      <div className="container" style={{ width: "40%" }}>
        <br></br><br></br>
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="text-dark float">Login User</h5>
          </div>
          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
              <label for="username">Username</label>
              <input
                type="text" className="form-control m-1" name="username"
                value={this.state.username} onChange={this.bind}
                required placeholder="Masukkan username" />
              <label for="password">Password</label>
              <input
                type="password" className="form-control m-1" name="password"
                value={this.state.password} onChange={this.bind}
                required placeholder="Masukkan password" />
              <div className="col-md-13 mb-4">
                <br></br>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Login
                </button>
                <a href="/register">Belum punya akun? register disini!</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;