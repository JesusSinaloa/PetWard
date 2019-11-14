var status = $("#in-status-audition").val();
if (status == "En proceso") {
  $("#div-status-audition-proccess").show();
  $("#div-status-audition-success").hide();
}else{
  if (status == "Concluida") {
    $("#div-status-audition-proccess").hide();
    $("#div-status-audition-success").hide();
  }
}
