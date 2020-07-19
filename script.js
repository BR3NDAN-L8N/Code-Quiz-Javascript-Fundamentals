$(document).ready(function () {
  //  Vars linking to HTML
  const startButton = $('#start-quiz');
  const questionDiv = $('#question-div');
  const nextButton = $("#next-button");
  const finishButton = $("#finish-button");
  const questionNumber = $("#question-number");
  const totalQuestions = $("#total-questions");
  const theQuestionDescription = $("#question-description");
  const theQuestionCode = $("#question-code");
  const scoreDiv = $("#score-div");
  const option1 = $('#option1');
  const option2 = $('#option2');
  const option3 = $('#option3');
  const option4 = $('#option4');
  const newScoreDisplay = $("#new-score-display");
  const saveScoreButton = $("#save-score-button");
  const usersNameInput = $("#users-name");
  const timeDisplay = $("#time-display");
  const topScoreDisplay = $("#top-score-display");
  //  vars for storage
  const getSavedScoresLocal = JSON.parse(localStorage.getItem("userScores"));
  //  vars that change
  let newQuestionNumber = 0;
  let score = 0;



  if (!Array.isArray(getSavedScoresLocal)) {  // does an array already exist in local storage?
    getSavedScoresLocal = [];  // if not then we make it exist!
  }

  saveScoreButton.on("click", function (event) {
    event.preventDefault();
    let name = usersNameInput.val();  // temporarily storing users entered name into a var
    usersNameInput.val("");  // clearing the input field user typed their name
    const userRecordObject = {  // setting the users name and score into a new object
      name: name,
      score: score
    }
    getSavedScoresLocal.push(userRecordObject);  // adding the above new object to saved scores array
    localStorage.setItem("userScores", JSON.stringify(getSavedScoresLocal));  // setting the new array to local storage

    putOnPage();  // puts the new list of scores onto the page from local storage
  });

  function putOnPage() {

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
  
  let timerInterval;  // this is used for setting/resetting the time interval that runs the timer
  let timerRunning = false;  // this will be checked before certain timer functions happen

  
  const timer = {  // Our timer object

    time: 30,  // initiate time
    reset: function () {  // reset timer
      timer.time = 30;  // reset timer.time back to 30
      timeDisplay.text("00:30");  // reset time in the timer display
    },

    start: function () {
      // DONE: Use setInterval to start the count here and set the timer to running.
      if (!timerRunning) {
        timerInterval = setInterval(timer.count, 1000);
        timerRunning = true;
      }
    },

    stop: function () {
      clearInterval(timerInterval);  //Clear timer interval
      timerRunning = false;  // timer no longer running so set to false
    },

    count: function () {
      timer.time--;  //decrement time by 1
      timeDisplay.text(timer.timeConverter(timer.time));  // Pass the current time (timer.time) into timeConverter() and display the time
    },

    timeConverter: function (time) {
      let minutes = Math.floor(time / 60);  // time, in seconds, divided by 60 to give us number of minutes
      let seconds = time - (minutes * 60);  // multiply minutes by 60 to give it's amount of seconds, and subtract from the time we have left

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (minutes === 0) {
        minutes = `00`;
      }
      else if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      return `${minutes}:${seconds}`;
    }
  };

  let questionsArray = [
    {
      question: {
        description: `What is the output of the following code?`,
        codeSnippet: `var fruits = ["Banana", "Orange", "Apple", "Mango"]; \
                              $("output").text = fruits.sort();`
      },
      correctAnswer: `["Apple", "Banana", "Mango", "Orange"]`,
      wrongAnswers: {
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
  }

  startButton.on('click', function () {
    startButton.addClass("hide");
    randomQuestionOrder(questionsArray);
    populateQuestionDiv();
    timer.start();
  })

  nextButton.on('click', function () {
    const userSelection = $("input[name='option']:checked").val();
    if (userSelection === "option1") {
      score += 20;
      return score;
    }
    populateQuestionDiv();
    timer.reset();
  })

  finishButton.on('click', function () {
    questionDiv.addClass('hide');
    scoreDiv.removeClass('hide');
    newScoreDisplay.text(`Your score was ${score}!`);
    timer.stop();

  })


});