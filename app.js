$(document).ready(function () {
    //initial araray of shows
    var shows = ["Game of Thrones", "The Office", "Big Bang Thoery", "Grey's Anatomy", "Power"];

    function displayShowInfo() {

        var show = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=taj3dZXgIPpT7U7r7x9e00eicEysO71h&limit=10"
        console.log(queryURL);


        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (reponse) {
            var results = response.data;
            console.log(results);

            //loop through the results
            for (var i = 0; i < results.length; i++) {
                var tvShowDiv = $("<div>");
                var p = $("<p>");
                p.html("Rating: " + results[i].rating.toUpperCase());

                var tvShowImg = $("<img>");
                //assign still and animate state and url to each giphy
                tvShowImg.attr("src", results[i].images.fixed_height_still.url);
                tvShowImg.attr("data-still", results[i].images.fixed_height_still.url);
                tvShowImg.attr("data-animate", results[i].images.fixed_height.url);
                tvShowImg.attr("data-state", "still");
                tvShowImg.addClass("imgclick");
                tvShowDiv.append(tvShowImg);
                tvShowDiv.append(p);
                tvShowDiv.addClass("gif-div");
                $("#shows-view").prepend(tvShowDiv);
            }


        })
    };

    //change state of giphy and animate when clicked
    $("#buttons-view").on("click", ".imgclick", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            var animates = $(this).attr("data-animate");
            //change giphy link to the one to animate
            $(this).attr("src", animates);
            //change state of giphy to animate
            $(this).attr("data-state", "animate");
        } else {
            var still = $(this).attr("data-still");
            //change giphy link to the one that is still
            $(this).attr("src", still);
            //change state of giphy to animate
            $(this).attr("data-state", "still");
        }

    })

    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < shows.length; i++) {
            var buttons = $('<button>' + shows[i] + '</button>')
            buttons.appendTo('#buttons-view');
        }
    }
    $("#add-show").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var show = $("#show-input").val().trim();

        // Adding movie from the textbox to our array
        shows.push(show);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });


    // Adding a click event listener to all elements with a class of "movie-btn"
    $(document).on("click", ".show-btn", displayShowInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();

})