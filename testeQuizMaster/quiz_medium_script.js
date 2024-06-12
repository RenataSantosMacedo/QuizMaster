const mediumQuestions = [
    {
        question: "Quem escreveu 'Dom Quixote'?",
        options: ["Miguel de Cervantes", "William Shakespeare", "Fyodor Dostoevsky", "Charles Dickens"],
        answer: "Miguel de Cervantes",
        hint: "É considerada uma das obras mais importantes da literatura espanhola."
    },
    {
        question: "Qual é o maior rio do mundo em volume de água?",
        options: ["Rio Amazonas", "Rio Nilo", "Rio Yangtzé", "Rio Mississipi"],
        answer: "Rio Amazonas",
        hint: "Localizado na América do Sul, é conhecido por sua vasta bacia hidrográfica."
    },
    {
        question: "Qual é o segundo maior país do mundo em área territorial?",
        options: ["Estados Unidos", "China", "Canadá", "Rússia"],
        answer: "Canadá",
        hint: "Localizado na América do Norte, é conhecido por suas vastas paisagens naturais."
    },
    {
        question: "Quem foi o primeiro homem a pisar na Lua?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
        answer: "Neil Armstrong",
        hint: "Ele proferiu a famosa frase 'Este é um pequeno passo para o homem, um salto gigantesco para a humanidade'."
    },
    {
        question: "Qual é o elemento mais abundante na crosta terrestre?",
        options: ["Ferro", "Oxigênio", "Silício", "Alumínio"],
        answer: "Oxigênio",
        hint: "É um elemento essencial para a vida na Terra e é encontrado em diversos compostos."
    },
    {
        question: "Em que ano terminou a Segunda Guerra Mundial?",
        options: ["1943", "1944", "1945", "1946"],
        answer: "1945",
        hint: "O conflito terminou com a rendição do Japão após o lançamento das bombas atômicas em Hiroshima e Nagasaki."
    },
    {
        question: "Qual é o símbolo químico do ouro?",
        options: ["Ag", "Au", "Fe", "Cu"],
        answer: "Au",
        hint: "É um metal precioso conhecido por sua alta densidade e brilho característico."
    },
    {
        question: "Quem escreveu 'O Morro dos Ventos Uivantes'?",
        options: ["Emily Brontë", "Charlotte Brontë", "Jane Austen", "Charles Dickens"],
        answer: "Emily Brontë",
        hint: "É um romance clássico da literatura inglesa do século XIX."
    },
    {
        question: "Qual é o maior deserto do mundo?",
        options: ["Deserto do Saara", "Deserto de Gobi", "Deserto da Arábia", "Deserto da Antártida"],
        answer: "Deserto do Saara",
        hint: "Localizado no norte da África, é conhecido por sua vastidão e calor extremo."
    },
    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "James Madison"],
        answer: "George Washington",
        hint: "Ele serviu como presidente de 1789 a 1797 e é considerado um dos Pais Fundadores dos Estados Unidos."
    }
];

let mediumCurrentQuestion = 0;
let mediumScore = 0;
let mediumTimerValue = 20;
let mediumTimerInterval;

const mediumQuestionElement = document.getElementById("medium-question");
const mediumOptionsElement = document.getElementById("medium-options");
const mediumHintElement = document.getElementById("medium-hint");
const mediumFeedbackElement = document.getElementById("medium-feedback");
const mediumScoreValueElement = document.getElementById("medium-score-value");
const mediumTimerValueElement = document.getElementById("medium-timer-value");
const mediumNextButton = document.getElementById("medium-next-button");
const mediumRestartButton = document.getElementById("medium-restart-button");

function mediumDisplayQuestion() {
    const currentQuizData = mediumQuestions[mediumCurrentQuestion];
    mediumQuestionElement.textContent = currentQuizData.question;
    mediumOptionsElement.innerHTML = "";
    currentQuizData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.addEventListener("click", () => mediumCheckAnswer(option));
        mediumOptionsElement.appendChild(button);
    });
}

function mediumCheckAnswer(selectedOption) {
    clearInterval(mediumTimerInterval);
    const currentQuizData = mediumQuestions[mediumCurrentQuestion];
    if (selectedOption === currentQuizData.answer) {
        mediumFeedbackElement.textContent = "Resposta correta!";
        mediumScore++;
    } else {
        mediumFeedbackElement.textContent = "Resposta incorreta! A resposta correta é: " + currentQuizData.answer;
    }
    mediumScoreValueElement.textContent = mediumScore;
    mediumDisableOptions();
    mediumShowNextButton();
}

function mediumDisableOptions() {
    const buttons = mediumOptionsElement.querySelectorAll("button")
    buttons.forEach(button => {
        button.disabled = true;//correção do looping de pontuação 

    });
}

function mediumStartTimer() {
    let timeLeft = mediumTimerValue;
    mediumTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
    mediumTimerInterval = setInterval(() => {
        timeLeft--;
        mediumTimerValueElement.textContent = "Tempo restante: " + timeLeft + "s";
        if (timeLeft <= 0) {
            clearInterval(mediumTimerInterval);
            mediumFeedbackElement.textContent = "Tempo esgotado!";
            mediumDisableOptions();
            mediumShowNextButton();
        }
    }, 1000);
}

function mediumShowNextButton() {
    mediumNextButton.style.display = "inline-block";
}

function mediumShowHint() {
    const currentQuizData = mediumQuestions[mediumCurrentQuestion];
    mediumHintElement.textContent = "Dica: " + currentQuizData.hint;
    mediumHintElement.style.color = "white";
    mediumHintElement.style.fontSize = "16px";
}

function mediumShowNextQuestion() {
    mediumCurrentQuestion++;
    if (mediumCurrentQuestion < mediumQuestions.length) {
        mediumDisplayQuestion();
        mediumStartTimer();
        mediumNextButton.style.display = "none";
        mediumFeedbackElement.textContent = "";
        mediumHintElement.textContent = "";
    } else {
        clearInterval(mediumTimerInterval);
        mediumFeedbackElement.textContent = "Quiz finalizado!";
        mediumOptionsElement.innerHTML = "";
        mediumHintElement.textContent = "";
        mediumNextButton.style.display = "none";
        mediumRestartButton.style.display = "inline-block";
    }
}

function mediumStartQuiz() {
    mediumCurrentQuestion = 0;
    mediumScore = 0;
    mediumScoreValueElement.textContent = mediumScore; //atualiza a pontuação
    mediumFeedbackElement.textContente = "", 
    mediumHintElement,textContent = "";
    mediumDisplayQuestion();
    mediumStartTimer();
    mediumRestartButton.style.display = "none";
}

mediumNextButton.addEventListener("click", mediumShowNextQuestion);
mediumRestartButton.addEventListener("click", mediumStartQuiz);

mediumDisplayQuestion();
mediumStartTimer(); 