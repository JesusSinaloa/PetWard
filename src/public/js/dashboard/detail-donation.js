$( "#btn-acreditado" ).click(function() {
  $("#div-donation-1").show();
  $("#div-donation-2").hide();
  $("#div-donation-3").hide();
  $("#div-donation-4").hide();
});
$( "#btn-recibido" ).click(function() {
  $("#div-donation-1").hide();
  $("#div-donation-2").show();
  $("#div-donation-3").hide();
  $("#div-donation-4").hide();
});
$( "#btn-redireccionado" ).click(function() {
  $("#div-donation-1").hide();
  $("#div-donation-2").hide();
  $("#div-donation-3").show();
  $("#div-donation-4").hide();
});
$( "#btn-entregado" ).click(function() {
  $("#div-donation-1").hide();
  $("#div-donation-2").hide();
  $("#div-donation-3").hide();
  $("#div-donation-4").show();
});
