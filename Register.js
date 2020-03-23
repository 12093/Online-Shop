import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      id: "",
      name: "",
      username: "",
      password: "",
      repassword: "",
      role: "user",
      action: "",
      find: "",
      message: ""
    }
  }

  bind = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  Save = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.repassword) {
      let url = "http://localhost/online.shop/public/user/save";
      let form = new FormData();
      form.append("name", this.state.name);
      form.append("username", this.state.username);
      form.append("password", this.state.password);
      form.append("repassword", this.state.repassword);
      axios.post(url, form)
        .then(response => {
          this.setState({ message: response.data.message });
          this.get_user()
        })
        .catch(error => {
          console.log(error);
        });
        window.location = "/login";
    }
    else {
      window.location = "/register";
      alert("Password not match")
    }
  }



  render() {
    return (
      <div className="container" style={{ width: "50%" }}>
        <br></br><br></br>
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="text-dark">Register User</h5>
          </div>
          <div className="card-body">
            <form onSubmit={this.Save}>
              <div className="form-group">
                <label for="name">Name</label>
                <input type="text" className="form-control" name="name" placeholder="Masukkan Nama"
                  value={this.state.name}
                  onChange={this.bind} required
                />
              </div>
              <div className="form-group">
                <label for="username">Username</label>
                <input type="username" className="form-control" name="username" placeholder="Masukkan Username"
                  value={this.state.username}
                  onChange={this.bind} required
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" className="form-control" name="password" placeholder="Masukkan Password"
                  value={this.state.password}
                  onChange={this.bind} required
                />
              </div>

              <div className="form-group">
                <label for="repassword">Repeat Password</label>
                <input type="password" className="form-control" name="repassword" placeholder="Ulangi Password"
                  onChange={this.bind} required
                />
              </div>

              <div className="col-md-13 mb-6">
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                  Register
                </button>
                <a href="/login">Sudah punya akun? login disini!</a>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;