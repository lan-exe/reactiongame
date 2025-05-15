const circle = document.getElementById("circle");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");
const gameOverMessage = document.getElementById("gameOverMessage");
const finalScoreEl = document.getElementById("finalScore");

let score = 0;
let timeLeft = 30;
let timerInterval;

function randomPosition() {
  const gameArea = document.getElementById("gameArea");
  const maxX = gameArea.clientWidth - circle.offsetWidth;
  const maxY = gameArea.clientHeight - circle.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  circle.style.left = x + "px";
  circle.style.top = y + "px";
  circle.style.display = "block";
}

function catchCircle() {
  score++;
  scoreboard.textContent = "Score: " + score;
  randomPosition();
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreboard.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 30";
  timerDisplay.classList.remove("blink", "red");
  gameOverMessage.style.display = "none";
  circle.style.display = "block";
  randomPosition();

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      endGame();
      return;
    }

    timeLeft--;
    timerDisplay.textContent = "Time: " + timeLeft;

    if (timeLeft < 10) {
      timerDisplay.classList.add("blink", "red");
    } else {
      timerDisplay.classList.remove("blink", "red");
    }
  }, 1000);
}

function endGame() {
  clearInterval(timerInterval);
  circle.style.display = "none";
  finalScoreEl.textContent = score;
  gameOverMessage.style.display = "block";

  const name = localStorage.getItem("loggedInUser");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.name === name);
  if (user) {
    user.score = Math.max(user.score, score);
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("lastScore", score);
}

function goHome() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", startGame);
