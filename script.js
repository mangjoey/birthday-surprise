function showScreen(screenId) {

  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

}


function startGame() {
  showScreen("quiz");
}


function correctAnswer() {

  document.getElementById("quiz-message").innerHTML =
    "🎉 Correct! You know me very well. ❤️";

  setTimeout(() => {
    showScreen("memory");
  }, 1500);

}


function wrongAnswer() {

  document.getElementById("quiz-message").innerHTML =
    "😜 Hmm... try again!";

}


function revealMemory() {

  document.getElementById("memory-content")
    .classList.remove("hidden");

}


function showFinal() {
  showScreen("final");
}


function celebrate() {

  for (let i = 0; i < 30; i++) {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.top = "-50px";

    heart.style.fontSize =
      Math.random() * 30 + 20 + "px";

    heart.style.transition = "top 3s linear";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.top = "110vh";
    }, 100);

    setTimeout(() => {
      heart.remove();
    }, 3500);

  }

}
