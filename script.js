const startButton = document.querySelector('#start-quiz');
const questionDiv = document.querySelector('#question-div');
const nextButton = document.querySelector("#next-button");
const finishButton = document.querySelector("#finish-button");

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

function startQuiz() {
    createQuestionDiv();
} 

function createQuestionDiv() {
    let questionNumber = 1;
    let answerOption = ["Option1", "Option2", "Option3", "Option4"];

    questionDiv.innerHTML = 
    `
    <div id="question-div">
            <div class="card">
                <div class="card-title">Question ${questionNumber} of ${questions.length}</div>
                <div class="card-body">

                    <p><strong>${questions[0].question}</strong></p>
                    <form>
                        <label for="option"><input type="radio" name="option" id="option"> <strong>A:</strong> ${questions[0].correctAnswer}</label>
                        <br />
                        <label for="option"><input type="radio" name="option" id="option"> <strong>B:</strong> ${questions[0].option1}</label>
                        <br />
                        <label for="option"><input type="radio" name="option" id="option"> <strong>C:</strong> ${questions[0].option2}</label>
                        <br />
                        <label for="option"><input type="radio" name="option" id="option"> <strong>D:</strong> ${questions[0].option3}</label>
                        <br />
                        <button class="btn btn-dark" type="button" id="next-button" onclick="checkAnswers()">Next ></button>
                        <button class="btn btn-dark hide" id="finish-button">Finish</button>
                    </form>
                </div>
    `;
    // window.onload = function () {
    //     nextButton.addEventListener('click', function (e) {
    //         checkAnswers();
    //     })
    // }
    
    
}




function checkAnswers() {
    const answer = document.input.namedItem('option');
    console.log(`answer that was checked was ${answer}`);
        // if (answer) {
        //     if (answers[i].value === questions[0].correctAnswer){
        //         console.log(`correct!`);
        //     } else {
        //         console.log(`wrong...`);
        //     }
        // }
}


startButton.addEventListener('click', function (e) {
    startButton.classList.toggle("hide");
    startQuiz();
})



// function fillQuestionContent() {

// }