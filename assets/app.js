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
var offset = 0;
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
    "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&offset=" +
    offset;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#img-container").empty();
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var personDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").html("Rating : " + rating);
      var favorite = $("<button>")
        .text("Like")
        .addClass("favorite")
        .attr("data-animate", results[i].images.fixed_height.url)
        .attr("data-still", results[i].images.fixed_height_still.url);
      p.append(favorite);
      var personImg = $("<img>")
        .attr("src", results[i].images.fixed_height_still.url)
        .attr("data-state", "still")
        .attr("data-animate", results[i].images.fixed_height.url)
        .attr("data-still", results[i].images.fixed_height_still.url);
      personDiv.append(personImg, p);
      $("#img-container").append(personDiv);
    }
  });
  offset += 10;
});

$("#img-container").on("click", "img", function() {
  var state = $(this).attr("data-state");
  var stillUrl = $(this).attr("data-still");
  var animateUrl = $(this).attr("data-animate");
  if (state === "still") {
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still");
  }
});

$(".container").on("click", ".favorite", function (){
  var stillGif = $(this).attr("data-still")
  var animatedGif = $(this).attr("data-animate")
  var favGif = $("<img>").attr("data-still", stillGif).attr("data-animate", animatedGif).attr("src", stillGif);
  $("#favorites").prepend(favGif)
  
})

$("#favorites").on("click", "img", function() {
  var state = $(this).attr("data-state");
  var stillUrl = $(this).attr("data-still");
  var animateUrl = $(this).attr("data-animate");
  if (state === "still") {
    $(this).attr("src", animateUrl);
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", stillUrl);
    $(this).attr("data-state", "still");
  }
});


$("#submit").on("click", function() {
  event.preventDefault();

if($("#keyword").val() !== "" ){
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
  addBtn();}
  else {
    alert("Please enter a search term")
  }
  $("#keyword").val("");
});
