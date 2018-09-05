//pull in information from the users survey inputs
$("#submit-button").on("click", function (event) {
    event.preventDefault();

    console.log('Working on database submission...')

    var currentUser = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        location: $("#zipcode").val(),
        age: parseInt($("#age").val()),
        question1: parseInt($("#q1").val()),
        question2: parseInt($("#q2").val()),
        question3: parseInt($("#q3").val()),
        question4: parseInt($("#q4").val()),
        question5: parseInt($("#q5").val()),
        question6: parseInt($("#q6").val()),
        question7: parseInt($("#q7").val()),
        question8: parseInt($("#q8").val()),
        question9: parseInt($("#q9").val()),
        question10: parseInt($("#q10").val())
    };

    $.ajax("/api/updatesurvey", {
        type: "PUT",
        data: currentUser,
        success: function (res) {
            if (res.redirect !== undefined) {
                window.location.href = res.redirect_url
            }
        }
    });


});//end on click function