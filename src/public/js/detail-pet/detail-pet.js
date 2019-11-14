var tipo = $("#in-type-vacuna").val();

if(tipo == "perro"){
  $("#div-vacunas-perro").show();
  $("#div-vacunas-gato").hide();
}else{
  if(tipo == "gato"){
  $("#div-vacunas-gato").show();
  $("#div-vacunas-perro").hide();
  }
}
