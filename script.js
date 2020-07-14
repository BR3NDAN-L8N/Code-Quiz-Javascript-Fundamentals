$(document).ready(function() {
    const startButton = $('#start-quiz');
    const questionDiv = $('#question-div');
    const nextButton = $("#next-button");
    const finishButton = $("#finish-button");
    const questionNumber = $("#question-number");
    let newQuestionNumber = 1;
    const totalQuestions = $("#total-questions");
    const theQuestion = $("#question-description");
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
            question: `This is the question`,
            correctAnswer: `Correct`,
            option1: `wrong`,
            option2: `wrong`,
            option3: `wrong`
        }
    ]

    // function startQuiz() {
    //     populateQuestionDiv();
    // } 

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

    // Randomize the order of the possible answers
    function randomAnswerOrder(currentQuestion) {
        // create a random number between 0-3, for use as an index number
        const randNum = Math.floor(Math.random() * 4);
        // Firstly, assign the correct answer to a random spot in the answerOption[array]
        answerOption[randNum] = questions[questionNumber--].correctAnswer;
        // Now that we know where the correct answer is, we assign that a variable to be checked against when checking user's answer
        correctOption = randNum;
        // iterate 3 time to fill the remaining answer options in the answerOption[array]
        for (i = 0; i <= 3; i++) {
            // if this index is empty, we know the correct answer wasn't randomly put here
            // alternatively, we could have used the correctOption variable created a few lines up
            if (answerOption[i] === "") {
                // index of i puts the current answer option in this index
                index = i;
            } else {
                // index of i+1 puts current answer option in the next index
                // once this else is hit, subsequent iterations will use the else to fill the remaining indexes
                index = i++;
            }
            // the first wrong answer is at index of 2 in the question object, we iterate from that spot as the rest of the indexes are also wrong answers
            num = 2 + i;
            // set the wrong answer at index determined by whether this iteration is empty or filled, with the
            answerOption[index] = currentQuestion[num];
        }
        // returning this for future determination of user's correct choice
        return correctOption;
    }

    function populateQuestionDiv() {
        questionDiv.removeClass('hide');
        questionNumber.text(newQuestionNumber);
        
        option1.text(answerOption[0]);
        option2.text(answerOption[1]);
        option3.text(answerOption[2]);
        option4.text(answerOption[3]);
    }
            // if (answer) {
            //     if (answers[i].value === questions[0].correctAnswer){
            //         console.log(`correct!`);
            //     } else {
            //         console.log(`wrong...`);
            //     }
            // }

            startButton.on('click', function () {
                startButton.toggle(".hide");
                populateQuestionDiv();
            })
        
            nextButton.on('click', function () {
                const userSelection = $("input[name='option']:checked").val();
                console.log(userSelection);
                newQuestionNumber++;
            })
    });





// function fillQuestionContent() {

// }