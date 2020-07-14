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
    let answerOption = ["Option1", "Option2", "Option3", "Option4"];
    const option1 = $('#option1');
    const option2 = $('#option2');
    const option3 = $('#option3');
    const option4 = $('#option4');
    let correctOption = 0;

    let questions = [
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

    function startQuiz() {
        randomQuestionOrder(questions);
        populateQuestionDiv();
    } 

    // Randomize the order of the questions in the questions[array]
    function randomQuestionOrder(questions) {
        for (i = 0; i < questions.length; i++) {
            // Take questions object at questions index i and temporarily hold it in tempObject
            let tempObject = questions[i];
            // take this random number from 0 to max length of questions array... and
            let randomIndex = Math.floor(Math.random() * questions.length);
            // and take that index of questions and assign it in the place we took this iteration from... then
            questions[i] = questions[randomIndex];
            // then we take this iteration's index value and plug it in where we took the random index from
            questions[randomIndex] = tempObject;
        }
    }

    function populateQuestionDiv() {
        questionDiv.removeClass('hide');
        let index = newQuestionNumber;
        newQuestionNumber++;
        questionNumber.text(newQuestionNumber);
        totalQuestions.text(questions.length);

        theQuestionDescription.text(questions[index].question.description);
        theQuestionCode.text(questions[index].question.codeSnippet);
        option1.text(questions[index].correctAnswer);
        option2.text(questions[index].wrongAnswers.option1);
        option3.text(questions[index].wrongAnswers.option2);
        option4.text(questions[index].wrongAnswers.option3);

        if (newQuestionNumber === questions.length) {
            finishButton.removeClass('hide');
            nextButton.addClass('hide');
        }
    }

    startButton.on('click', function () {
        startButton.addClass("hide");
        startQuiz();
    })

    nextButton.on('click', function () {
        const userSelection = $("input[name='option']:checked").val();
        console.log(userSelection);
        populateQuestionDiv();
        
    })

    finishButton.on('click', function () {
        questionDiv.addClass('hide');
        scoreDiv.removeClass('hide');
    })
});





// function fillQuestionContent() {

// }