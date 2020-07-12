startButton = document.querySelector('#start-quiz');
questionDiv = document.querySelector('#question-div');


function startQuiz 

function createQuestionDiv() {
    questionDiv.innerHTML = 
    `
    <div id="question-div">
            <div class="card">
                <div class="card-title">Question ${questionNumber} of ${totalQuestions}</div>
                <div class="card-body">
                    
                    <label for="question1"><input type="radio" name="question1" id="question-1"> ${quesiton}</label>
                    <br />
                    <label for="question2"><input type="radio" name="question2" id="question-2"> ${question}</label>
                    <br />
                    <label for="question3"><input type="radio" name="question3" id="question-3"> ${question}</label>
                    <br />
                    <label for="question4"><input type="radio" name="question4" id="question-4"> ${question}</label>
                    <br />
                    <button class="btn btn-dark" type="submit" id="next-button">Next ></button>
                    <button class="btn btn-dark" id="finish-button">Finish</button>
                    
                </div>
    
    
    
    `
}


startButton.addEventListener('click', function(e) {
    startButton.style.visibility = "hidden";
    startQuiz();
})
