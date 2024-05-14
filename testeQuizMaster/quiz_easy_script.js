const easyQuestions = [
    {
        question: "Qual é a capital do Brasil?",
        options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        answer: "Brasília",
        hint: "Foi inaugurada em 21 de abril de 1960 e é conhecida por sua arquitetura modernista."
    },
    {
        question: "Quantos meses têm um ano?",
        options: ["10 meses", "11 meses", "12 meses", "13 meses"],
        answer: "12 meses",
        hint: "A contagem tradicional de meses em um ano é de 12."
    },
    {
        question: "Quantos lados tem um triângulo?",
        options: ["Dois lados", "Três lados", "Quatro lados", "Cinco lados"],
        answer: "Três lados",
        hint: "É uma figura geométrica que possui três segmentos de reta."
    },
    {
        question: "Qual é a cor do céu em um dia claro?",
        options: ["Vermelho", "Verde", "Azul", "Amarelo"],
        answer: "Azul",
        hint: "Durante o dia, a luz do sol é espalhada no céu, resultando na cor azul."
    },
    {
        question: "Quantos dias tem uma semana?",
        options: ["5 dias", "6 dias", "7 dias", "8 dias"],
        answer: "7 dias",
        hint: "A semana é composta por sete dias."
    },
    {
        question: "Qual é o animal que é conhecido por ter uma tromba?",
        options: ["Elefante", "Leão", "Tigre", "Girafa"],
        answer: "Elefante",
        hint: "É um mamífero terrestre com uma característica tromba alongada."
    },
    {
        question: "Quem pintou a 'Mona Lisa'?",
        options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
        answer: "Leonardo da Vinci",
        hint: "É uma das pinturas mais famosas do mundo, retratando uma mulher com um sorriso enigmático."
    },
    {
        question: "Quantas patas tem um gato?",
        options: ["2 patas", "4 patas", "6 patas", "8 patas"],
        answer: "4 patas",
        hint: "É um animal quadrúpede, o que significa que tem quatro patas."
    },
    {
        question: "Qual é o oposto de 'quente'?",
        options: ["Gelado", "Frio", "Morno", "Caloroso"],
        answer: "Frio",
        hint: "É uma sensação térmica associada à baixa temperatura."
    },
    {
        question: "Quantos dedos têm em uma mão?",
        options: ["3 dedos", "4 dedos", "5 dedos", "6 dedos"],
        answer: "5 dedos",
        hint: "Normalmente, uma mão humana tem cinco dedos."
    }
];

let easyCurrentQuestion = 0;
let easyScore = 0;
let easyTimerValue = 10;
let easyTimerInterval;

const easyQuestionElement = document.getElementById("easy-question");
const easyOptionsElement = document.getElementById("easy-options");
const easyHintElement = document.getElementById("easy-hint");
const easyFeedbackElement = document.getElementById("easy-feedback");
const easyScoreValueElement = document.getElementById("easy-score-value");
const easyTimerValueElement = document.getElementById("easy-timer-value");
const easyNextButton = document.getElementById("easy-next-button");
const easyRestartButton = document.getElementById("easy-restart-button");

function easyDisplayQuestion() {
    const currentQuizData = easyQuestions[easyCurrentQuestion];
    easyQuestionElement.textContent = currentQuizData.question;
    easyOptionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => easyCheckAnswer(option));
        easyOptionsElement.appendChild(button);
    });
}

function easyCheckAnswer(selectedOption) {
    clearInterval(easyTimerInterval);
    const currentQuizData = easyQuestions[easyCurrentQuestion];
    if (selectedOption === currentQuizData.answer) {
        easyFeedbackElement.textContent = "Resposta correta!";
        easyScore++;
    } else {
        easyFeedbackElement.textContent = "Resposta incorreta! A resposta correta é: " + currentQuizData.answer;
    }
    easyScoreValueElement.textContent = easyScore;
    easyShowNextButton();
}

function easyStartTimer() {
    let timeLeft = easyTimerValue;
    easyTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
    easyTimerInterval = setInterval(() => {
        timeLeft--;
        easyTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(easyTimerInterval);
            easyFeedbackElement.textContent = "Tempo esgotado!";
            easyShowNextButton();
        }
    }, 1000);
}

function easyShowHint() {
    const currentQuizData = easyQuestions[easyCurrentQuestion];
    easyHintElement.textContent = "Dica: " + currentQuizData.hint;
}

function easyShowNextButton() {
    easyNextButton.style.display = "inline-block";
}

function easyShowNextQuestion() {
    easyCurrentQuestion++;
    if (easyCurrentQuestion < easyQuestions.length) {
        easyDisplayQuestion();
        easyStartTimer();
        easyNextButton.style.display = "none";
    } else {
        clearInterval(easyTimerInterval);
        easyFeedbackElement.textContent = "Quiz finalizado!";
        easyOptionsElement.innerHTML = "";
        easyHintElement.textContent = "";
        easyNextButton.style.display = "none";
        easyRestartButton.style.display = "inline-block";
    }
}

function easyStartQuiz() {
    easyCurrentQuestion = 0;
    easyScore = 0;
    easyDisplayQuestion();
    easyStartTimer();
    easyRestartButton.style.display = "none";
}

easyNextButton.addEventListener("click", easyShowNextQuestion);
easyRestartButton.addEventListener("click", easyStartQuiz);

easyDisplayQuestion();
easyStartTimer();