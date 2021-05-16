// Selecting all required elements
const startBtn = document.querySelector(".startBtn button");
const infoBox = document.querySelector(".infoBox");
const exitBtn = infoBox.querySelector(".buttons .quitBtn");
const continueBtn = infoBox.querySelector(".buttons .restartBtn");
const quizBox = document.querySelector(".quizBox");
const resultBox = document.querySelector(".resultBox");
const optionList = document.querySelector(".optionList");
const timeLine = document.querySelector("header .timeLine");
const timeText = document.querySelector(".timer .timeLeft");
const timeCount = document.querySelector(".timer .timeSec");

// If start Quiz Button Clicked
startBtn.onclick = ()=> {
    infoBox.classList.add("activeInfo"); //show the info box
}

// If exit Quiz Button Clicked
exitBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo"); //hide the info box
}

// If continue Quiz Button Clicked
continueBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo"); //hide the info box
    quizBox.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); // calling show questions function
    queCounter(1); // passing 1 parameter to queCounter
    startTimer(15); // calling startTimer function
    startTimerLine(0); // calling startTimerLine function 
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

// If restartQuiz button clicked
restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

// If quitQuiz button clicked
quitQuiz.onclick = ()=> {
    window.location.reload();
}

const nextBtn = document.querySelector("footer .nextBtn");
const bottom_ques_counter = document.querySelector("footer .totalQue");

// If RestartQuiz button clicked 
nextBtn.onclick = ()=>{
    if (que_count < questions.length -1){
        que_count++;
        que_numb++;
        showQuestions (que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    }
    else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// Getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    // creating a new span and div tag for questions and options passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] +'</span></div'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag;

    const option = optionList.querySelector(".option");

    // Set onclick attribute to all available options
    for (i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionsSelected");
    }
}

// Creating the new div tags which for icons
let tickIcontag = '<div class="icon tick"><i class="fas fa check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times></i></div>';

// If user clicked an option
function optionsSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = optionList.children.length;

    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcontag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for (i=0; i < allOptions; i++) {
            if (optionList.childrem[i].textContent == correctAns) {
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcontag);
                console.log("Auto seleced correct answer.")
            }
        }
    }
    for (i=0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.classList.add("show");
} 

