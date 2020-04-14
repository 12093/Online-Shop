<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "product";
    protected $primaryKey = "id";
    protected $fillable = ["id","name","stock","price","description","image"];
}
