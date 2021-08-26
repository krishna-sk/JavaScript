let min = 1,
  max = 10,
  guessLeft = 3,
  winNum = getRandomNumber(min, max);

const minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  btn = document.querySelector("#guessBtn"),
  guessInput = document.querySelector("#guessInput"),
  message = document.querySelector("#message"),
  game = document.querySelector("#game");

btn.addEventListener("click", check);

game.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

function getRandomNumber() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function check() {
  input = parseInt(guessInput.value);
  if ((isNaN(input) || input < min || input > max) && guessLeft < 3) {
    setMessage(
      `Enter a number between ${min} and ${max} and Only ${guessLeft} attempts left,Try Again `,
      "red"
    );
  } else if (isNaN(input) || input < min || input > max) {
    setMessage(`Enter a number between ${min} and ${max}`, "red");
  } else if (input === winNum) {
    gameOver("green");
  } else {
    guessLeft--;
    if (guessLeft <= 0) {
      gameOver("red");
    } else {
      guessInput.value = "";
      guessInput.style.borderColor = "red";
      setMessage(
        ` ${input} is Incorrect, Only ${guessLeft} attempts left,Try Again`,
        "red"
      );
    }
  }
}

function setMessage(error, color) {
  message.style.color = color;
  message.textContent = error;
}

function gameOver(color) {
  let msg =
    color === "red"
      ? `Game Over Try Again ! The Correct number was ${winNum}`
      : `Success the number is ${winNum}`;
  guessInput.style.borderColor = color;
  guessInput.value='';
  guessInput.disabled = true;
  btn.value = "Play Again";
  btn.className += " play-again";
  setMessage(msg, color);
}
