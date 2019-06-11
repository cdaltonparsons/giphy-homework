var buttons = [
  "anthony jeselnik",
  "eddie murphy",
  "robin williams",
  "zach galifinakis",
  "kristen wiig",
  "kate mckinnon",
  "melissa mccarthy",
  "john mulaney",
  "nick kroll",
  "danny devito",
  "iliza shlesinger",
  "natasha leggero"
];
for (var i = 0; i < buttons.length; i++) {
  var gifButton = $("<button>")
    .attr("data-person", buttons[i])
    .text(buttons[i])
    .addClass("personButton");
  $(".buttons-container").append(gifButton);
}
$(".buttons-container").on("click", ".personButton", function() {
  var person = $(this).attr("data-person");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#img-container").empty();
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var personDiv = $("<div>").addClass("imgDiv");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating : " + rating);
      var personImg = $("<img>")
        .attr("src", results[i].images.fixed_height_still.url)
        .attr("data-state", "still")
        .attr("animate-url", results[i].images.fixed_height_still.url)
        .attr("still-url", results[i].images.fixed_height_still.url)
        .addClass("gifs col-md-6");
      personDiv.append(personImg, p);
      $("#img-container").append(personDiv);
    }
  });
});

$("#img-container").on("click", ".gifs", function() {
  var state = $(this).attr("data-state");
  var stillUrl = $(this).attr("still-url");
  var animateUrl = $(this).attr("animate-url");
  if (state === "still") {
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still");
  }
});

$("#submit").on("click", function() {
  function addBtn() {
    var keyword = $("#keyword")
      .val()
      .trim();
    var newBtn = $("<button>")
      .attr("data-person", keyword)
      .addClass("personButton")
      .text(keyword);
    $(".buttons-container").append(newBtn);
  }
  addBtn();
});
