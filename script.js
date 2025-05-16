let currentPlayer = "X";
let currentBtn = null;
let correctAnswer = "";
let gameOver = false;
let timer;
const timeLimit = 15;

const allQuestions = [
    { q: "What is the output of: cout << 3+4;", options: ["34", "7", "3+4", "Error"], answer: "7" },
    { q: "Which keyword is used to define a constant?", options: ["const", "let", "final", "static"], answer: "const" },
    { q: "What is the extension of a C++ file?", options: [".c", ".cpp", ".java", ".py"], answer: ".cpp" },
    { q: "Which library is used for input/output?", options: ["iostream", "fstream", "iomanip", "stdlib"], answer: "iostream" },
    { q: "How do you start a comment?", options: ["//", "/*", "--", "#"], answer: "//" },
    { q: "Which of these is a loop?", options: ["if", "switch", "for", "goto"], answer: "for" },
    { q: "Which data type holds a decimal?", options: ["int", "char", "float", "bool"], answer: "float" },
    { q: "Which operator is used for comparison?", options: ["=", "==", ">=", "!"], answer: "==" },
    { q: "Which keyword is used to exit a loop?", options: ["exit", "return", "break", "stop"], answer: "break" },
    { q: "C++ is:", options: ["Interpreted", "Compiled", "Both", "None"], answer: "Compiled" },
    { q: "Which of these is a valid variable name?", options: ["2val", "value_2", "@var", "val!"], answer: "value_2" },
    { q: "Which header file is used for strings?", options: ["<string>", "<str>", "<text>", "<char>"], answer: "<string>" },
    { q: "Default return type of main?", options: ["void", "int", "float", "char"], answer: "int" },
    { q: "What does 'cin' do?", options: ["Output", "Input", "Loop", "Declare"], answer: "Input" },
    { q: "int a = 5/2; value of a?", options: ["2.5", "2", "3", "Error"], answer: "2" },
    { q: "Which function clears the screen?", options: ["clrscr()", "clear()", "reset()", "clean()"], answer: "clrscr()" },
    { q: "Which keyword creates an object?", options: ["create", "new", "init", "make"], answer: "new" },
    { q: "What is 'this' keyword used for?", options: ["current object", "parent class", "child class", "none"], answer: "current object" },
    { q: "Which operator is used for pointer?", options: ["*", "&", "%", "@"], answer: "*" },
    { q: "Which is used to define class?", options: ["class", "struct", "define", "type"], answer: "class" },
    { q: "Constructor has same name as?", options: ["function", "file", "class", "object"], answer: "class" },
    { q: "Destructor starts with?", options: ["~", "-", "#", "!"], answer: "~" },
    { q: "Which of these is logical operator?", options: ["&&", "%%", "==", "##"], answer: "&&" },
    { q: "Which is not a data type?", options: ["int", "real", "float", "bool"], answer: "real" },
    { q: "Which loop checks before running?", options: ["for", "do-while", "while", "goto"], answer: "while" },
    { q: "Which file includes prototypes?", options: [".cpp", ".h", ".txt", ".exe"], answer: ".h" },
    { q: "How to write newline?", options: ["\n", "newline", "\r", "endline"], answer: "\n" },
];

let selectedQuestions = [];

function shuffleAndPick() {
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    selectedQuestions = shuffled.slice(0, 9);
}

function askQuestion(index) {
    if (gameOver) return;
    const btn = document.getElementById(`btn${index}`);
    if (btn.textContent === "X" || btn.textContent === "O") return;

    currentBtn = btn;
    const { q, options, answer } = selectedQuestions[index];
    correctAnswer = answer;

    document.getElementById("modalQuestion").textContent = q;
    document.getElementById("resultTag").textContent = "";
    const container = document.getElementById("optionsContainer");
    container.innerHTML = "";

    options.forEach(opt => {
        const optionBtn = document.createElement("button");
        optionBtn.className = "option-button";
        optionBtn.textContent = opt;
        optionBtn.onclick = () => submitAnswer(opt);
        container.appendChild(optionBtn);
    });

    document.getElementById("questionModal").style.display = "flex";
}

function submitAnswer(userAnswer) {
    const resultTag = document.getElementById("resultTag");
    if (userAnswer === correctAnswer) {
        currentBtn.textContent = currentPlayer;
        checkWinner();
        closeModal();
    } else {
        resultTag.textContent = "Wrong answer!";
        setTimeout(closeModal, 1000);
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("turn").textContent = `Turn: Team ${currentPlayer}`;
    startTurnTimer();
}

function startTurnTimer() {
    clearInterval(timer);
    let timeLeft = timeLimit;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`⏰ Time's up! Switching to team ${currentPlayer === "X" ? "O" : "X"}`);
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("turn").textContent = `Turn: Team ${currentPlayer}`;
            startTurnTimer();
        }
    }, 1000);
}

function closeModal() {
    document.getElementById("questionModal").style.display = "none";
}

function checkWinner() {
    const buttons = document.querySelectorAll("td button");
    const board = Array.from(buttons).map(btn => btn.textContent);
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            setTimeout(() => {
                document.getElementById("winnerText").textContent = `🎉 Team ${board[a]} wins!`;
                document.getElementById("winnerModal").style.display = "flex";
            }, 100);
            return;
        }
    }
    if (board.every(cell => cell === "X" || cell === "O")) {
        gameOver = true;
        setTimeout(() => {
            alert("It's a tie!");
            location.reload();
        }, 100);
    }
}

window.onload = () => {
    document.getElementById("turn").textContent = `Turn: Team ${currentPlayer}`;
    shuffleAndPick();
    startTurnTimer();
};