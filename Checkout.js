import React, { Component } from 'react'
import $ from "jquery";
import axios from "axios";

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            carts: [],
            num: 0,
            total: 0,
            alamat: [],
            id_alamat: "",
            nama_penerima: "",
            pos: "",
            kecamatan: "",
            kota: "",
            jalan: "",
            rt: "",
            rw: "",
            message: "",
            action: "",
            find: "",
            message: ""
        }
    }
    getCarts = () => {
        let items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
        let total = 0
        let num = 0
        items.forEach(item => {
            total += item.total
            num += item.qty
        });
        this.setState({
            carts: items,
            num: num,
            total: total
        });
    }
    componentDidMount() {
        this.getCarts()
        this.get_alamat()
    }


    removeFromCart = (product) => {
        let carts = JSON.parse(localStorage.getItem('cart'));
        let cart = carts.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.getCarts()
    }
    clearCart = () => {
        localStorage.removeItem('cart');
        this.setState({ carts: [] });
    }
    get_alamat = () => {
        let id = JSON.parse(localStorage.getItem('id'))
        let url = "http://localhost/online.shop/public/address/" + id;
        axios.get(url)
            .then(response => {
                this.setState({
                    alamat: response.data.alamat,
                });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const { carts, num, total, alamat } = this.state;
        console.log(alamat);
        return (
            <div>
                <div className="container">
                    <div className="py-5 text-center">
                        <h2>Checkout Form</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4">
                            <h4 className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Your cart</span>
                                <span className="badge badge-secondary badge-pill">{num}</span>
                            </h4>

                            <table class="table table-secondary">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Sub Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((product, index) =>
                                        <tr key={index}>
                                            <td>
                                                <h4 className="text-capitalize font-weight">{product.name}</h4>
                                                <h6 className="card-text"><small>price: </small>Rp{product.price}</h6>
                                            </td>
                                            <td>
                                                <h5><span className="secondary">{product.qty}</span></h5>
                                            </td>
                                            <td>
                                                <h5>
                                                    <span className="badge">Rp. {product.total}</span>
                                                </h5>
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-danger"
                                                    onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span> Hapus</button>
                                            </td>
                                        </tr>

                                    )
                                    }
                                </tbody>
                            </table>
                            {carts.length ?
                                <div><h4>
                                    <small>Total Harga: </small>
                                    <span className="float-right badge badge-light">Rp. {total}</span>
                                </h4><hr /></div> : ''
                            }
                        </div>
                        <div className="col-md-8 order-md-1">
                            <h4 className="mb-3">Pilih Alamat Pengiriman</h4>
                            <form className="needs-validation" noValidate>


                                <div className="row">
                                    <div className="col mb-3 md-3">
                                        <label htmlFor="state">Alamat</label>
                                        <select className="form-control" name="role" value={this.state.value} onChange={this.bind} required>
                                            {this.state.alamat.map((item) => {
                                                return (
                                                    <option value="{item.id}">{item.jalan}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="invalid-feedback">
                                            Please select a valid country.
                                        </div>
                                    </div>
                                </div>
                                <hr className="mb-4" />
                                <button className="btn btn-success btn-lg btn-block" type="submit" style={{ marginTop: "110px" }}>
                                    Continue to checkout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Checkout