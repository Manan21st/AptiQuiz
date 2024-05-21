const questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choices: ['<script>', '<css>', '<style>', '<span>'],
        answer: 2,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choices: ['text-color', 'font-color', 'text-style', 'color'],
        answer: 3,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choices: ['// Comment', '<!-- Comment -->', '/* Comment */', '<! Comment>'],
        answer: 1,
    },
];

let showQuestions;

window.onload = () => {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    startGame();
    updateHUD();
    updateProgressBar();
};

let currentQuestionIndex = 0;

function startGame() {
    currentQuestionIndex = 0;
    showQuestion();
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const buttons = document.querySelectorAll('.btn');
    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;
    buttons.forEach((button, index) => {
        button.innerText = currentQuestion.choices[index];
    });
}

let score = 0;

function updateHUD() {
    document.getElementById('question-number').innerText = `Question: ${currentQuestionIndex + 1}`;
    document.getElementById('score').innerText = `Score: ${score}`;
}

function updateProgressBar() {
    const progressElement = document.getElementById('progress');
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressElement.style.width = `${progressPercentage}%`;
}

function selectAnswer(choice) {
    const buttons = document.querySelectorAll('.btn');
    if (choice - 1 === shuffledQuestions[currentQuestionIndex].answer) {
        buttons[choice - 1].style.backgroundColor = 'green';
        score++;
    } else {
        buttons[choice - 1].style.backgroundColor = 'red';
        buttons[shuffledQuestions[currentQuestionIndex].answer].style.backgroundColor = 'green';
    }

    setTimeout(() => {
        buttons.forEach(button => button.style.backgroundColor = '');
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            updateHUD();
            updateProgressBar();
        } else {
            localStorage.setItem('score', score);
            window.location.href = 'end.html';
        }
    }, 1000);
}
