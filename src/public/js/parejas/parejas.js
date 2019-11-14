

$(document).ready(function(){
    $('html, body').animate({
      scrollTop: $("#resultado").offset().top
    }, 1000)
    /*ICON GLOBE*/
    $(".icon-globe").mouseover(function(){
      $(this).removeClass("far fa-comment");
      $(this).addClass("fas fa-comment");
    })
    $(".icon-globe").mouseout(function(){
      $(this).removeClass("fas fa-comment");
      $(this).addClass("far fa-comment");
    })
    /*ICON HEART*/
    $(".icon-heart").mouseover(function(){
      $(this).removeClass("far fa-heart");
      $(this).addClass("fas fa-heart");
    })
    $(".icon-heart").mouseout(function(){
      $(this).removeClass("fas fa-heart");
      $(this).addClass("far fa-heart");
    })
    /*EVENT DETAIL*/
    $( ".detail-couple" ).click(function() {
      $("#resultado").hide();
      $("#loader").show();

    });
    /*EVENT RETURN*/
    $( "#return-couple" ).click(function() {
      $("#resultado").hide();
      $("#loader").show();
    });

    $('.modal').modal();
    
});
