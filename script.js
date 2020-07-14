$(document).ready(function() {
    const startButton = $('#start-quiz');
    const questionDiv = $('#question-div');
    const nextButton = $("#next-button");
    const finishButton = $("#finish-button");
    const questionNumber = $("#question-number");
    let newQuestionNumber = 0;
    const totalQuestions = $("#total-questions");
    const theQuestion = $("#question-description");
    const option1 = $('#option1');
    const option2 = $('#option2');
    const option3 = $('#option3');
    const option4 = $('#option4');

    let questions = [
        // {
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

    function populateQuestionDiv() {
        questionDiv.removeClass('hide');
        questionNumber.text(newQuestionNumber);
        let answerOption = ["Option1", "Option2", "Option3", "Option4"];
        
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