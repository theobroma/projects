//Регистрация
$("#signup").submit(function (event) {
    event.preventDefault();
    var username = $("#inputUserName").val();
    var password = $("#inputPassWord").val();
    var passwordConfirm = $("#inputConfirmPassWord").val();
    var email = $("#inputEmail").val();
    //Parse part goes here...
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp(null, {
      success: function(user) {
         alert("Пользователь "+username+" был создан!");
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
});
// Log in
$("#login").submit(function (event) {
    event.preventDefault();
    var username = $("#loginUserName").val();
    var password = $("#loginPassWord").val();
    //Parse part goes here...
    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log("Log in Success!");
        checkLogin();
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        console.log("Log in Error:"+error.message);
      }
    });
});
// Check login
function checkLogin() {
    if (Parse.User.current()){
        $("#current-user").html("User:"+Parse.User.current().get("username"));
    }
}
checkLogin();
