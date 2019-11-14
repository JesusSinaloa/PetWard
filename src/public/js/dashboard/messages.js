var user = $("#user-id-mesage").val();
var pertenece = $("#pertenece-pet-message").val();
var reunion_message = $("#in-recoger-message").val();
var pet_adopted = $("#in-pet-wasAdopted").val();

  $("#span-reunion").hide();
  $("#a-recoger-message").hide();
  $("#span-adopted").hide();

if(user == pertenece){
  $("#a-adopt-message").hide();
  if(reunion_message){
    $("#span-reunion").show();
    $("#a-recoger-message").hide();
  }
}else{
  if(reunion_message){
    $("#span-reunion").hide();
    $("#a-recoger-message").show();
  }
}
if(pet_adopted){
  $("#span-adopted").show();
}
