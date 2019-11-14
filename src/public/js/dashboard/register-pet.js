$(document).ready(function(){
  $('#img-upload').click(function(){
  	$('#in-image').click()
  })
$("#select-type-pet").change(function(){
  var typePet = $('#select-type-pet option:selected').text();

  if(typePet == "Perro"){
  console.log("estoy en perro");
      $("#vacunas-register-cat").hide();
      $("#vacunas-register-dog").show();
  }else{
    if(typePet == "Gato"){
  console.log("estoy en gato");
        $("#vacunas-register-dog").hide();
        $("#vacunas-register-cat").show();
        $("#select-casta").hide();
    }
  }
});

$('.modal').modal();
});
