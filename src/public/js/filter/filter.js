$(document).ready(function () {
$('#btn-consultar-filtro').on('click', function() {
  $("#form_filter").submit();
});
function datos_filtro() {

    var edad = obtener_dato('edad');//MANDA LLAMAR EL METODO OBTENER_DATO APRA OBTENER EL DATO DE LOS CHECKBOX
    var color = obtener_dato('color');
    var raza = obtener_dato('raza');

    var edadS = edad.join(",");
    var colorS = color.join(",");
    var razaS = raza.join(",");

    $("#in-edad").val(edadS);
    $("#in-raza").val(razaS);
    $("#in-color").val(colorS);

    var tipo = $("#in-tipo-pet-filter").val();
    console.log(tipo);
    if(tipo.trim() === "perro"){
    $.ajax({//se envia la solicitud
        url: "http://localhost:3000/pets-filter/filters-perro",
        type: "POST",
        data: {
            inEdad: edadS,
            inRaza: razaS,
            inColor: colorS
        },
        beforeSend: function () {

        },
        success: function (data)
        {

          var $card_row  = $("#card-row");
          var $card_container = $('<div></div>');
          if(data.length === 0){
            var $div_empty = $('<div class="div-not-pets-filter-found"></div>')
            var $h3_empty = $('<h3>No se encontraron resultados</h3>')
            $div_empty.append($h3_empty);
            $card_container.append($div_empty);
            $("#div-pagination").hide();
          }else{
            for(var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  //console.log(obj.nombre);

                  var $card_col = $('<div class="col l4 s12 m6"></div>')
                  var $tarjeta_index = $('<div class="tarjeta-index-pet card"></div>')

                  var $card_image = $('<div class="card-image waves-effect waves-block waves-light"></div>')
                  var $image = $('<img class="activator card-image" src="/images/pets/'+obj.imagen0+'">')

                  var $card_nombre = $('<div class="contenido-tarjeta card-content"></div>')
                  var $div_title = $('<div class="titulo titulo-filter overflow"></div>')
                  var $span_title = $('<span></span>').html(obj.nombre)

                  var $card_revel = $('<div class="div-button center"></div>')
                  var $span_revel = $('<span class="card-title revel-name-index"></span>').html(obj.nombre)
                  var $label1_revel = $('<label class="raza-revel-index"></label>').html(obj.raza)
                  var $br_revel = $('<br>')
                  if(obj.sexo){
                        var $i_sexo_revel = $('<i class="fas fa-mars genero-revel-index-macho"></i>')
                        var $br_revel_sexo = $('<br>')
                  }else{
                    var $i_sexo_revel = $('<i class="fas fa-venus genero-revel-index-hembra"></i>')
                    var $br_revel_sexo = $('<br>')
                  }
                  var $label2_revel = $('<label for="" class="ubicacion-revel-index">Chihuahua, Mex</label>')
                  var $action_revel = $('<a href="/detail-pet/'+obj._id+'"  name="button" class="btn button-revel-filter">Conocerlo</a>')


                  $card_image.append($image);
                  $card_nombre.append($div_title);
                  $div_title.append($span_title);
                  //$span_revel, $label1_revel, $br_revel, $i_sexo_revel, $br_revel_sexo, $label2_revel,
                  $card_revel.append($action_revel);

                  $tarjeta_index.append([$card_image, $card_nombre, $card_revel]);
                  $card_col.append($tarjeta_index);
                  $card_container.append($card_col);
              }
              $("#div-pagination").show();
            //console.log(data);
          }
          $card_row.html($card_container);
        }
    });
  }else{
    if(tipo.trim() === "gato"){
      $.ajax({//se envia la solicitud
          url: "http://localhost:3000/pets-filter/filters-gato",
          type: "POST",
          data: {
              inEdad: edadS,
              inRaza: razaS,
              inColor: colorS
          },
          beforeSend: function () {

          },
          success: function (data)
          {

            var $card_row  = $("#card-row");
            var $card_container = $('<div></div>');
            if(data.length === 0){
              var $div_empty = $('<div class="div-not-pets-filter-found"></div>')
              var $h3_empty = $('<h3>No se encontraron resultados</h3>')
              $div_empty.append($h3_empty);
              $card_container.append($div_empty);
              $("#div-pagination").hide();
            }else{
            for(var i = 0; i < data.length; i++) {
                  var obj = data[i];
                  //console.log(obj.nombre);

                  var $card_col = $('<div class="col l4 s12 m6"></div>')
                  var $tarjeta_index = $('<div class="tarjeta-index-pet card"></div>')

                  var $card_image = $('<div class="card-image waves-effect waves-block waves-light"></div>')
                  var $image = $('<img class="activator card-image" src="/images/pets/'+obj.imagen0+'">')

                  var $card_nombre = $('<div class="contenido-tarjeta card-content"></div>')
                  var $div_title = $('<div class="titulo titulo-filter overflow"></div>')
                  var $span_title = $('<span></span>').html(obj.nombre)

                  var $card_revel = $('<div class="div-button center"></div>')
                  var $span_revel = $('<span class="card-title revel-name-index"></span>').html(obj.nombre)
                  var $label1_revel = $('<label class="raza-revel-index"></label>').html(obj.raza)
                  var $br_revel = $('<br>')
                  if(obj.sexo){
                        var $i_sexo_revel = $('<i class="fas fa-mars genero-revel-index-macho"></i>')
                        var $br_revel_sexo = $('<br>')
                  }else{

                    var $i_sexo_revel = $('<i class="fas fa-venus genero-revel-index-hembra"></i>')
                    var $br_revel_sexo = $('<br>')

                  }
                  var $label2_revel = $('<label for="" class="ubicacion-revel-index">Chihuahua, Mex</label>')
                  var $action_revel = $('<a href="/detail-pet/'+obj._id+'"  name="button" class="btn button-revel-filter">Conocerlo</a>')


                  $card_image.append($image);
                  $card_nombre.append($div_title);
                  $div_title.append($span_title);
                  //$span_revel, $label1_revel, $br_revel, $i_sexo_revel, $br_revel_sexo, $label2_revel,
                  $card_revel.append($action_revel);

                  $tarjeta_index.append([$card_image, $card_nombre, $card_revel]);
                  $card_col.append($tarjeta_index);
                  $card_container.append($card_col);
              }
              $("#div-pagination").show();
            }
              $card_row.html($card_container);


          }
      });
    }
  }

}

function obtener_dato(class_name) {
    var filtroA = [];//UN ARREGLO APRA GAURDAR LOS VALORES DE LOS CHECKBOX

    $('.' + class_name + ':checked').each(function () {//PARA CADA CHECKBOX SE OBTIENE EL VALOR Y SE AGREGA AL ARREGLO

        filtroA.push($(this).val());

    });

return filtroA;
}
$('.filled-in').click(function () {
    datos_filtro();
    $('#div-cards-pets-filter').hide();
});


});
