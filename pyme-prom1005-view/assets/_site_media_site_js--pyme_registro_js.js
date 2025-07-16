

function InvalidMsg(element) {
  if (element.type == 'text') {
    switch (element.name) {
      case 'nombre':
        element.setCustomValidity('Por favor, ingresa tu nombre.');
        break;
      case 'telefono':
        element.setCustomValidity('Por favor, ingresa un número de telefono valido eg.:(52)55 1234 5678');
        break;
      case 'edad':
        element.setCustomValidity('Por favor, ingresa tu edad (solo números)');
        break;
      case 'ticket':
        element.setCustomValidity('Por favor, ingresa tu número de tiket');
        break;
      default:
        element.setCustomValidity('Por favor, ingresa este dato.');
    }
  }
  if (element.type == 'date') {
    element.setCustomValidity('Por favor, ingresa fecha');
  }
  if (element.type == 'email') {
    element.setCustomValidity('Por favor, ingresa una cuenta de correo válida eg.: nombre@dominio.com');
  }
  if (element.type == 'checkbox') {
    switch (element.name) {
      case 'terminos':
        element.setCustomValidity('Por favor, acepta los términos y condiciones.');
        break;
      case 'usage':
        element.setCustomValidity('Por favor, acepta los términos de uso de información.');
        break;
      default:
        element.setCustomValidity('Por favor, selecciona una casilla.');
    }
  }
  if (element.type == 'psw' && element.name == 'psw') {
    element.setCustomValidity('Tu contraseña deve tener almenos una mayuscula, una minuscula, un numero y un caracter especia.');
  }
  if (element.name == 'team') {
    element.setCustomValidity('Por favor, selecciona tu equipo de la NBA favorito.');
  }
  if (element.name == 'country' || element.name == 'pais') {
    element.setCustomValidity('Por favor, selecciona el pais donde resides.');
  }
  if (element.name == 'state' || element.name == 'estado') {
    element.setCustomValidity('Por favor, selecciona el estado donde resides.');
  }
  if (element.type == 'file') {
    element.setCustomValidity('Por favor, sube un archivo ".jpg", ".png" o ".pdf".');
  }
  if (element.type == 'radio' && !window['ric_' + name]) {
    element.setCustomValidity('Por favor, selecciona una opción.');
  }
  return true;
}

function date_input_blur(el){
  if(el.value == '') el.type = 'text';
  return;
}
function date_input(el){
  if (el.type != 'date') el.type = 'date';
  $(el).trigger("focus");
  return
}
$(document).ready(function () {
  $("input[name='telefono']").mask('00-0000-0000');
  $('input[type = "date"]').on('change input', function (e) {
    e.preventDefault()
    if (this.value == '') {
      $(this).addClass('empty')
    } else {
      $(this).removeClass('empty')
    }
  });
});