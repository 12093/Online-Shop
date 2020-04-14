<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class detail_Order extends Model
{
    protected $table = "detail_order";
    protected $fillable = ["id_order","id_product","quantity","subtotal"];

    public function order()
    {
        return $this->belongsTo("App\Order","id", "id_order");
    }
    public function product()
    {
        return $this->belongsTo("App\Product","id_product", "id");
    }
}
