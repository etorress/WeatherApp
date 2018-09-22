$(document).ready(function(){
  $('#submitWeather').click(function(){
    var city = $("#city").val();
    var selector = document.getElementById('format');
    var format = selector[selector.selectedIndex].value;
    if(city != '' && format == 'json'){
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q='
        + city + '&mode=json&units=metric&APPID=e114274d8c7da2abf44abd2ad8177fdd',
        type: 'GET',
        dataType: 'jsonp',
        success: function(data){
            var widget = show(data);
            $("#show").html(widget);
            $("#city").val('');
        }

      });
    }
    else if (city != '' && format == 'xml') {
       var url =  'https://api.openweathermap.org/data/2.5/weather?q='
      + city + '&mode=xml&units=metric&APPID=e114274d8c7da2abf44abd2ad8177fdd';
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              var wid = showXML(this);
              $("#show").html(wid);
              $("#city").val('');
          }
      };
      xhttp.open("GET", url, true);
      xhttp.send();
    }
    else{
      $("#error").html('<div class="alert alert-danger" id="errorCity"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>El campo no puede estar vacío.</div>');
    }
  })
});

function show(data){
  let unix_sunrise = data.sys.sunrise;
  let unix_sunset = data.sys.sunset;
  let unix_date = data.dt;
  let date_sunrise = new Date(unix_sunrise*1000);
  let date_sunset = new Date(unix_sunset*1000);
  let date_upd = new Date(unix_date*1000);
  var sunrise = date_sunrise.toLocaleTimeString();
  var sunset = date_sunset.toLocaleTimeString();
  var update = date_upd.toLocaleTimeString();
  return "<h3 style='font-size:32px; font-weight: bold;' class='text-center'>Clima actual para " + data.name + ", " + data.sys.country + "</h3>" +
         "<h3><strong>Clima</strong>: " + data.weather[0].main + "</h3>" +
         "<h3><strong>Descipción</strong>: " + data.weather[0].description + "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'></h3>" +
         "<h3><strong>Temperatura</strong>: " + data.main.temp + "&deg;C</h3>" +
         "<h3><strong>Temperatura mínima</strong>: " + data.main.temp_min + "&deg;C</h3>" +
         "<h3><strong>Temperatura máxima</strong>: " + data.main.temp_max + "&deg;C</h3>" +
         "<h3><strong>Presión</strong>: " + data.main.pressure + " hpa</h3>" +
         "<h3><strong>Humedad</strong>: " + data.main.humidity + "%</h3>" +
         "<h3><strong>Velocidad del viento</strong>: " + data.wind.speed + " m/s</h3>" +
         "<h3><strong>Dirección del viento</strong>: " + data.wind.deg + "</h3>" +
         "<h3><strong>Salida de sol</strong>: " + sunrise + "</h3>" +
         "<h3><strong>Puesta de sol</strong>: " + sunset + "</h3>" +
         "<h3><strong>Latitud</strong>: " + data.coord.lat + " m/s</h3>" +
         "<h3><strong>Longitud</strong>: " + data.coord.lon + "&deg</h3>" +
         "<h3><strong>Ultima actualizacion</strong>: " + update + "</h3>";
}

function showXML(xml){
  var city, wind, xmlDoc, txt, icon;
  xmlDoc = xml.responseXML;
  txt = "";
  icon = xmlDoc.getElementsByTagName('weather')[0].getAttribute('icon');
  temp = xmlDoc.getElementsByTagName('temperature')
  wind = xmlDoc.getElementsByTagName('wind')
  city = xmlDoc.getElementsByTagName('city');
  let rise = new Date(city[0].childNodes[2].getAttribute('rise'));
  let set = new Date(city[0].childNodes[2].getAttribute('set'));
  var sunrise = rise.toLocaleTimeString();
  var sunset = set.toLocaleTimeString();
  return "<h3 style='font-size:32px; font-weight: bold;' class='text-center'>Clima actual para " + city[0].getAttribute('name') + ", " + city[0].getElementsByTagName('country')[0].childNodes[0].nodeValue + "</h3>" //city
      + "<h3><strong>Clima</strong>: " + xmlDoc.getElementsByTagName('weather')[0].getAttribute('value') + "<img src='http://openweathermap.org/img/w/" + icon + ".png'></h3>"
      + "<h3><strong>Temperatura</strong>: " + temp[0].getAttribute('value') + "&deg;C</h3>" //temp
      + "<h3><strong>Temperatura mínima</strong>: " + temp[0].getAttribute('min') + "&deg;C</h3>"//min temp
      + "<h3><strong>Temperatura máxima</strong>: " + temp[0].getAttribute('max') + "&deg;C</h3>"//max temp
      + "<h3><strong>Presión</strong>: " + xmlDoc.getElementsByTagName('pressure')[0].getAttribute('value') + " hpa</h3>"//presion
      + "<h3><strong>Humedad</strong>: " + xmlDoc.getElementsByTagName('humidity')[0].getAttribute('value') + "%</h3>"//humedad
      + "<h3><strong>Velocidad del viento</strong>: " + xmlDoc.getElementsByTagName('wind')[0].childNodes[0].getAttribute('value') + " m/s</h3>" //wind speed
      + "<h3><strong>Dirección del viento</strong>: " + xmlDoc.getElementsByTagName('wind')[0].childNodes[2].getAttribute('name') + "</h3>"//wind direction
      + "<h3><strong>Salida de sol</strong>: " + sunrise + "</h3>"//sunrise
      + "<h3><strong>Puesta de sol</strong>: " + sunset + "</h3>"//sunset
      + "<h3><strong>Latitud</strong>: " + city[0].childNodes[0].getAttribute('lat') + "</h3>"//latitud
      + "<h3><strong>Longitud</strong>: " + city[0].childNodes[0].getAttribute('lon') + "</h3>"//longitud
      + "<h3><strong>Ultima actualizacion</strong>: " + xmlDoc.getElementsByTagName('lastupdate')[0].getAttribute('value') + "</h3>";//last update

  //document.getElementById("demo").innerHTML = txt;
}
