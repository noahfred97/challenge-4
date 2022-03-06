


var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hides start-screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hides questions section
  questionsEl.removeAttribute("class");

  // starts quiz timer
  timerId = setInterval(clockTick, 1000);

  // shows timer start
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // gets current question object from questions array
  var currentQuestion = questions[currentQuestionIndex];

  // updates title to match current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clears out any old question choices
  choicesEl.innerHTML = "";

  // loops choices
  currentQuestion.choices.forEach(function(choice, i) {
    // creates new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attaches click event listener to choices
    choiceNode.onclick = questionClick;

    // displays on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // checks if guess is wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtracts time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "350%";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "350%";
  }

  // flashes answer response
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // checks the current time
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stops timer
  clearInterval(timerId);

  // shows end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // shows final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hides questions element
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update our time
  time--;
  timerEl.textContent = time;

  // checks if user has ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
