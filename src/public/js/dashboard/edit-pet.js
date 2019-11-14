var tipo = $("#type-pet").val();

if(tipo == "perro"){
  $("#vacunas-register-dog").show();
  $("#vacunas-register-cat").hide();
}else{
  if(tipo == "gato"){
  $("#vacunas-register-cat").show();
  $("#vacunas-register-dog").hide();
  }
}
