$(document).ready(function () {
  //  Vars linking to HTML
  const startButton = $('#start-quiz');  // button that starts the quiz, hides upon pressing
  const questionDiv = $('#question-div');  // The div holding the question, answers, next/finish button, and timer.
  const nextButton = $("#next-button");  // next button, for going to next question
  const finishButton = $("#finish-button");  // button shown on last question only, event brings up score-div
  const questionNumber = $("#question-number");  // The number of the current question user is on
  const totalQuestions = $("#total-questions");  // Total number of questions the user has to endure
  const theQuestionDescription = $("#question-description");  // Where we display the question being asked
  const theQuestionCode = $("#question-code");  // Where we put code-snippets that go with question
  const scoreDiv = $("#score-div");  // The entire div where scores are displayed, used to hide/un-hide
  const option1 = $('#option1');  // where the question's possible answers are displayed
  const option2 = $('#option2');  // same ^^^
  const option3 = $('#option3');  // same ^^^
  const option4 = $('#option4');  // same ^^^
  const newScoreDisplay = $("#new-score-display");  // where the users new score is displayed when they are prompted to input their name
  const saveScoreButton = $("#save-score-button");  // where the button is for saving user Name and Score
  const usersNameInput = $("#users-name");  // where user inputs their name after taking quiz
  const timeDisplay = $("#time-display");  // where time is displayed
  const topScoreDisplay = $("#top-score-display");  // where top scores are displayed
  //  vars for storage
  const newScoreForm = $("#new-score-form");
  let getSavedScoresLocal = JSON.parse(localStorage.getItem("userScores"));  // get scores from local storage
  //  vars that change
  let newQuestionNumber = 0;  // 2 uses, 1: display to the user so they know what Q they're on. 2: before increment on new Q, used as an index point for the array of questions
  let score = 0;  // Score that the user accumulates through taking the quiz
  let timerInterval;  // this is used for setting/resetting the time interval that runs the timer
  let timerRunning = false;  // this will be checked before certain timer functions happen

  
  const timer = {  // Our timer object
    time: 30,  // initiate time
    
    reset: function () {  // reset timer
      timer.time = 30;  // reset timer.time back to 30
      timeDisplay.text("00:30");  // reset time in the timer display
    },

    start: function () {  // start timer
      // DONE: Use setInterval to start the count here and set the timer to running.
      if (!timerRunning) {  // is timerRunning is false,
        timerInterval = setInterval(timer.count, 1000);  // we set the timer to count by 1 second
        timerRunning = true;  // set timerRunning to true
      }
    },

    stop: function () {  // stop timer
      clearInterval(timerInterval);  //Clear timer interval
      timerRunning = false;  // timer no longer running so set to false
    },

    count: function () {  // how the timer counts
      timer.time--;  //decrement time by 1
      timeDisplay.text(timer.timeConverter(timer.time));  // Pass the current time (timer.time) into timeConverter() and display the time
        if (timer.time === 0){
        timer.stop();
        if (newQuestionNumber === questionsArray.length) {
          finishQuiz();
        } else {
          nextQuestion();
        }
      }
    },

    timeConverter: function (time) {  // convert time from seconds into minutes and seconds for display purposes
      let minutes = Math.floor(time / 60);  // time, in seconds, divided by 60 to give us number of minutes
      let seconds = time - (minutes * 60);  // multiply minutes by 60 to give it's amount of Seconds, and subtract from the total number of seconds that Time equals (Time is always >= Minutes)

      if (seconds < 10) {  // if secs < 10,
        seconds = `0${seconds}`;  // we want seconds to display as 00 - 09
      }

      if (minutes === 0) {  // if mins = 0
        minutes = `00`;  // we want mins to show as 00
      }
      else if (minutes < 10) {  // if mins < 10,
        minutes = `0${minutes}`;  // we want minutes to display as 00 - 09
      }

      return `${minutes}:${seconds}`;  // return the display of time as **:**
    }
  };

  let questionsArray = [  // Array of objects makes up the questions, all objects are structured the same so only 1st has comments
    {
      question: {  // questions have 2 parts,
        description: `What is the output of the following code?`,  // Description with question
        codeSnippet: `let fruits = ["Banana", "Orange", "Apple", "Mango"]; \  
                              $("output").text = fruits.sort();`  // code snippet to aid question
      },
      correctAnswer: `["Apple", "Banana", "Mango", "Orange"]`,  // The correct answer
      wrongAnswers: {                                           // The wrong answers
        option1: `["Orange", "Mango", "Banana", "Apple"]`,
        option2: `undefined`,
        option3: `null`
      },
    },
    {
      question: {
        description: `How would you access the last index of an array if you didn't know the length?`,
        codeSnippet: `fruits = ["Banana", "Orange", "Apple", "Mango"];\
                                fruits2 = ["Watermelon", "Grapes", "Pears"];`
      },
      correctAnswer: `const last = fruits[fruits.length - 1];`,
      wrongAnswers: {
        option1: `const last = fruits.length - 1;`,
        option2: `const last = fruits.length(-1);`,
        option3: `const last = fruits.last;`
      },
    },
  ]

  if (!Array.isArray(getSavedScoresLocal)) {  // does an array already exist in local storage?
    getSavedScoresLocal = [];  // if not then we make it exist!
  }

  saveScoreButton.on("click", function (event) {  // when user presses the button to submit their Name and Score
    event.preventDefault();  // We pave our own path
    newScoreForm.addClass("hide");
    let name = usersNameInput.val();  // temporarily storing users entered name
    usersNameInput.val("");  // clearing the input field user typed their name
    const userRecordObject = {  // setting the users name and score into a new object
      name: name,
      score: score
    }
    getSavedScoresLocal.push(userRecordObject);  // adding the above new object to saved scores array
    localStorage.setItem("userScores", JSON.stringify(getSavedScoresLocal));  // setting the new array, now a string, to local storage

    displayScores();  // displays the new list of scores from local storage
  });

  // Displays the current scores saved in local storage, if any exist
  function displayScores() {
    topScoreDisplay.empty();  // empties the section where we display the top scores
    const savedScores = getSavedScoresLocal;

    if (!Array.isArray(savedScores)) {  // does an array already exist in local storage?
      savedScores = [];  // if not then we make it exist!
    }
    
    for (let i = 0; i < savedScores.length; i++) {  // render our savedScores to the page
      const newParagraph = $("<p>").text(`Name: ${savedScores[i].name}, Score: ${savedScores[i].score}`);  // put each combo of name and score into a p-tag
      topScoreDisplay.prepend(newParagraph);  // Prepend so most recent score shows first
    }
  }
  
  // Randomize the order of the questions in the questionsArray[array]
  function randomQuestionOrder(questionsArray) {
    for (i = 0; i < questionsArray.length; i++) {
      let tempObject = questionsArray[i];  // Take questions object at questionsArray index i and temporarily hold it in tempObject
      let randomIndex = Math.floor(Math.random() * questionsArray.length);  // take this random number from 0 to max length of questionsArray array... and
      questionsArray[i] = questionsArray[randomIndex];  // and take that index of questionsArray and assign it in the place we took this iteration from... then
      questionsArray[randomIndex] = tempObject;  // then we take this iteration's index value and plug it in where we took the random index from
    }
  }
  // Assign values to sections in the div containing the question
  function populateQuestionDiv() {
    questionDiv.removeClass('hide');  // div for questions is hidden by default, un-hide it
    let index = newQuestionNumber;  // newQuestNum starts at 0 and so will our index, they will increment through each question
    newQuestionNumber++;  // incrementing newQuestNum to be displayed to user so they know what question they are on
    questionNumber.text(newQuestionNumber);  // setting the number so the user can see it
    totalQuestions.text(questionsArray.length);  // setting number of total questions so the user knows when their suffering will be over
    theQuestionDescription.text(questionsArray[index].question.description);  // setting visibility of; the question description,
    theQuestionCode.text(questionsArray[index].question.codeSnippet);  // the code snippet for the question,
    option1.text(questionsArray[index].correctAnswer);  // then setting the options, this one is the correct answer,
    option2.text(questionsArray[index].wrongAnswers.option1);  // this a wrong answer,
    option3.text(questionsArray[index].wrongAnswers.option2);  // this a wrong answer,
    option4.text(questionsArray[index].wrongAnswers.option3);  // and this is the final wrong answer

    if (newQuestionNumber === questionsArray.length) {  // if the questions number we are on is the same as the number of questions,
      finishButton.removeClass('hide');  // we un-hide the "finish" button,
      nextButton.addClass('hide');  // and hide the "next" button as we have no more questions left and want to "finish" the quiz
    }

    timer.start();
  }

  function nextQuestion() {
    checkAnswer();
    populateQuestionDiv();  // next button was pressed, so we load up the next question in the array
    timer.reset();  // reset the timer for the new question
  }

  function finishQuiz() {
    checkAnswer();
    questionDiv.addClass('hide');  // hide the div containing question stuff because we don't need to see it anymore
    scoreDiv.removeClass('hide');  // un-hide the score-div, so user can access score related stuff; save name/score, see other scores
    newScoreDisplay.text(`Your score was ${score}!`);  // display the score the user just got with enthusiasm! 
    timer.stop();  // stop the timer so it isn't running in the background
    displayScores();
  }

  // Check that the users selection is correct or not
  function checkAnswer() {
    const userSelection = $("input[name='option']:checked").val();  // we assign the value of the selected answer,
    if (userSelection === "Option1") {  // check that the selection is correct, if so,
      score += 50;  // we add to the users score
    }
  }
  // EVENT LISTENERS
  startButton.on('click', function () {  // When user hits the "start quiz" button,
    startButton.addClass("hide");  // hide the start button,
    randomQuestionOrder(questionsArray);  // randomize the order of the questions,
    populateQuestionDiv();  // display first question,
  })

  nextButton.on('click', nextQuestion);  // when user clicks the Next button, run nextQuestion
  finishButton.on('click', finishQuiz);  // when user clicks the Finish button, run finishQuiz

});