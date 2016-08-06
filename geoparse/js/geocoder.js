/*Parse*/
Parse.initialize("tlPAeKvnm7delfj2f5aEKRcadPcvpRAvSkB22yLs", "VKIUramQ72WbFq8WHxyltQrewVfgo8px4z6kvE52");
var PlaceObject = Parse.Object.extend("PlaceObject");
var placeObject = new PlaceObject();
/* end of Parse*/

var geocoder;
var map;
var marker;

function initialize(){
//Определение карты
  var latlng = new google.maps.LatLng(56.329917,44.009191999999985);
  var options = {
    zoom: 15,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), options);

  //Определение геокодера
  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

}

$(document).ready(function() {

  initialize();

  $(function() {
    $("#address").autocomplete({
      //Определяем значение для адреса при геокодировании
      source: function(request, response) {
        geocoder.geocode( {'address': request.term}, function(results, status) {
          response($.map(results, function(item) {
            return {
              label:  item.formatted_address,
              value: item.formatted_address,
              latitude: item.geometry.location.lat(),
              longitude: item.geometry.location.lng()
            }
          }));
        })
      },
      //Выполняется при выборе конкретного адреса
      select: function(event, ui) {
        $("#latitude").val(ui.item.latitude);
        $("#longitude").val(ui.item.longitude);
        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker.setPosition(location);
        map.setCenter(location);
        /*Parse save geopoint*/
        var point = new Parse.GeoPoint({latitude: ui.item.latitude, longitude: ui.item.longitude});
        var user = Parse.User.current();
        placeObject.set("location", point);
        placeObject.set("CityName", ui.item.value);
        placeObject.set("user", user);

        placeObject.save(null, {
          success: function(placeObject) {
            // Execute any logic that should take place after the object is saved.
            alert('New object created with objectId: ' + placeObject.id);
          },
          error: function(placeObject, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });
      }
    });
  });

  //Добавляем слушателя события обратного геокодирования для маркера при его перемещении
  google.maps.event.addListener(marker, 'drag', function() {
    geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address').val(results[0].formatted_address);
          $('#latitude').val(marker.getPosition().lat());
          $('#longitude').val(marker.getPosition().lng());
        }
      }
    });
  });

});
