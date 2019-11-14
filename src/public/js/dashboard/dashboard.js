$(document).ready(function(){
  $('.tabs').tabs();
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();

  $( "#btn-perfil" ).click(function() {
    $("#resultado").hide();
    $("#loader").show();
  });

  $( "#btn-messages" ).click(function() {
    $("#resultado").hide();
    $("#loader").show();

  });

  $( "#btn-registro" ).click(function() {

    $("#resultado").hide();
    $("#loader").show();

  });

});
