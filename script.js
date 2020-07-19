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

    // Checks to see if the todolist exists in localStorage and is an array currently
    // If not, set a local list variable to an empty array
    // Otherwise list is our current list of todos
    if (!Array.isArray(savedScoresLocal)) {
      savedScoresLocal = [];
    }

    $("input[type='submit']").on("click", function(event) {
        event.preventDefault();
        // Setting the input value to a variable and then clearing the input
        var val = $("input[type='text']").val();
        $("input[type='text']").val("");
        var userRecordObject={
            name:val,
            score:score
        }
  
        // Adding our new todo to our local list variable and adding it to local storage
        savedScoresLocal.push(userRecordObject);
        localStorage.setItem("userScores", JSON.stringify(savedScoresLocal));
        console.log(" List Array: "+ savedScoresLocal)
  
        putOnPage();
      });

      function putOnPage() 
      {
  
      $("#user-score-display").empty(); // empties out the html
  
        var insideList = JSON.parse(localStorage.getItem("userScores"));
  
        // Checks to see if we have any todos in localStorage
        // If we do, set the local insideList variable to our todos
        // Otherwise set the local insideList variable to an empty array
        if (!Array.isArray(insideList)) {
          insideList = [];
        }
  
        // if(localStorage.getItem("completedlist").length){
        //   console.log("there is a val!");
        // }
        // else{
        //   console.log("there is no completedlist");
        // }
      
  
        // render our insideList todos to the page
        for (var i = 0; i < insideList.length; i++) {
          var p = $("<p>").text(insideList[i].name + " "+ insideList[i].score);
          //var b = $("<button class='delete'>").text("x").attr("data-index", i);
          
  
          //paragraph area, we are going to stick the button area (button area before the paragraph area = prepend)
  
          //prepend = we stick the button area to the paragraph area
          //p.prepend(b);
  
          //append = inside paragraph area we stick the button.
          //p.append(b);
          $("#user-score-display").prepend(p);
        }
      }
  
      

    window.onload = function() 
{
  $("#loseTime").on("click", stopwatch.loseTime);
  $("#stop").on("click", stopwatch.stop);
  $("#reset").on("click", stopwatch.reset);
  $("#start").on("click", stopwatch.start);
};

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = 
{

  time: 5, //reset time


  reset: function() 
  {

    stopwatch.time = 5;     //reset time

    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:05"); //reset time


  },

  start: function() 
  {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  stop: function() 
  {

    // DONE: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
  },
  loseTime: function() 
  {
      // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time-=10;
    //console.log("time: "+stopwatch.time)

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);

  },
  count: function() 
  {

    // DONE: increment time by 1, remember we cant use "this" here.
    stopwatch.time--;
    //console.log("time: "+stopwatch.time)

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.
    var converted = stopwatch.timeConverter(stopwatch.time);
    console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },
  timeConverter: function(t) 
  {
    //t=1
    //min0
    //min=00
    //sec1
    //sec=01
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};

    let questionsArray = [
        // {    // created question template
        //     "question": `${createdQuestion}`,
        //     "correctAnswer": `${createdCorrectAnswer}`,
        //     "option1": `${createdOption1}`,
        //     "option2": `${createdOption2}`,
        //     "option3": `${createdOption3}`
        // },
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
            // Take questions object at questionsArray index i and temporarily hold it in tempObject
            let tempObject = questionsArray[i];
            // take this random number from 0 to max length of questionsArray array... and
            let randomIndex = Math.floor(Math.random() * questionsArray.length);
            // and take that index of questionsArray and assign it in the place we took this iteration from... then
            questionsArray[i] = questionsArray[randomIndex];
            // then we take this iteration's index value and plug it in where we took the random index from
            questionsArray[randomIndex] = tempObject;
        }
    }

    function populateQuestionDiv() {
        questionDiv.removeClass('hide');
        let index = newQuestionNumber;
        newQuestionNumber++;
        questionNumber.text(newQuestionNumber);
        totalQuestions.text(questionsArray.length);

        theQuestionDescription.text(questionsArray[index].question.description);
        theQuestionCode.text(questionsArray[index].question.codeSnippet);
        option1.text(questionsArray[index].correctAnswer);
        option2.text(questionsArray[index].wrongAnswers.option1);
        option3.text(questionsArray[index].wrongAnswers.option2);
        option4.text(questionsArray[index].wrongAnswers.option3);

        if (newQuestionNumber === questionsArray.length) {
            finishButton.removeClass('hide');
            nextButton.addClass('hide');
        }
    }

    startButton.on('click', function () {
        startButton.addClass("hide");
        randomQuestionOrder(questionsArray);
        populateQuestionDiv();
    })

    nextButton.on('click', function () {
        const userSelection = $("input[name='option']:checked").val();
        if (userSelection === "option1") {
            score += 20;
            return score;
        }
        populateQuestionDiv();
        
    })

    finishButton.on('click', function () {
        questionDiv.addClass('hide');
        scoreDiv.removeClass('hide');
        newScoreDisplay.text(`Your score was ${score}!`);

    })

    
});





// function fillQuestionContent() {

// }