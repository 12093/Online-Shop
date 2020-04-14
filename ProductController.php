<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Product;
use Auth;
class ProductController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "product" => Product::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $product = Product::where("name","like","%$find%")->orWhere("price","like","%$find%")
    ->orWhere("description","like","%$find%")->get();
    return response([
      "product" => $product
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {

        $product = new Product();
        $product->name = $request->name;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->description = $request->description;
        
        if($request->file('image')){
          $file = $request->file('image');
          $name = $file->getClientOriginalName();
          $file->move(\base_path() ."/public/image", $name);
          $product->image = $name;
        }
        $product->save();

        return response(["message" => "Data product berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $tujuan_upload = 'public/image';
        $file = $request->file('image');
        
        $product = Product::where("id", $request->id)->first();
        $product->name = $request->name;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->image = $file->getClientOriginalName();
        $product->save();


        return response(["message" => "Data product berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id)
  {
    try {
      Product::where("id", $id)->delete();
      return response(["message" => "Data product berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
