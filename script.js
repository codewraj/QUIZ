const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the capital of Italy?",
        options: ["Paris", "Lisbon", "Rome", "Athens"],
        answer: "Rome"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const nextButton = document.querySelector('.next-button');
const submitButton = document.querySelector('.submit-button');
const resetButton = document.querySelector('.reset-button');
const scoreElement = document.querySelector('.score');
const completionMessage = document.querySelector('.completion-message');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.onclick = () => selectAnswer(option);
        optionsElement.appendChild(button);
    });

    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
}

function selectAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');

    options.forEach(option => {
        option.classList.remove('selected');
        if (option.textContent === selectedOption) {
            option.classList.add('selected');
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    nextButton.style.display = 'block';

    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'block';
    }
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
};

submitButton.onclick = () => {
    scoreElement.textContent = `Your score: ${score}/${questions.length}`;
    completionMessage.textContent = "Quiz completed! Thank you for participating.";
    nextButton.style.display = 'none';
    submitButton.style.display = 'none';
};

resetButton.onclick = () => {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = '';
    completionMessage.textContent = '';
    loadQuestion();
};

loadQuestion();
