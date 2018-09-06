//this file adds a review to a specific user

$("#add-review-button").on('click', function() {//rename button as necessary depending on handlebars file
    event.preventDefault();

    //pull in values for reviews here

    /*Uncomment when page works
    var newReview = {
        id: $(this).val(), //ensure that the add review button has a value attribute with the user's ID
        description: $("#description").val(), //possibly rename depending on handlebars
        rating: parseInt($("#rating").val()) //possibly rename depending on handlebars
};
*/

    //temporary newReview variable for testing
    var newReview = {
        UserId: 1,
        name: "Joe",
        description: "This is a review",
        rating: 5
    };

    $.ajax({
        method: "POST",
        url: "/review",
        data: newReview,
        success: function (res) {
            if (res.redirect !== undefined) {
                window.location.href = res.redirect_url
            }
        }
    });
});