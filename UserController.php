<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use Auth;
class UserController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $user = [];
    foreach (User::all() as $u) {
      $item = [
        "id" => $u->id,
        "name" => $u->name,
        "username" => $u->username,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role,
        "image"=> $u->image
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $user = User::where("name","like","%$find%")->orWhere("username","like","%$find%")->get();
    $user = [];
    foreach ($user as $u) {
      $item = [
        "id" => $u->id,
        "name" => $u->name,
        "username" => $u->username,
        "password" => Crypt::decrypt($u->password),
        "role" => $u->role,
        "image"=>$u->image
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;

        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/image", $name);
          $user->image = $name;
        }
        $user->save();
        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $tujuan_upload = 'public/image';
        $file = $request->file('image');

        $user = User::where("id", $request->id)->first();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = Crypt::encrypt($request->password);
        $user->role = $request->role;
        $user->image = $file->getClientOriginalName();
        $user->save();
        return response(["message" => "Data user berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id)
  {
    try {
      User::where("id", $id)->delete();
      return response(["message" => "Data user berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function auth(Request $request)
  {
    $username = $request->username;
    $password = $request->password;

    $user = User::where("username", $username);
    if ($user->count() > 0) {
      // login sukses
      $u = $user->first();
      if(Crypt::decrypt($u->password) == $password){
        return response(["status" => true, "user" => $u,
        "role" => $u->role, "token" => Crypt::encrypt($u->id)]);
      }else{
        return response(["status" => false]);
      }
    }else{
      return response(["status" => false]);
    }
  }
  public function register(Request $request)
  {
    try {
      $user = new User();
      $user->nama = $request->nama;
      $user->username = $request->username;
      $user->password = Crypt::encrypt($request->password);
      $user->role = "user";
      $user->save();

      return response(["message" => "Register berhasil"]);
    }
    catch (\Exeption $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
  public function save_profil(Request $request)
  {
    $action = $request->action;
    if($action == "update") {
      try {
        $tujuan_upload = 'public/image';
        $file = $request->file('image');

        $user = User::where("id", $request->id)->first();
        $user->username = $request->username;
        $user->name = $request->name;
        $user->kelamin = $request->kelamin;
        $user->tgl = $request->tgl;
        $user->nohp = $request->nohp;
        $user->image = $file->getClientOriginalName();
        
        $user->save();

        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }
  public function getById($id)
  {
    try {
      $user = User::where("id", $id)->get();
      return response(["user" => $user]); 
    } catch (\Exeption $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
