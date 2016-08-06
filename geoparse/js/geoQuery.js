/*Parse*/
Parse.initialize("tlPAeKvnm7delfj2f5aEKRcadPcvpRAvSkB22yLs", "VKIUramQ72WbFq8WHxyltQrewVfgo8px4z6kvE52");
var PlaceObject = Parse.Object.extend("PlaceObject");
var placeObject = new PlaceObject();
/* end of Parse*/

/*Map*/

// Массив для маркеров
var markersArray = [];

// Очистка маркеров

function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

// Координаты кликнутой точки.
var locationObj = {};
//
var nearlatLng = {};


// Вызов карты

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat:50.4501, lng: 30.523400000000038 }
  });
// Установка маркера по клику
  map.addListener('click', function(e) {
    clearOverlays();
    locationObj["lat"]=e.latLng.lat();
    locationObj["lng"]=e.latLng.lng();
    //Достаем ближайшие точки и ставим маркер
    getNear(map);

  });
}
initMap();

function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: "Ты здесь!"
  });
  map.panTo(latLng);
  markersArray.push(marker);
}



/*Ближайшая точка*/


function getNear(map) {
    var query = new Parse.Query(PlaceObject);
    var point = new Parse.GeoPoint({latitude: locationObj.lat, longitude: locationObj.lng});
    var user = Parse.User.current();
    /*query.equalTo("user", user);*/
    query.near("location", point);
    query.limit(4);
    query.find({
        success : function (results) {
            //Сохраним координаты ближайшей точки
            nearlatLng = {lat: results[0].get("location").latitude, lng: results[0].get("location").longitude};
            // Сохраняем title для маркера(название города)
            nearTitle = results[0].get("CityName");
            // Вызов установки маркера
            placeMarkerNear(nearlatLng, map, nearTitle);
            var output = "<thead><caption>Ближайшие точки в зависимости от близости</caption><tr><th>CityName</th><th>Latitude</th><th>Longitude</th><th>CreatedAt</th><th>Action</th></tr></thead><tbody>";
            for (var i in results){
                var cityName =  results[i].get("CityName");
                var location = results[i].get("location");
                var createdAt = results[i].get("createdAt");
                output += "<tr>";
                output += "<td>"+cityName+"</td>";
                output += "<td>"+location.latitude+"</td>";
                output += "<td>"+location.longitude+"</td>";
                output += "<td>"+createdAt+"</td>";
                output += "<td>none</td>";
                output += "</tr>";
            }
            output += "</tbody>";
            $("#table-near").html(output);

        },error: function (error) {
            console.log("Query Error"+error.message);
        }
    });

}

//Установка ближайшего маркера

function placeMarkerNear(latLng, map,title) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: "Ближайшая точка: "+title,
    icon: "img/pizzaria.png"
  });
  map.panTo(latLng);
  markersArray.push(marker);
}
