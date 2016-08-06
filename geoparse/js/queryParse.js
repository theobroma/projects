/*Parse*/
Parse.initialize("tlPAeKvnm7delfj2f5aEKRcadPcvpRAvSkB22yLs", "VKIUramQ72WbFq8WHxyltQrewVfgo8px4z6kvE52");
var PlaceObject = Parse.Object.extend("PlaceObject");
var placeObject = new PlaceObject();
/* end of Parse*/

// Выборка всех записей с Parse
function getPosts(arguments) {
    var query = new Parse.Query(PlaceObject);
    query.find({
        success : function (results) {
            var output = "";
            for (var i in results){
                var cityName =  results[i].get("CityName");
                var location = results[i].get("location");
                output += "<li>";
                output += "<h3>"+cityName+"</h3>";
                output += "<p>lat:"+location.latitude+"</p>";
                output += "<p>long:"+location.longitude+"</p>";
                output += "</li>";
            }
            $("#list-posts").html(output);
        },error: function (error) {
            console.log("Query Error"+error.message);
        }
    });

}
getPosts();
// Выборка всех записей с Parse в таблицу
function getTDPosts(arguments) {
    var query = new Parse.Query(PlaceObject);
    var user = Parse.User.current();
    query.equalTo("user", user);
    query.find({
        success : function (results) {
            var output = "<caption>Города в базе Parse.com</caption><thead><tr><th>CityName</th><th>Latitude</th><th>Longitude</th><th>CreatedAt</th><th>Action</th></tr></thead><tbody>";
            for (var i in results){
                var cityName =  results[i].get("CityName");
                var location = results[i].get("location");
                var createdAt = results[i].get("createdAt");
                output += "<tr>";
                output += "<td>"+cityName+"</td>";
                output += "<td>"+location.latitude+"</td>";
                output += "<td>"+location.longitude+"</td>";
                output += "<td>"+createdAt+"</td>";
                output += "<td><a class='btn btn-default' href='#'' role='button'>Delete</a></td>";

                output += "</tr>";
            }
            output += "</tbody>";
            $("#table-posts").html(output);
        },error: function (error) {
            console.log("Query Error"+error.message);
        }
    });

}
getTDPosts();

