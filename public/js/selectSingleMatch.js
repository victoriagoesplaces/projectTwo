//This file is the JavaScript needed to select a single match and display their user profile

$(document).ready(function () {

$(this).on('click', ".profile-button", function() {
    event.preventDefault();

    var selectedMatchId = $(this).val();

    $.ajax({
        method: "GET",
        url: "/profile/" + selectedMatchId
    });

});

});