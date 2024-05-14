const hardQuestions = [
    {
        question: "Qual é o menor osso do corpo humano?",
        options: ["Martelo", "Estribo", "Bigorna", "Cóclea"],
        answer: "Estribo",
        hint: "Localizado no ouvido médio, é aproximadamente do tamanho de um grão de arroz."
    },
    {
        question: "Qual é a velocidade da luz no vácuo?",
        options: ["300.000 km/s", "200.000 km/s", "400.000 km/s", "500.000 km/s"],
        answer: "300.000 km/s",
        hint: "É uma constante fundamental da física, representada pela letra 'c'."
    },
    {
        question: "Quem foi o primeiro cientista a formular a teoria da relatividade?",
        options: ["Albert Einstein", "Isaac Newton", "Galileu Galilei", "Niels Bohr"],
        answer: "Albert Einstein",
        hint: "Sua teoria revolucionou nossa compreensão do espaço, tempo e gravidade."
    },
    {
        question: "Qual é a maior espécie de tubarão?",
        options: ["Tubarão-baleia", "Tubarão-branco", "Tubarão-martelo", "Tubarão-frade"],
        answer: "Tubarão-baleia",
        hint: "É conhecido por ser o maior peixe do mundo, podendo atingir mais de 12 metros de comprimento."
    },
    {
        question: "Qual é o animal mais rápido do mundo?",
        options: ["Leopardo", "Peregrine Falcon", "Guepardo", "Antílope-saiga"],
        answer: "Peregrine Falcon",
        hint: "É conhecido por suas incríveis velocidades em mergulho, podendo superar 300 km/h."
    },
    {
        question: "Quem descobriu a penicilina?",
        options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Robert Koch"],
        answer: "Alexander Fleming",
        hint: "Sua descoberta revolucionou o tratamento de infecções bacterianas."
    },
    {
        question: "Qual é o elemento químico mais abundante na crosta terrestre?",
        options: ["Ferro", "Oxigênio", "Silício", "Alumínio"],
        answer: "Oxigênio",
        hint: "É um elemento essencial para a vida na Terra e é encontrado em diversos compostos."
    },
    {
        question: "Quantos ossos tem o corpo humano?",
        options: ["206", "208", "210", "212"],
        answer: "206",
        hint: "O número de ossos pode variar de pessoa para pessoa devido à fusão de alguns ossos durante o desenvolvimento."
    },
    {
        question: "Qual é o valor aproximado de π (pi)?",
        options: ["3.14", "3.141", "3.1415", "3.14159"],
        answer: "3.14159",
        hint: "É uma constante matemática que representa a relação entre a circunferência de um círculo e seu diâmetro."
    },
    {
        question: "Qual é o músculo mais forte do corpo humano em proporção ao seu tamanho?",
        options: ["Masseter", "Glúteo máximo", "Psoas", "Quadríceps"],
        answer: "Masseter",
        hint: "É um dos músculos responsáveis pela mastigação e está localizado na mandíbula."
    }
];

let hardCurrentQuestion = 0;
let hardScore = 0;
let hardTimerValue = 30;
let hardTimerInterval;

const hardQuestionElement = document.getElementById("hard-question");
const hardOptionsElement = document.getElementById("hard-options");
const hardHintElement = document.getElementById("hard-hint");
const hardFeedbackElement = document.getElementById("hard-feedback");
const hardScoreValueElement = document.getElementById("hard-score-value");
const hardTimerValueElement = document.getElementById("hard-timer-value");
const hardNextButton = document.getElementById("hard-next-button");
const hardRestartButton = document.getElementById("hard-restart-button");

function hardDisplayQuestion() {
    const currentQuizData = hardQuestions[hardCurrentQuestion];
    hardQuestionElement.textContent = currentQuizData.question;
    hardOptionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => hardCheckAnswer(option));
        hardOptionsElement.appendChild(button);
    });
}

function hardCheckAnswer(selectedOption) {
    clearInterval(hardTimerInterval);
    const currentQuizData = hardQuestions[hardCurrentQuestion];
    if (selectedOption === currentQuizData.answer) {
        hardFeedbackElement.textContent = "Resposta correta!";
        hardScore++;
    } else {
        hardFeedbackElement.textContent = "Resposta incorreta! A resposta correta é: " + currentQuizData.answer;
    }
    hardScoreValueElement.textContent = hardScore;
    hardShowNextButton();
}

function hardStartTimer() {
    let timeLeft = hardTimerValue;
    hardTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
    hardTimerInterval = setInterval(() => {
        timeLeft--;
        hardTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(hardTimerInterval);
            hardFeedbackElement.textContent = "Tempo esgotado!";
            hardShowNextButton();
        }
    }, 1000);
}

function hardShowHint() {
    const currentQuizData = hardQuestions[hardCurrentQuestion];
    hardHintElement.textContent = "Dica: " + currentQuizData.hint;
}

function hardShowNextButton() {
    hardNextButton.style.display = "inline-block";
}

function hardShowNextQuestion() {
    hardCurrentQuestion++;
    if (hardCurrentQuestion < hardQuestions.length) {
        hardDisplayQuestion();
        hardStartTimer();
        hardNextButton.style.display = "none";
    } else {
        clearInterval(hardTimerInterval);
        hardFeedbackElement.textContent = "Quiz finalizado!";
        hardOptionsElement.innerHTML = "";
        hardHintElement.textContent = "";
        hardNextButton.style.display = "none";
        hardRestartButton.style.display = "inline-block";
    }
}

function hardStartQuiz() {
    hardCurrentQuestion = 0;
    hardScore = 0;
    hardDisplayQuestion();
    hardStartTimer();
    hardRestartButton.style.display = "none";
}

hardNextButton.addEventListener("click", hardShowNextQuestion);
hardRestartButton.addEventListener("click", hardStartQuiz);

hardDisplayQuestion();
hardStartTimer();