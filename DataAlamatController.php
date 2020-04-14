<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\DataAlamat;
use App\User;
use Auth;
class DataAlamatController extends Controller
{

  function __construct()
  {

  }

  public function get($id_user)
  {
    return response([
      "alamat" => DataAlamat::where("id_user",$id_user)->get()
    ]);
  }
  public function getByUser($id_user)
  {
    $alamat = DataAlamat::where("id_user", $id_user)->get();
    return response([
      "alamat" => $alamat
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $dataAlamat = new DataAlamat();
        $dataAlamat->id_user = $request->id_user;
        $dataAlamat->nama_penerima = $request->nama_penerima;
        $dataAlamat->jalan = $request->jalan;
        $dataAlamat->rt = $request->rt;
        $dataAlamat->rw = $request->rw;
        $dataAlamat->kecamatan = $request->kecamatan;
        $dataAlamat->pos = $request->pos;
        $dataAlamat->kota = $request->kota;
        $dataAlamat->save();
        return response(["message" => "Data Alamat berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {

        $dataAlamat = DataAlamat::where("id_alamat", $request->id_alamat)->first();
        $dataAlamat->id_user = $request->id_user;
        $dataAlamat->nama_penerima = $request->nama_penerima;
        $dataAlamat->jalan = $request->jalan;
        $dataAlamat->rt = $request->rt;
        $dataAlamat->rw = $request->rw;
        $dataAlamat->kecamatan = $request->kecamatan;
        $dataAlamat->pos = $request->pos;
        $dataAlamat->kota = $request->kota;
        $dataAlamat->save();
        return response(["message" => "Data Alamat berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_alamat)
  {
    try {
      DataAlamat::where("id_alamat", $id_alamat)->delete();
      return response(["message" => "Data Alamat berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
