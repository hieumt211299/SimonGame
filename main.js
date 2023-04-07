let buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
let userClickedPattern = [];
let level = 1;

function nextSequence(level) {
  userClickedPattern = [];
  let number = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColors[number];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  animationPress(randomChosenColour);
  level++;
  $("h1").text(`level ${level}`);
}

function playSound(item) {
  let sound = new Audio(`./sounds/${item}.mp3`);
  sound.play();
}
function animationPress(item) {
  $(`#${item}`).fadeOut(10).fadeIn(10);
}
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
$(document).one("keydown", function () {
  nextSequence(level);
  $("h1").text(`level ${level}`);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence(currentLevel);
      }, 1000);
    }
  } else {
    let sound = new Audio("./sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text(`Game Over, Press Any Key to Restart`);
    $(document).one("keydown", function () {
      startOver();
    });
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence(level);
  $("h1").text(`level ${level}`);
}
