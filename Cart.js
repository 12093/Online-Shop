import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import $ from "jquery";

export default class Cart extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            carts: [],
            num: 0,
            total: 0,
        }
        if (!localStorage.getItem("Token")) {
            //direct ke hlaman login
            window.location = "/login";
        }
    }
    // bind = (e) => {
    //     this.setState({ [e.target.name]: e.target.value })
    // }

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
    Edit = (item) => {
        // membuka modal
        $("#modal_product").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id: item.id,
            name: item.name,
            stock: item.stock,
            price: item.price,
            description: item.description,
            image: item.image
        });
    }
    componentDidMount() {
        this.getCarts()
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_product").modal("hide");
        let url = "http://localhost/online.shop/public/product/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("price", this.state.price);
        axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_product();
            })
            .catch(error => {
                console.log(error);
            });
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

    render() {
        const { carts, num, total } = this.state;
        return (
            <div className=" container">
                <hr />
                <h3 className="card-title">Cart <span className="float-right fa fa-cart-plus badge badge-secondary"> {num}</span></h3>
                <hr />
                {!carts.length ? <h3 className="text-warning">No item on the cart</h3> :
                    <div className="card" style={{ marginBottom: "10px" }}>
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Sub Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carts.map((product, index, item) =>
                                    <tr key={index}>
                                        <td>
                                            <h4 className="text-capitalize font-weight-bold">{product.name}</h4>
                                            <h6 className="card-text"><small>price: </small>Rp{product.price}</h6>
                                        </td>
                                        <td>
                                            <h5><span className="badge badge-secondary">{product.qty}</span></h5>
                                        </td>
                                        {/* <td> */}
                                        {/* <input type="number" value={this.state.quantity} name="quantity"
                                                onChange={this.bind}
                                                style={{ width: "60px", marginRight: "10px", borderRadius: "3px" }} /> */}
                                        {/* <h5><span className="badge badge-secondary">{product.qty}</span></h5> */}
                                        {/* </td> */}

                                        <td>
                                            <h5>
                                                <span className="badge badge-secondary">Rp. {product.total}</span>
                                            </h5>
                                        </td>
                                        <td>
                                            <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                <span className="fa fa-edit"></span>Edit
                                            </button>
                                            <button className="btn btn-sm btn-warning"
                                                onClick={() => this.removeFromCart(product)}><span className="fa fa-trash"></span></button>
                                        </td>
                                    </tr>
                                )
                                }
                            </tbody>
                        </table>
                    </div>
                }
                <hr />

                {carts.length ?
                    <div><h3>
                        <small>Total Amount: </small>
                        <span className="float-right badge badge-secondary">Rp. {total}</span>
                    </h3><hr /></div> : ''
                }

                <Link to="/checkout">
                    <button className="btn btn-success float-right"><span className="fa fa-check-circle"></span> Checkout</button></Link>
                <button className="btn btn-danger float-right" onClick={this.clearCart}
                    style={{ marginRight: "10px" }}><span className="fa fa-trash"></span> Clear Cart</button><br /><br /><br />

            </div>
        );
    }
}