/* =====================================================
   BIRTHDAY ADVENTURE
   ===================================================== */

let totalScore = 0;
let currentLevel = 1;


/* =====================================================
   GENERAL FUNCTIONS
   ===================================================== */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function addScore(points) {

    totalScore += points;

    document.getElementById("score").textContent =
        totalScore;

}


function toast(message) {

    const element = document.getElementById("toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {
        element.classList.remove("show");
    }, 1800);
}


function startGame() {

    showScreen("map-screen");

    createFloatingHearts();

}


/* =====================================================
   LEVEL SYSTEM
   ===================================================== */

function openLevel(level) {

    if (level === 1) {

        showScreen("quiz-screen");

        startQuiz();

    }

    else if (level === 2) {

        showScreen("memory-screen");

        startMemoryGame();

    }

    else if (level === 3) {

        showScreen("hearts-screen");

        resetHeartGame();

    }

    else if (level === 4) {

        showScreen("family-screen");

    }

    else if (level === 5) {

        showScreen("letter-screen");

    }

}


function unlockLevel(level) {

    const card =
        document.getElementById(
            `level-card-${level}`
        );

    card.classList.remove("locked");

    card.classList.add("unlocked");

    const lock = card.querySelector(".lock");

    if (lock) {
        lock.remove();
    }

    if (level === 2) {

        card.innerHTML +=
            `<button onclick="openLevel(2)">PLAY</button>`;

    }

    if (level === 3) {

        card.innerHTML +=
            `<button onclick="openLevel(3)">PLAY</button>`;

    }

    if (level === 4) {

        card.innerHTML +=
            `<button onclick="openLevel(4)">PLAY</button>`;

    }

    if (level === 5) {

        card.innerHTML +=
            `<button onclick="openLevel(5)">OPEN</button>`;

    }

}


function completeLevel(level) {

    addScore(100);

    if (level < 5) {

        unlockLevel(level + 1);

    }

    toast(
        `🎉 Level ${level} complete! +100 ❤️`
    );

    setTimeout(() => {

        if (level < 5) {
            showScreen("map-screen");
        }

    }, 1500);

}


/* =====================================================
   LEVEL 1 — QUIZ
   ===================================================== */

const questions = [

    {
        question:
            "What is my favorite thing about you?",

        answers: [
            "Your cooking 😋",
            "Everything about you ❤️",
            "Your ability to steal the blanket 😂",
            "Your terrible jokes 😆"
        ],

        correct: 1
    },

    {
        question:
            "What do I value most about our relationship?",

        answers: [
            "Our adventures",
            "Our house",
            "Our family ❤️",
            "Our Netflix account 😂"
        ],

        correct: 2
    },

    {
        question:
            "Who is the cutest person in our family?",

        answers: [
            "Me 😎",
            "You ❤️",
            "Jarren 👶",
            "This is a trick question!"
        ],

        correct: 3
    },

    {
        question:
            "If I could choose my wife again, what would I do?",

        answers: [
            "Think about it",
            "Maybe",
            "Absolutely choose you again ❤️",
            "Ask for a discount 😂"
        ],

        correct: 2
    },

    {
        question:
            "What is my favorite place to be?",

        answers: [
            "At work",
            "At the gym",
            "Anywhere with you ❤️",
            "In front of my computer"
        ],

        correct: 2
    }

];


let quizIndex = 0;
let quizScore = 0;


function startQuiz() {

    quizIndex = 0;
    quizScore = 0;

    showQuestion();

}


function showQuestion() {

    const question = questions[quizIndex];

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("question-number")
        .textContent = quizIndex + 1;

    document.getElementById("quiz-progress")
        .style.width =
        ((quizIndex + 1) / questions.length * 100) + "%";

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    document.getElementById("quiz-feedback")
        .textContent = "";


    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.onclick = () =>
            answerQuestion(index);

        answers.appendChild(button);

    });

}


function answerQuestion(index) {

    const question = questions[quizIndex];

    const buttons =
        document.querySelectorAll(".answer");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (index === question.correct) {

        buttons[index].classList.add("correct");

        quizScore += 1;

        addScore(50);

        document.getElementById("quiz-feedback")
            .textContent =
            "❤️ Correct! You know us very well.";

        setTimeout(nextQuestion, 900);

    }

    else {

        buttons[index].classList.add("wrong");

        buttons[question.correct]
            .classList.add("correct");

        document.getElementById("quiz-feedback")
            .textContent =
            "😜 Almost! But I'll give you another one.";

        setTimeout(nextQuestion, 1200);

    }

}


function nextQuestion() {

    quizIndex++;

    if (quizIndex < questions.length) {

        showQuestion();

    }

    else {

        toast(
            `🏆 Quiz complete! ${quizScore}/5 correct!`
        );

        setTimeout(() => {

            unlockLevel(2);

            showScreen("map-screen");

        }, 1600);

    }

}


/* =====================================================
   LEVEL 2 — MEMORY MATCH
   ===================================================== */

const memorySymbols = [
    "❤️", "❤️",
    "💍", "💍",
    "👨‍👩‍👦", "👨‍👩‍👦",
    "🎂", "🎂",
    "🌹", "🌹",
    "💋", "💋"
];

let memoryFirst = null;
let memorySecond = null;
let memoryLocked = false;
let memoryMatches = 0;


function startMemoryGame() {

    memoryFirst = null;
    memorySecond = null;
    memoryLocked = false;
    memoryMatches = 0;

    document.getElementById("matches")
        .textContent = "0";

    const grid =
        document.getElementById("memory-grid");

    grid.innerHTML = "";


    const shuffled =
        [...memorySymbols]
            .sort(() => Math.random() - 0.5);


    shuffled.forEach(symbol => {

        const card =
            document.createElement("button");

        card.className = "memory-card";

        card.dataset.symbol = symbol;

        card.textContent = "?";

        card.onclick = () =>
            flipMemory(card);

        grid.appendChild(card);

    });

}


function flipMemory(card) {

    if (
        memoryLocked ||
        card === memoryFirst ||
        card.classList.contains("matched")
    ) {
        return;
    }


    card.classList.add("flipped");

    card.textContent =
        card.dataset.symbol;


    if (!memoryFirst) {

        memoryFirst = card;

        return;

    }


    memorySecond = card;

    memoryLocked = true;


    if (
        memoryFirst.dataset.symbol ===
        memorySecond.dataset.symbol
    ) {

        memoryFirst.classList.add("matched");

        memorySecond.classList.add("matched");

        memoryMatches++;

        document.getElementById("matches")
            .textContent = memoryMatches;

        addScore(50);

        memoryFirst = null;
        memorySecond = null;

        memoryLocked = false;


        if (memoryMatches === 6) {

            setTimeout(() => {

                completeLevel(2);

            }, 700);

        }

    }

    else {

        setTimeout(() => {

            memoryFirst.classList.remove("flipped");

            memorySecond.classList.remove("flipped");

            memoryFirst.textContent = "?";

            memorySecond.textContent = "?";

            memoryFirst = null;

            memorySecond = null;

            memoryLocked = false;

        }, 800);

    }

}


/* =====================================================
   LEVEL 3 — FIND HEARTS
   ===================================================== */

let heartsFound = 0;


function resetHeartGame() {

    heartsFound = 0;

    document.getElementById("hearts-found")
        .textContent = "0";

    document.querySelectorAll(".hidden-heart")
        .forEach(heart => {

            heart.style.display = "block";

        });

}


function findHeart(element) {

    element.style.display = "none";

    heartsFound++;

    document.getElementById("hearts-found")
        .textContent = heartsFound;

    addScore(50);

    toast("❤️ You found one!");

    if (heartsFound === 5) {

        setTimeout(() => {

            toast("🎉 You found every heart!");

            unlockLevel(4);

            showScreen("map-screen");

        }, 800);

    }

}


/* =====================================================
   LEVEL 4 — FAMILY
   ===================================================== */

let familyVisited = new Set();


function familyMessage(person) {

    let message = "";


    if (person === "me") {

        message =
            "👨 Me — I'm the luckiest man because I get to call you my wife.";

    }


    if (person === "wife") {

        message =
            "👩 You — You are the heart of our family. I hope you always know how loved you are.";

    }


    if (person === "jarren") {

        message =
            "👶 Jarren — Our little boy made our story even more beautiful.";

    }


    document.getElementById("family-message")
        .textContent = message;


    familyVisited.add(person);

    addScore(50);


    if (familyVisited.size === 3) {

        document.getElementById("family-continue")
            .classList.remove("hidden");

        toast("🏆 Family achievement unlocked!");

    }

}


function completeFamily() {

    unlockLevel(5);

    completeLevel(4);

}


/* =====================================================
   LEVEL 5 — LETTER
   ===================================================== */

function openLetter() {

    document.getElementById("envelope")
        .classList.add("hidden");

    document.getElementById("letter-content")
        .classList.remove("hidden");

    addScore(100);

}


function showFinal() {

    document.getElementById("final-score")
        .textContent = totalScore;

    showScreen("final-screen");

    createConfetti();

}


/* =====================================================
   FINAL GIFT
   ===================================================== */

function openGift() {

    const gift =
        document.getElementById("gift");

    gift.style.display = "none";

    document.getElementById("gift-message")
        .classList.remove("hidden");

    createConfetti();

}


/* =====================================================
   FLOATING HEARTS
   ===================================================== */

function createFloatingHearts() {

    const container =
        document.getElementById("floating-hearts");

    setInterval(() => {

        const heart =
            document.createElement("div");

        heart.textContent =
            Math.random() > 0.5 ? "❤️" : "💕";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-30px";

        heart.style.fontSize =
            (10 + Math.random() * 18) + "px";

        heart.style.opacity =
            0.25 + Math.random() * 0.4;

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "0";

        container.appendChild(heart);


        const duration =
            4000 + Math.random() * 4000;


        heart.animate(

            [
                {
                    transform:
                        "translateY(0) rotate(0deg)"
                },

                {
                    transform:
                        `translateY(-110vh) rotate(${Math.random() * 360}deg)`
                }
            ],

            {
                duration: duration,
                easing: "linear"
            }

        );


        setTimeout(() => {

            heart.remove();

        }, duration);

    }, 800);

}


/* =====================================================
   CONFETTI
   ===================================================== */

function createConfetti() {

    const emojis = [
        "❤️",
        "💕",
        "🎉",
        "✨",
        "🎊",
        "💖"
    ];


    for (let i = 0; i < 50; i++) {

        const piece =
            document.createElement("div");

        piece.textContent =
            emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
            ];

        piece.style.position = "fixed";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-30px";

        piece.style.fontSize =
            (15 + Math.random() * 25) + "px";

        piece.style.zIndex = "999";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);


        const animation =
            piece.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",
                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(110vh) rotate(${Math.random() * 720}deg)`,
                        opacity: 0.8
                    }
                ],

                {
                    duration:
                        2500 + Math.random() * 2500,

                    easing: "ease-out"
                }

            );


        animation.onfinish = () => {

            piece.remove();

        };

    }

}
