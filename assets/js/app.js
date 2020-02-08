
//create all the elements
let gameStartDiv = $("#gameStartDiv");
let welcome = $("#welcome");
let instructions = $("#instructions");
let startButton = $("#startButton");
let nextButton = $("#nextButton");
let time = $("#time");
let questionsDiv = $("#questionsDiv");
let title = $("#title");
let choiceButton1 = $("#choiceButton1");
let choiceButton2 = $("#choiceButton2");
let choiceButton3 = $("#choiceButton3");
let choiceButton4 = $("#choiceButton4");
let answerChoices = $("#answerChoices");
let choiceButton = $(".choiceButton");
let resultsDiv = $("#resultsDiv");
let totalScore = $("#totalScore");
let highScoresDiv = $("#highScoresDiv");
let displayFinalScore = $("#displayHighScore");
let highScoresBtn = $("#highScoresBtn");
let clearHighScores = $("#clearHighScores");
let initialsInput = $("#initialsInput");
let userInitialsScoreSpan = $("#user-initials-score");
let submitButton = $("#submit");
let msg = $("#msg");
let restartButton = $("#restartButton");
let timer = $("#timer");

// Initializing the variables
let score;
let secondsLeft;
let highScore;
let questionIndex;
let totQuestions = questions.length;

// On load function, hide all the divs and show gameStart Div
window.addEventListener("load", function () {
    questionsDiv.hide();
    resultsDiv.hide();
    highScoresDiv.hide();
    gameStartDiv.show();
    timer.hide();
});

// click the start quiz button
startButton.click(function () {
    startQuiz()
});
// start the Quiz
function startQuiz() {
    startTimer();
    questionsDiv.show();
    timer.show();
    resultsDiv.hide();
    highScoresDiv.hide();
    gameStartDiv.hide();
    secondsLeft = 60;
    score = 0;
    timeTaken = 0;
    questionIndex = 0;
    setNextQuestion();
}

//Start Timer function
function startTimer() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        time.text(`Time left: ${secondsLeft}`);
        timeTaken++;
        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

//Decrement Timer function for choosing wrong answer
function decrementTimer() {
    secondsLeft = secondsLeft - 5;
}
//stop Timer function when the game ends soner than the given time
function stopTimer() {
    secondsLeft = 0;
    time.text(secondsLeft);
}
//render next question
function setNextQuestion() {
    showQuestion(questions[questionIndex]);
}
//render question
function showQuestion(question) {
    title.text((parseInt(questionIndex) + 1) + ". " + question.question);
    choiceButton1.text(question.choices[0]);
    choiceButton2.text(question.choices[1]);
    choiceButton3.text(question.choices[2]);
    choiceButton4.text(question.choices[3]);
}
//function to call when user chooses one of the choices
choiceButton.on("click", function () {
    let clickedEl = $(this);
    userChoice = $(clickedEl).text();
    checkAnswer();
});

//check if the user choice is correct or wrong
function checkAnswer(timerInterval) {
    if (userChoice === questions[questionIndex].answer) {
        alert("correct");
        score++
    }
    else {
        alert("wrong");
        decrementTimer();
    }
    questionIndex++
    if (questionIndex < totQuestions) {
        setNextQuestion();
    }
    else {
        endGame();
    }
}
//End game once all questions are answered or if time runs out
function endGame() {
    questionsDiv.hide();
    highScoresDiv.hide();
    gameStartDiv.hide();
    resultsDiv.show();
    timer.hide();
    stopTimer();
    totalScore.text(`You answered ${score} out of ${totQuestions} correct in ${timeTaken - 1} seconds`);
}
//Message to display when submit button is clicked
function displayMessage(type, message) {
    msg.attr("class", type);
    msg.text(message);
    console.log(type);
}

//function to run after user enters initials and submits the results
submitButton.on("click", function (event) {
    event.preventDefault();
    showHighScores()
});

//Message to display high scores of all initials submitted
function showHighScores() {
    let user = {
        initials:jQuery.trim(initialsInput.val()),
        score:score,
    };

    if (initialsInput === "") {
        displayMessage("error", "Initials cannot be blank");
        resultsDiv.show();
    } else {
        displayMessage("success", "Thank you for taking the quiz!");
        // Save initials and score to localStorage and render the last initials and score.
        localStorage.setItem("user", JSON.stringify(user));
        // get most recent submission
        var lastUser = localStorage.getItem("user");
        lastUser = JSON.parse(lastUser);
        console.log(lastUser);
        userInitialsScoreSpan.text(` ${lastUser.initials} : ${lastUser.score} `);
    }
    highScoresDiv.show();
    resultsDiv.hide();
    questionsDiv.hide();
    gameStartDiv.hide();
}
// Clear Score function

function clearScore (){
    localStorage.clear();
    userInitialsScoreSpan.text("");
}

//Start quiz from the beginning when Restart button is clicked
restartButton.on("click", function (event) {
    startQuiz()
});
//Show High Scores when View High Score link in nav bar is clicked
clearHighScores.on("click", function (event) {
    clearScore()
});
//Show High Scores when View High scores button is clicked
highScoresBtn.on("click", function (event) {
    showHighScores()
});

