$(document).ready(function () {
  const startButton = $('#start-quiz');
  const questionDiv = $('#question-div');
  const nextButton = $("#next-button");
  const finishButton = $("#finish-button");
  const questionNumber = $("#question-number");
  let newQuestionNumber = 0;
  const totalQuestions = $("#total-questions");
  const theQuestionDescription = $("#question-description");
  const theQuestionCode = $("#question-code");
  const scoreDiv = $("#score-div");
  // let answerOption = ["Option1", "Option2", "Option3", "Option4"];
  const option1 = $('#option1');
  const option2 = $('#option2');
  const option3 = $('#option3');
  const option4 = $('#option4');
  // let correctOption = 0;
  let score = 0;
  let newScoreDisplay = $("#new-score-display");
  var savedScoresLocal = JSON.parse(localStorage.getItem("userScores"));

  const timeDisplay = $("#time-display");

  // Checks to see if the todolist exists in localStorage and is an array currently
  // If not, set a local list variable to an empty array
  // Otherwise list is our current list of todos
  if (!Array.isArray(savedScoresLocal)) {
    savedScoresLocal = [];
  }

  $("input[type='submit']").on("click", function (event) {
    event.preventDefault();
    // Setting the input value to a variable and then clearing the input
    var val = $("input[type='text']").val();
    $("input[type='text']").val("");
    var userRecordObject = {
      name: val,
      score: score
    }

    // Adding our new todo to our local list variable and adding it to local storage
    savedScoresLocal.push(userRecordObject);
    localStorage.setItem("userScores", JSON.stringify(savedScoresLocal));
    console.log(" List Array: " + savedScoresLocal)

    putOnPage();
  });

  function putOnPage() {

    $("#user-score-display").empty(); // empties out the html

    var insideList = JSON.parse(localStorage.getItem("userScores"));

    // Checks to see if we have any todos in localStorage
    // If we do, set the local insideList variable to our todos
    // Otherwise set the local insideList variable to an empty array
    if (!Array.isArray(insideList)) {
      insideList = [];
    }
    // render our insideList todos to the page
    for (let i = 0; i < insideList.length; i++) {
      const p = $("<p>").text(insideList[i].name + " " + insideList[i].score);
      //var b = $("<button class='delete'>").text("x").attr("data-index", i);


      //paragraph area, we are going to stick the button area (button area before the paragraph area = prepend)

      //prepend = we stick the button area to the paragraph area
      //p.prepend(b);

      //append = inside paragraph area we stick the button.
      //p.append(b);
      $("#user-score-display").prepend(p);
    }
  }
  
  var timerInterval;  // this is used for setting/resetting the time interval that runs the timer
  var timerRunning = false;  // this will be checked before certain timer functions happen

  
  const timer = {  // Our timer object

    time: 30,  // initiate time
    reset: function () {
      timer.time = 30;  // reset time in timer
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

  function populateQuestionDiv() {
    questionDiv.removeClass('hide');  // div for questions is hidden by default, unhide it
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
      finishButton.removeClass('hide');  // we unhide the "finish" button,
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