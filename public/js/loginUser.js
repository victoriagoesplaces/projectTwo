$("#login-button").on("click", function (event) {
    event.preventDefault();

    var currentUser = {};


    currentUser.username = $("#email").val();
    currentUser.password = $("#password").val();

    console.log(currentUser);

    $.ajax({
        type: "POST",
        url: "/api/authenticateuser",
        data: currentUser,
        success: function(result) {
            console.log("logged in");
            
        }
    });
});//end on click for login button
