import React, { Component } from "react";
import axios from 'axios';
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Profil extends Component {
    constructor() {
        super();
        this.state = {
            user: [],
            id: "",
            username: "",
            password: "",
            name: "",
            role: "user",
            image: null,
            kelamin: "",
            tgl: "",
            nohp: "",
            alamat: [],
            id_alamat: "",
            nama_penerima: "",
            jalan: "",
            rt: "",
            rw: "",
            kecamatan: "",
            pos: "",
            kota: "",
            action: "",
            find: "",
            message: ""
        }
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    bindImage = (e) => {
        this.setState({ image: e.target.files[0] })
    }
    Edit = item => {
        // shows modal
        $("#modal_user").modal("show");
        // fills in form data
        this.setState({
            action: "update",
            id: item.id,
            name: item.name,
            username: item.username,
            password: item.password,
            kelamin: item.kelamin,
            nohp: item.nohp,
            tgl: item.tgl,
            image: item.image
        });
    }
    get_user = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id'))
        // console.log(items)
        let url = "http://localhost/online.shop/public/user/" + id;
        axios.get(url)
            .then(response => {
                this.setState({ user: response.data.user, });
                // $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    };
    get_alamat = () => {
        // $("#loading").toast("show");
        let id = JSON.parse(localStorage.getItem('id'))
        // console.log(items)
        let url = "http://localhost/online.shop/public/address/" + id;
        axios.get(url)
            .then(response => {
                this.setState({ alamat: response.data.alamat, });
                // $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Add = () => {
        $("#modal_alamat").modal("show");
        this.setState({
            action: "insert",
            id_alamat: "",
            id_user: "",
            nama_penerima: "",
            jalan: "",
            rt: "",
            rw: "",
            kecamatan: "",
            pos: "",
            kota: ""
        });
    }
    Edit_alamat = (item) => {
        // membuka modal
        $("#modal_alamat").modal("show");
        // mengisi data pd form
        this.setState({
            action: "update",
            id_alamat: item.id_alamat,
            id_user: item.id_user,
            nama_penerima: item.nama_penerima,
            jalan: item.jalan,
            rt: item.rt,
            rw: item.rw,
            kecamatan: item.kecamatan,
            pos: item.pos,
            kota: item.kota
        });
    }
    componentDidMount = () => {
        this.get_user();
        this.get_alamat();
    }

    Save_alamat = (event) => {
        let id = JSON.parse(localStorage.getItem('id'))
        event.preventDefault();
        // shows loading process
        // $("#loading").toast("show");
        // closes modal form
        $("#modal_alamat").modal("hide");
        let url = "http://localhost/online.shop/public/address/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_alamat", this.state.id_alamat);
        form.append("id_user", id);
        form.append("nama_penerima", this.state.nama_penerima);
        form.append("jalan", this.state.jalan);
        form.append("rt", this.state.rt);
        form.append("rw", this.state.rw);
        form.append("kecamatan", this.state.kecamatan);
        form.append("pos", this.state.pos);
        form.append("kota", this.state.kota);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                // $("#message").toast("show");
                this.get_alamat();
            })
            .catch(error => {
                console.log(error);
            });
    };
    Drop_alamat = (id_alamat) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/online.shop/public/address/drop/" + id_alamat;
            axios.delete(url)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ message: response.data.message });
                    $("#message").toast("show");
                    this.get_alamat();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    Save = (event) => {
        console.log(this.state.id)
        event.preventDefault();
        // shows loading process
        // $("#loading").toast("show");
        // closes modal form
        $("#modal_user").modal("hide");
        let url = "http://localhost/online.shop/public/user/save_profil";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("name", this.state.name);
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        form.append("kelamin", this.state.kelamin);
        form.append("tgl", this.state.tgl);
        form.append("nohp", this.state.nohp);
        form.append("image", this.state.image, this.state.image.name);
        axios.post(url, form)
            .then(response => {
                // $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_user();
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        const { user, alamat } = this.state;
        console.log(user)
        return (
            <div className="container">
                <div className="card mt-2">
                    <div style={{ paddingTop: "5%", paddingLeft: "7%" }}>
                        <div className="#" style={{ maxwidth: "200px" }}>
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    {user.map((item, index) => {
                                        return (
                                            <ul class="list-group" key={index}>
                                                <img className="rounded float-left" src={'http://localhost/online.shop/public/image/' + item.image} style={{ height: "200px", width: "200px" }} />
                                            </ul>
                                        )
                                    })}

                                </div>
                                <div style={{ paddingLeft: "0%" }}>
                                    <div className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                                        <table className="table table-borderless" style={{ width: "500px" }}>
                                            {user.map((item, index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <li class="list-group-item">Username : {item.username}</li>
                                                        <li class="list-group-item">Nama Lengkap : {item.name}</li>
                                                        <li class="list-group-item">Jenis Kelamin : {item.kelamin}</li>
                                                        <li class="list-group-item">Tanggal Lahir : {item.tgl}</li>
                                                        <li class="list-group-item">No Hp : {item.nohp}</li>
                                                        <button className="m-1 btn btn-info btn float-right" onClick={() => this.Edit(item)}>
                                                            <span className="fa fa-edit">  Edit</span>
                                                        </button>
                                                    </ul>
                                                );
                                            })}
                                            {alamat.map((item, index) => {
                                                return (
                                                    <ul class="list-group" key={index}>
                                                        <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                                                        <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                                                        <li className="list-group-item">Jalan : {item.jalan}</li>
                                                        <li className="list-group-item">RT : {item.rt} RW : {item.rw}</li>
                                                        <li className="list-group-item">kecamatan : {item.kecamatan}</li>
                                                        <li className="list-group-item">Kode POS : {item.pos}</li>
                                                        <li className="list-group-item">Kota : {item.kota}</li>

                                                        <button className="m-1 btn btn float-right btn-info" onClick={() => this.Edit_alamat(item)}>
                                                            <span className="fa fa-edit">  Edit</span>
                                                        </button>
                                                        <button className="m-1 btn btn float-right btn-danger" onClick={() => this.Drop_alamat(item.id_alamat)}>
                                                            <span className="fa fa-trash">  Hapus</span>
                                                        </button>
                                                        
                                                    </ul>
                                                );
                                            })}
                                            <button className="m-1 btn btn float-right btn-success" style={{ width: "500px" }} onClick={this.Add}>
                                                <span className="fa fa-plus" >  Tambah Data</span>
                                            </button>
                                        </table>
                                    </div>
                                </div>
                                <Modal id="modal_user" title="Form User" bg_header="success"
                                    text_header="white">
                                    <form onSubmit={this.Save}>
                                        Username
                                            <input type="text" className="form-control" name="username"
                                            value={this.state.username} onChange={this.bind} required />
                                        Nama Lengkap
                                            <input type="text" className="form-control" name="name"
                                            value={this.state.name} onChange={this.bind} required />

                                        <div className="form-group">
                                            <label for="kelamin">Jenis Kelamin</label>
                                            <select class="form-control" name="kelamin" value={this.state.value} onChange={this.bind} required>
                                                <option value=" "> </option>
                                                <option value="Pria">Pria</option>
                                                <option value="Wanita">Wanita</option>
                                            </select>
                                        </div>
                                        Tanggal Lahir
                                            <input type="date" className="form-control" name="tgl"
                                            value={this.state.tgl} onChange={this.bind} required />
                                        No HP
                                            <input type="text" className="form-control" name="nohp"
                                            value={this.state.nohp} onChange={this.bind} required />
                                        Image
                                             <input type="file" className="form-control" name="image"
                                            onChange={this.bindImage}
                                        />
                                        <button type="submit" className="btn btn-success pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                            </button>
                                    </form>
                                </Modal>
                                <Modal id="modal_alamat" title="Form Alamat" bg_header="success"
                                    text_header="white">
                                    <form onSubmit={this.Save_alamat}>
                                        Nama_Penerima
                                            <input type="text" className="form-control" name="nama_penerima"
                                            value={this.state.nama_penerima} onChange={this.bind} required />
                                        Jalan
                                            <input type="text" className="form-control" name="jalan"
                                            value={this.state.jalan} onChange={this.bind} required />
                                        RT
                                            <input type="text" className="form-control" name="rt"
                                            value={this.state.rt} onChange={this.bind} required />
                                        RW
                                            <input type="text" className="form-control" name="rw"
                                            value={this.state.rw} onChange={this.bind} required />
                                        Kecamatan
                                            <input type="text" className="form-control" name="kecamatan"
                                            value={this.state.kecamatan} onChange={this.bind} required />
                                        Kode POS
                                            <input type="text" className="form-control" name="pos"
                                            value={this.state.pos} onChange={this.bind} required />
                                        Kota
                                            <input type="text" className="form-control" name="kota"
                                            value={this.state.kota} onChange={this.bind} required />
                                        <button type="submit" className="btn btn-success pull-right m-2">
                                            <span className="fa fa-check"></span> Simpan
                                            </button>
                                    </form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="container">
                <div className="card mt-2">
                    <div style={{ paddingLeft: "0%" }}>
                        <div className="card-body">
                            <h4 className="card-title" style={{ fontWeight: "700" }}>Profile</h4>
                            <table className="table table-borderless" style={{ width: "500px" }}>
                                {alamat.map((item, index) => {
                                    return (
                                        <ul class="list-group" key={index}>
                                            <h4 className="card-title" style={{ fontWeight: "700" }}>Data Alamat </h4>
                                            <li className="list-group-item">Nama Penerima : {item.nama_penerima}</li>
                                            <li className="list-group-item">Jalan : {item.jalan}</li>
                                            <li className="list-group-item">RT : {item.rt} RW : {item.rw}</li>
                                            <li className="list-group-item">kecamatan : {item.kecamatan}</li>
                                            <li className="list-group-item">Kode POS : {item.pos}</li>
                                            <li className="list-group-item">Kota : {item.kota}</li>
                                            <button className="m-1 btn btn float-right btn-success" onClick={() => this.Edit_alamat(item)}>
                                                <span className="fa fa-edit">Edit</span>
                                            </button>
                                            <button className="m-1 btn btn float-right btn-danger" onClick={() => this.Drop_alamat(item.id_alamat)}>
                                                <span className="fa fa-trash">Hapus</span>
                                            </button>
                                        </ul>
                                    );
                                })}
                                <button className="btn btn-success my-2" onClick={this.Add}>
                                    <span className="fa fa-plus"></span> Tambah Data
                                            </button>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profil;