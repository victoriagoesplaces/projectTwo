//this file adds a review to a specific user

$(this).on('click', function() {
    event.preventDefault();

    //pull in values for reviews here
    var newReview = {
        id: $(this).val(), //ensure that the add review button has a value attribute with the user's ID
        description: $("#description").val(), //possibly rename depending on handlebars
        rating: parseInt($("#rating").val()) //possibly rename depending on handlebars
};

    $.ajax({
        method: "POST",
        url: "/review",
        data: newReview
    });
});