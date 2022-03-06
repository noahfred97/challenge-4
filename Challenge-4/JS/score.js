

function printHighscores() {
  // get scores from local storage or set to an empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sorts highscores by value or score property in highest value to lowest order.
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // creates a list tag for each element
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // displays on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// when page loads function runs
printHighscores();
