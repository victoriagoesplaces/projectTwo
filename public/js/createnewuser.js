
$("#confirm-button").on("click", function (event) {
    event.preventDefault();


    //Uncomment for production
    var useremail = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#passwordConfirm").val();//change once confirm password field exists


    if (confirmPassword !== password) {
        alert("Password and Confirm Password field do not match");//possibly create a modal or alert stating that passwords do not match
    } else {

        //Set newUser

        var newUser = {
            userEmail: useremail,
            password: password,
            confirmPassword: confirmPassword
        }


        $.ajax("/api/createnewuser", {
            type: "POST",
            data: newUser,
            success: function (res) {
                if (res.redirect !== undefined) {
                    window.location.href = res.redirect_url
                }
            }

        });
    }
}); //end on click function