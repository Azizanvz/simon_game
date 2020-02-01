var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var gameStarted = false;
var level = 0;

$(document).on("keypress", function(){
  if (gameStarted == false) {
    //alert("Hey!");
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }

});


$(".btn").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();


    console.log("wrong");
  }
}

function startOver(){
  level = 0;
  gamePattern =[];
  gameStarted = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
