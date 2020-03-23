import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Siswa extends Component {
    constructor() {
        super();
        this.state = {
            siswa: [],
            id_siswa: "",
            nama_siswa: "",
            poin: "0",
            kelas: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        if(!localStorage.getItem("Token")){
            //direct ke hlaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
    // fungsi utk membuka form tambah data
    this.setState({ [event.target.name]: event.target.value });
    }
    Add = () => {
    // fungsi utk membuka form edit data
    // membuka modal
    $("#modal_siswa").modal("show");
    // mengosongkan data pada form
    this.setState({
        action: "insert",
        id_siswa: "",
        nis: "",
        nama_siswa: "",
        kelas: "",
        poin: 0
    });
    }
    Edit = (item) => {
        // membuka modal
        $("#modal_siswa").modal("show");
        // mengisikan data pd form
        this.setState({
            action: "update",
            id_siswa: item.id_siswa,
            nis: item.nis,
            nama_siswa: item.nama_siswa,
            kelas: item.kelas,
            poin: item.poin
        });
    }
    get_siswa = () => {
        $("#loading").toast("show");
        let url = "http://localhost/pelanggaran_sekolah/public/siswa";
        axios.get(url)
        .then(response => {
            this.setState({siswa: response.data.siswa});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/pelanggaran_sekolah/public/siswa/drop/" + id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ message: response.data.message });
                $("#message").toast("show");
                this.get_siswa();
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    componentDidMount = () => {
        this.get_siswa();
    }
    Save = (event) => {
        event.preventDefault();
        // menampilkan proses loading
        $("#loading").toast("show");
        // menutup form modal
        $("#modal_siswa").modal("hide");
        let url = "http://localhost/pelanggaran_sekolah/public/siswa/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id_siswa", this.state.id_siswa);
        form.append("nis", this.state.nis);
        form.append("nama_siswa", this.state.nama_siswa);
        form.append("kelas", this.state.kelas);
        form.append("poin", this.state.poin);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({ message: response.data.message });
            $("#message").toast("show");
            this.get_siswa();
        })
        .catch(error => {
        console.log(error);
        });
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/pelanggaran_sekolah/public/siswa";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ siswa: response.data.siswa });
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Siswa</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>NIS</th>
                                    <th>Nama</th>
                                    <th>Kelas</th>
                                    <th>Poin</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.siswa.map((item) => {
                                    return(
                                        <tr key={item.id_siswa}>
                                            <td>{item.nis}</td>
                                            <td>{item.nama_siswa}</td>
                                            <td>{item.kelas}</td>
                                            <td>{item.poin}</td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                onClick={() => this.Drop(item.id_siswa)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>
                        {/* form modal siswa*/}
                        <Modal id="modal_siswa" title="Form Siswa" bg_header="success" text_header="white">
                            <form onSubmit={this.Save}>
                                NIS
                                <input type="text" className="form-control" name="nis" value={this.state.nis}
                                onChange={this.bind} required />
                                Nama
                                <input type="text" className="form-control" name="nama_siswa"
                                value={this.state.nama_siswa} onChange={this.bind} required />
                                Kelas
                                <input type="text" className="form-control" name="kelas"
                                value={this.state.kelas} onChange={this.bind} required />
                                Poin
                                <input type="number" className="form-control" name="poin" value={this.state.poin}
                                onChange={this.bind} required />
                                <button type="submit" className="btn btn-info pull-right m-2">
                                    <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
    
}
export default Siswa;