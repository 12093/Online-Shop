import React,{Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      order: [],
      id_order: "",
      id_alamat: "",
      id_user: "",
      total: "",
      bukti_bayar: "",
      jalan:"",
      kota:"",
      kecamatan:"",
      kode_pos:"",
      alamat:"",
      status: "",
      image: null,
      action: "",
      find: "",
      message: ""
    }
  }

    bind = (event) => {
      this.setState({[event.target.name] : event.target.value});
    }

    bindImage = (event) => {
      this.setState({image: event.target.files[0]})
    }

getOrder = async() => {
    // $("#loading").toast("show");
    const id = localStorage.getItem('id_user')
    const url = "http://localhost/online.shop/public/order/"+ id;
    axios.get(url)
    .then(response => {
      this.setState({order: response.data.order});
      // $("#loading").toast("hide");
    })
    .catch(error => {
      console.log(error);
    });
  }

    componentDidMount = () => {
      this.getOrder();
    }

    Save = (e) => {
    if(window.confirm("Apakah bukti bayar yang anda upload telah benar?")){
    
    e.preventDefault()
    $("#modal_payment").modal("hide")
    let url = "http://localhost/online.shop/public/order/pay"
    let form = new FormData()
    form.append("id_order", this.state.id_order)
    form.append("image", this.state.image)

    axios.post(url, form)
         .then(res => {
            alert("Pembayaran Berhasil")
            this.setState({message: res.data.message})
            this.getOrder()
          })
          .catch(error => {
                console.log(error);
          })
    }
  }

  Cancel = (id) => {
    if(window.confirm("Apakah anda yakin membatalkan order ini?")){
        let url = "http://localhost/online.shop/public/order/decline/" + id
        axios.post(url)
        .then(res => {
          alert("Pesanan anda telah dibatalkan")
          this.setState({message: res.data.message})
          this.getOrder()
        })
        .catch(error => {
            console.log(error)
        })
    }
}

    Pay = (id) => {
      
      $("#modal_payment").modal("show")
      this.setState({id_order: id})
    }

    search = (event) => {
      if(event.keyCode === 13) {
        $("#loading").toast("show");
        let url = "http://localhost/online.shop/public/profiles";
        let form = new FormData();
        form.append("find", this.state.find);
        axios.post(url, form)
        .then(response => {
          $("#loading").toast("hide");
          this.setState({profiles: response.data.profiles});
        })
        .catch(error => {
          console.log(error);
        });
      }
    }

    render(){
      const { order } =  this.state;
      return(
        <div className="container">
          <div>
          <div style={{ paddingTop: "1%" }}>
            <div className="#" style={{}}>
                            
                <div className="">
                { !order.length ? 
                  <h5 className="text-center text-info"><br/>Belum ada transaksi yang perlu diselesaikan!<br/></h5>
                :
                <div className=""> 
                    { this.state.order.map((item) => {
                    return(
                      <div className="card shadow" style={{marginTop: "2%", marginBottom: "4%"}} key={item.id_order}>
                        <div>
                        <h4 className="card-header text-center text-info">PAYMENT</h4>
                        </div>
                      <div className="card-body card-1">
                  <p className="text-light text-center">Terima kasih atas pesanan anda, silahkan melakukan pembayaran </p>
                  <p className="text-light text-center">Jika dalam 24 jam anda belum mengupload bukti pembayaran, maka kami anggap order pembelian anda dibatalkan</p>
                      <div className="row">
                        <div className="card col-md-6" style={{marginLeft: "2%"}}>
                      <table className="table ">
                        <tbody>
                      <tr className="list-group list-group-flush">
                        <td className="list-group-item text-center card-header">Total Bayar: Rp. {item.total}</td>
                        <td className="list-group-item">Alamat:<br/>{item.alamat}<br/>{item.jalan},{item.kecamatan},{item.kota}<br/>Kode Pos : {item.pos}</td>
                        <td className="list-group-item">
                        <ul className="" >
                          Detail Pemesanan
                        {item.detail.map((it) => {
                            return(
                              
                              <li className="" key={it.id_product}>{it.nama_product} <span className="badge badge-light badge-pill">{it.quantity}</span></li>
                              
                            )
                        })}
                        </ul>
                        </td>
                      </tr>
                      </tbody>
                      </table>
                      </div>
                      <div className="card col-md-5" style={{marginLeft: "2%"}}>
                          <div className="card-body">
                            <p className="text-center"> Cara Pembayaran</p>
                            <p className="card-text">
                              Silahkan transfer sejumlah: Rp. {item.total}, ke rekening di bawah ini.<br/>
                              Nama Bank: Bank Bank Tooth<br/>
                              Nama Rekening: Naga Sakti<br/>
                              Nomor Rekening: 098211831211
                            </p>
                            <button type='button' className="btn btn-outline-success btn-block" onClick={() => this.Pay(item.id_order)}>Bayar</button>
                            <button type='button' className="btn btn-outline-danger btn-block" onClick={() => this.Cancel(item.id_order)}>Batal</button>
                        </div>
                      </div>
                      </div>

                      </div>
                      </div>
                      );
                    })}
                     </div>
             }
               
              </div>
            </div>
          </div>
          </div>

          <Modal id="modal_payment" title="Upload Bukti Pembayaran" bg_header="info" text_header="white">
        <form onSubmit={this.Save}>
          Bukti Bayar <br/>
          <input type="file" className="form-control" name="image" onChange={this.bindImage} />
          <button type="submit" className="btn btn-info pull-right m-2">
            <span className="fa fa-check"></span> Konfirmasi
          </button>
        </form>
        </Modal>

        </div>
        
      );

    }
}
export default Payment;