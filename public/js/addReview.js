//this file adds a review to a specific user

$("#add-review-button").on('click', function() {//rename button as necessary depending on handlebars file
    event.preventDefault();

    console.log("Star Value");
    var stars =  $("input[name='reviewStars']:checked").val();
    console.log(stars);

    //pull in values for reviews here

    //Uncomment when page works
    var newReview = {
        UserId: $(this).val(),
        description: $("#description").val(), //possibly rename depending on handlebars
        rating: stars
};

    //temporary newReview variable for testing
    /*var newReview = {
        UserId: 1,
        name: "Joe",
        description: "This is a review",
        rating: 5
    };*/

    console.log(newReview);

    $.ajax({
        method: "POST",
        url: "/review",
        data: newReview
        /*success: function (res) {
            if (res.redirect !== undefined) {
                window.location.href = res.redirect_url
            }
        }*/
    }).then(function() {
        console.log("made it to reload")
        location.reload();
    });
});