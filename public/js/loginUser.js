$("#login-button").on("click", function () {
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
            //console.log(result);
            window.location.href = "/matches";//workaround to allow successful login to redirect to matches
            
        }
    });
});//end on click for login button
