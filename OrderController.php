<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Order;
use App\detail_Order;
use App\User;
use App\Alamat;
use App\Product;
use Auth;
class OrderController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $order = [];
    foreach (Order::all() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d){
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_product" => $d->id_product,
          "nama_product" => $d->product->name,
          "quantity" => $d->quantity
        ];
      array_push($detail, $itemDetail);
    }
    $item = [
      "id_order" => $o->id,
      "id_user" => $o->id_user,
      "id_alamat" => $o->id_alamat,
      "username" => $o->user->name,
      "id_alamat" => $o->id_alamat,
      "alamat" => $o->alamat->jalan,
      "total" => $o->total,
      "bukti_bayar"=>$o->bukti_bayar,
      "status"=>$o->status,
      "detail" => $detail
    ];
    array_push($order, $item);
  }
  
  return response(["order" =>$order]);
  }
  public function accept($id)
  {
    $o = Order::where("id", $id)->first();
    $o->status = "dikirim";
    $o->save();
  }
  public function decline($id)
  {
    try {
    $o = Order::where("id", $id)->first();
    $o->status = "dibatalkan";
    $o->save();
    return response(["message" => "Pesanan berhasil dibatalkan"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
  public function getById($id)
  {
    try {
      $order = Order::where("id", $id)->get();
      return response(["order" => $order]); 
    } catch (\Exeption $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
  public function save(Request $request)
  {
      try {
        $order = new Order();
        $order->id_user = $request->id_user;
        $order->id_alamat = $request->id_alamat;
        $order->total = $request->total;
        $order->status = "dipesan";
        $order->save();

        $detail = json_decode($request->product);
        $detail_order = [];
        $o = Order::where("id_user", $request->id_user)->latest()->first();
        foreach($detail as $det)
        {
          $item = [
            "id_order" => $o->id,
            "id_product" => $det->id_product,
            "quantity" => $det->qty,
          ];
          array_push($detail_order, $item);
        }
        detail_Order::insert($detail_order);
        return response(["message" => "Data Order berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
  }
  public function getOrdered($id_user)
  {
    $order = [];
    foreach (Order::where("id_user", $id_user)->where("status", "dipesan")->get() as $o) {
      $detail = [];
      foreach ($o->detail_order as $d) {
        $itemDetail = [
          "id_order" => $d->id_order,
          "id_product" => $d->id_product,
          "nama_product" => $d->product->name,
          "image" => $d->product->image,
          "quantity" => $d->quantity,
          "subtotal" => $d->subtotal
        ];
        array_push($detail, $itemDetail);
      }
      $item = [
        "id_order" => $o->id,
        "id_user" => $o->id_user,
        "nama_user" => $o->user->name,
        "id_alamat" => $o->id_alamat,
        "alamat" => $o->alamat->jalan,
        "kecamatan" => $o->alamat->kecamatan,
        "kota" => $o->alamat->kota,
        "pos" => $o->alamat->pos,
        "total" => $o->total,
        "bukti_bayar" => $o->bukti_bayar,
        "status" => $o->status,
        "tanggal" => $o->created_at,
        "detail" => $detail
      ];
       array_push($order,$item);
    }
    return response(["order" => $order]);
  }
  public function pay(Request $request)
  {
    try {
      $o = Orders::where("id", $request->id_order)->first();
      $file = $request->file('image');
      $name = $file->getClientOriginalName();
      $file->move(\base_path() ."/public/images", $name);
      $o->bukti_bayar = $name;
      $o->status = "dibayar";
      $o->save();
      return response(["message" => "Pesanan berhasil dibayar"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
