const controller = {};
const Pet = require('../models/Pet.js')
function eliminateDuplicates(arr) {
   var i,
       len=arr.length,
       out=[],
       obj={};
   for (i=0;i<len;i++) {
      obj[arr[i]]=0;
   }
   for (i in obj) {
      out.push(i);
   }
   return out;
}
function   group(personalidadA, ejercicioA, horasA, enfermedadA, salirA){
  var array = [];
  var i= 0;
  for (i = 0; i < personalidadA.length; i++) {
    array.push(personalidadA[i]);
  }

  for (i = 0; i < ejercicioA.length; i++) {
      array.push(ejercicioA[i]);
  }
  //console.log(array);
  for (i = 0; i < horasA.length; i++) {

      array.push(horasA[i]);

  }
  for (i = 0; i < enfermedadA.length; i++) {

      array.push(enfermedadA[i]);

  }
  for (i = 0; i < salirA.length; i++) {

      array.push(salirA[i]);

  }

return(eliminateDuplicates(array));

}

controller.findPet = async (req, res) =>{
  var tipo = req.body.tipo;
  var personalidad = req.body.personalidad;
  var ejercicio = req.body.ejercicio;
  var horas = req.body.horasT;
  var enfermedad = req.body.enfermedad;
  var salir = req.body.salir;

  if(tipo === "perro"){
    //5 ARRAYS PARA GUARDAR LAS MASCOTAS
    var personalidadA = [];
    var ejercicioA = [];
    var horasA = [];
    var enfermedadA = [];
    var salirA = [];
    var petsE = "";
    var petsH = "";
    var petsS = "";
    var petsP = "";
    var petsEn = "";
    console.log("entre a perro");
    if (ejercicio) {

      //IF TRUE PERRO CASTA GRANDE Y RANGO DE EDAD DE 0-5 años
      //ELSE PERRO CASTA CHICA O GRANDE ADULTO
      var query = {};
      var dataload = {"casta":["grande", "mediana"],"edad":["1", "2", "3", "4", "5"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsE = await Pet.find(query);
      for (var i = 0; i < petsE.length; i++) {
        ejercicioA.push(petsE[i]._id);
      }
    }else{

      var query = {};
      var dataload = {"casta":["grande", "mediana", "chica"],"edad":["6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsE = await Pet.find(query);
      for (var i = 0; i < petsE.length; i++) {
        ejercicioA.push(petsE[i]._id);
      }
    }
    if (horas) {
      if(horas >= 0 || horas <= 6){
        var query = {};
        var dataload = {"casta":["chica"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
        if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsH = await Pet.find(query);
        for (var i = 0; i < petsH.length; i++) {
          horasA.push(petsH[i]._id);
        }
      }else{
        if(horas >= 7){
          var query = {};
          var dataload = {"casta":["grande", "mediana"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
          if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
          if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
          if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
          petsH = await Pet.find(query);
          for (var i = 0; i < petsH.length; i++) {
            horasA.push(petsH[i]._id);
          }
        }
      }
      //IF 0 o 4 O 6 -> CASTA CHICA JOVEN
      //IF 8 o 10 o +10 -> CASTA GRANDE JOVEN

    }
    if (enfermedad) {
      //IF TRUE JOVEN CASTA CHICA
      //IF FALSE JOVEN CASTA GRANDE O CHICA
      var query = {};
      var dataload = {"casta":["chica"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsEn = await Pet.find(query);
      for (var i = 0; i < petsEn.length; i++) {
        enfermedadA.push(petsEn[i]._id);
      }
    }else{
      var query = {};
      var dataload = {"casta":["chica", "mediana", "grande"],"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsEn = await Pet.find(query);
      for (var i = 0; i < petsEn.length; i++) {
        enfermedadA.push(petsEn[i]._id);
      }
    }
    if (salir) {
      //IF TRUE CASTA GRANDE JOVEN
      //IF FALSE CASTA CHICA O GRANDE JOVEN O ADULTO
      var query = {};
      var dataload = {"casta":["grande", "mediana"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsS = await Pet.find(query);
      for (var i = 0; i < petsS.length; i++) {
        salirA.push(petsS[i]._id);
      }

    }else{
      var query = {};
      var dataload = {"casta":["mediana", "chica"],"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["perro"]};
      if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
      if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
      if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
      petsS = await Pet.find(query);
      for (var i = 0; i < petsS.length; i++) {
        salirA.push(petsS[i]._id);
      }
    }
    if(personalidad){
      var petsS = "";
      switch (personalidad) {
        case "amigable":
          //CUALQUIER PERRO
          break;
          case "enojon":
              //PERRO CASTA GRANDE Y JOVEN
              var query = {};
              var dataload = {"casta":["grande"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
              if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
              if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
              if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
              petsP = await Pet.find(query);
              for (var i = 0; i < petsP.length; i++) {
                personalidadA.push(petsP[i]._id);
              }

            break;
            case "tranquila":
              //PERRO CASTA CHICA
              //PERRO CASTA GRANDE Y JOVEN
              var query = {};
              var dataload = {"casta":["chica"],"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["perro"]};
              if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
              if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
              if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
              petsP = await Pet.find(query);
              for (var i = 0; i < petsP.length; i++) {
                personalidadA.push(petsP[i]._id);
              }
              break;
              case "depresivo":
                //CASTA CHICA Y MEDIANA Y JOVEN
                var query = {};
                var dataload = {"casta":["chica", "mediana"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
                if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
                if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
                if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
              petsP = await Pet.find(query);
              for (var i = 0; i < petsP.length; i++) {
                personalidadA.push(petsP[i]._id);
              }
                break;
                case "combinadas":
                  //PERRO CASTA GRANDE Y JOVEN
                  var query = {};
                  var dataload = {"casta":["grande"],"edad":["1", "2", "3", "4"],"tipo":["perro"]};
                  if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};
                  if (dataload.casta && dataload.casta.length > 0) query.casta = {$in : dataload.casta};
                  if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
                  petsP = await Pet.find(query);
                  for (var i = 0; i < petsP.length; i++) {
                    personalidadA.push(petsP[i]._id);
                  }
                  break;
        default:

      }
    }
    var idPet = group(personalidadA, ejercicioA, horasA, enfermedadA, salirA);
    var query = {};
    var dataload = {"_id":idPet};
    if (dataload._id && dataload._id.length > 0) query._id = {$in : dataload._id};
    pets = await Pet.find(query);
    res.render('match-perfecto/pets.hbs', { pets });
  }else{
    if(tipo === "gato"){
      //5 ARRAYS PARA GUARDAR LAS MASCOTAS
      var personalidadA = [];
      var ejercicioA = [];
      var horasA = [];
      var enfermedadA = [];
      var salirA = [];
      var petsE = "";
      var petsH = "";
      var petsS = "";
      var petsP = "";
      var petsEn = "";
      console.log("entre a gato");
      if (ejercicio) {

        //IF TRUE GATO RANGO DE EDAD DE 0-5 años
        //ELSE GATO ADULTO
        var query = {};
        var dataload = {"edad":["1", "2", "3", "4", "5"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsE = await Pet.find(query);
        for (var i = 0; i < petsE.length; i++) {
          ejercicioA.push(petsE[i]._id);
        }
      }else{

        var query = {};
        var dataload = {"edad":["6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsE = await Pet.find(query);
        for (var i = 0; i < petsE.length; i++) {
          ejercicioA.push(petsE[i]._id);
        }
      }
      if (horas) {
        if(horas >= 0 || horas <= 6){
          var query = {};
          var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
          if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

          if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
          petsH = await Pet.find(query);
          for (var i = 0; i < petsH.length; i++) {
            horasA.push(petsH[i]._id);
          }
        }else{
          if(horas >= 7){
            var query = {};
            var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
            if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

            if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
            petsH = await Pet.find(query);
            for (var i = 0; i < petsH.length; i++) {
              horasA.push(petsH[i]._id);
            }
          }
        }
        //IF 0 o 4 O 6 -> JOVEN
        //IF 8 o 10 o +10 -> JOVEN

      }
      if (enfermedad) {
        //IF TRUE JOVEN
        //IF FALSE JOVEN
        var query = {};
        var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsEn = await Pet.find(query);
        for (var i = 0; i < petsEn.length; i++) {
          enfermedadA.push(petsEn[i]._id);
        }
      }else{
        var query = {};
        var dataload = {"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsEn = await Pet.find(query);
        for (var i = 0; i < petsEn.length; i++) {
          enfermedadA.push(petsEn[i]._id);
        }
      }
      if (salir) {
        //IF TRUE JOVEN
        //IF FALSE JOVEN O ADULTO
        var query = {};
        var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsS = await Pet.find(query);
        for (var i = 0; i < petsS.length; i++) {
          salirA.push(petsS[i]._id);
        }

      }else{
        var query = {};
        var dataload = {"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["gato"]};
        if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

        if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
        petsS = await Pet.find(query);
        for (var i = 0; i < petsS.length; i++) {
          salirA.push(petsS[i]._id);
        }
      }
      if(personalidad){
        var petsS = "";
        switch (personalidad) {
          case "amigable":
            //CUALQUIER GATO
            break;
            case "enojon":
                //GATO JOVEN
                var query = {};
                var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
                if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

                if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
                petsP = await Pet.find(query);
                for (var i = 0; i < petsP.length; i++) {
                  personalidadA.push(petsP[i]._id);
                }

              break;
              case "tranquila":

                //GATO JOVEN O ADULTO
                var query = {};
                var dataload = {"edad":["1", "2", "3", "4", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],"tipo":["gato"]};
                if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

                if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
                petsP = await Pet.find(query);
                for (var i = 0; i < petsP.length; i++) {
                  personalidadA.push(petsP[i]._id);
                }
                break;
                case "depresivo":
                  //JOVEN
                  var query = {};
                  var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
                  if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

                  if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
                petsP = await Pet.find(query);
                for (var i = 0; i < petsP.length; i++) {
                  personalidadA.push(petsP[i]._id);
                }
                  break;
                  case "combinadas":
                    //JOVEN
                    var query = {};
                    var dataload = {"edad":["1", "2", "3", "4"],"tipo":["gato"]};
                    if (dataload.tipo && dataload.tipo.length > 0) query.tipo = {$in : dataload.tipo};

                    if (dataload.edad && dataload.edad.length > 0) query.edad = {$in : dataload.edad};
                    petsP = await Pet.find(query);
                    for (var i = 0; i < petsP.length; i++) {
                      personalidadA.push(petsP[i]._id);
                    }
                    break;
          default:

        }
      }
      var idPet = group(personalidadA, ejercicioA, horasA, enfermedadA, salirA);
      //console.log(idPet);
      var query = {};
      var dataload = {"_id":idPet};
      if (dataload._id && dataload._id.length > 0) query._id = {$in : dataload._id};
      pets = await Pet.find(query);
      res.render('match-perfecto/pets.hbs', { pets });
      //console.log(pets);
    }

  }

  //console.log(tipo + personalidad + ejercicio + horas + enfermedad + salir);

}

module.exports = controller;
