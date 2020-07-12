const startButton = document.querySelector('#start-quiz');
const questionDiv = document.querySelector('#question-div');
const nextButton = document.querySelector("#next-button");
const finishButton = document.querySelector("#finish-button");



function startQuiz() {
    createQuestionDiv();
} 

function createQuestionDiv() {
    let questionNumber = 0;
    let totalQuestions = 0;
    let answerOption = ["Q1", "Q2", "Q3", "Q4"];

    questionDiv.innerHTML = 
    `
    <div id="question-div">
            <div class="card">
                <div class="card-title">Question ${questionNumber} of ${totalQuestions}</div>
                <div class="card-body">
                    
                    <label for="question1"><input type="radio" name="question1" id="question-1"> ${answerOption[0]}</label>
                    <br />
                    <label for="question2"><input type="radio" name="question2" id="question-2"> ${answerOption[1]}</label>
                    <br />
                    <label for="question3"><input type="radio" name="question3" id="question-3"> ${answerOption[2]}</label>
                    <br />
                    <label for="question4"><input type="radio" name="question4" id="question-4"> ${answerOption[3]}</label>
                    <br />
                    <button class="btn btn-dark" type="submit" id="next-button">Next ></button>
                    <button class="btn btn-dark hide" id="finish-button">Finish</button>
                    
                </div>
    `;

}


startButton.addEventListener('click', function(e) {
    startButton.classList.toggle("hide");
    startQuiz();
})
