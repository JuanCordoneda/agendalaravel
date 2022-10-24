<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
Use App\Models\Person;
Use Log;

class PersonController extends Controller
{

    public function getAll(){ //trae todos los contactos

      $data = Person::get(); //consulta sql
      return response()->json($data, 200);
    }


    public function create(Request $request){ //crea contactos

      $this->validate($request, [   //validaciones de campos
        'name' => 'required',
        'surname'=> 'nullable',
        'company'=> 'nullable',
        'email'=> 'nullable',
        'phone'=> 'nullable|integer',
        'phone_personalized'=> 'nullable|integer',
        'phone_house'=> 'nullable|integer',
      ]);

      Person::create($request->all()); //insert sql

      return response()->json([
          'message' => "Successfully created",
          'success' => true
      ], 200);
    }

    public function delete($id){ //método de eliminar 1 contacto
      $res = Person::find($id)->delete(); //delete sql a través de $id

      return response()->json([
          'message' => "Successfully deleted",
          'success' => true
      ], 200);
    }

    public function get($id){ //trae 1 contacto
      $data = Person::find($id); //consulta sql
      return response()->json($data, 200);
    }

    public function update(Request $request,$id){ //modifica un contacto 
      $this->validate($request, [   //validaciones de campos
        'name' => 'required',
        'surname'=> 'nullable',
        'company'=> 'nullable',
        'email'=> 'nullable',
        'phone'=> 'nullable|integer',
        'phone_personalized'=> 'nullable|integer',
        'phone_house'=> 'nullable|integer',
      ]);
      Person::find($id)->update($request->all()); //consulta 1 contacto y luego lo modifica

      return response()->json([
          'message' => "Successfully updated",
          'success' => true
      ], 200);
    }
}
