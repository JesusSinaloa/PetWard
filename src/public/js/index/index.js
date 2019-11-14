$(document).ready(function(){
  //INITIALIZATE SLIDER
  $('.slider').slider();
  $('.modal').modal();
  $('#action-others-pets-hide').hide();
  //EVENT FOR SHOW INPUT SEARCH IN NAVBAR
  $('#btn-show-input-search').click(function(){

  });

  $('#action-others-pets-show').click(function(){
    $('.ul-other-pets-navigations').show();
      $('#action-others-pets-show').hide();
      $('#action-others-pets-hide').show();
  });
  $('#action-others-pets-hide').click(function(){
    $('.ul-other-pets-navigations').hide();
      $('#action-others-pets-show').show();
      $('#action-others-pets-hide').hide();
  });

  /*HOVER CARD INDEX*/
  $('.card').hover(
       function() {
           $(this).find('> .card-image > img.activator').click();
       }, function() {
           $(this).find('> .card-reveal > .card-title').click();
       }
   );

});
