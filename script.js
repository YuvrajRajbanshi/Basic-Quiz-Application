const questions = [
    {
        questions: "which is largest animal in the world",
        answer: [
            { text: "shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false }
        ]
    },
    {
        questions: "Which is the good smallest country",
        answer: [
            { text: "Nepal", correct: false },
            { text: "Taiwan", correct: false },
            { text: "Bhutan", correct: false },
            { text: "None of these", correct: true }
        ]
    },
    {
        questions: "which one is not a programing language ",
        answer: [
            { text: "HTML", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        questions: "Which is city is capital of karnataka",
        answer: [
            { text: "Delhi", correct: false },
            { text: "Hydrabad", correct: false },
            { text: "Bangalore", correct: true },
            { text: "Chennai", correct: false }
        ]
    }
]




const questionElement = document.getElementById("question")
const answerButton = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();

}

function showQuestion() {

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text

        button.classList.add("btn")
        answerButton.appendChild(button)

        if (answer.correct) {
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer)
    })

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";

    if (isCorrect) {
        selectBtn.classList.add("correct")
        score++;

    }
    else {
        selectBtn.classList.add("incorrect")
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"


}
function showScore() {
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again";

    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore()
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }

})

startQuiz()