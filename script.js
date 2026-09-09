/* =========================================================
   OUR BIRTHDAY ADVENTURE ❤️
   ========================================================= */


/* =========================================================
   GAME STATE
========================================================= */

let totalScore = 0;

let completedLevels = 0;


/* =========================================================
   PHOTO CONFIGURATION
========================================================= */

/*
    Your photos live here:

    images/photo1.jpg
    images/photo2.jpg
    etc.

    Change the filenames below if necessary.
*/

const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg"
];


/* =========================================================
   SCREEN MANAGEMENT
========================================================= */

function showScreen(id, level = 0) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document.getElementById(id)
        .classList.add("active");


    document.getElementById("current-level")
        .textContent = level;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SCORE
========================================================= */

function addScore(points) {

    totalScore += points;

    document.getElementById("score")
        .textContent = totalScore;

}


/* =========================================================
   START
========================================================= */

function startGame() {

    showScreen("map-screen");

    createFloatingHearts();

}


/* =========================================================
   LEVEL OPENING
========================================================= */

function openLevel(level) {

    switch (level) {

        case 1:

            showScreen(
                "quiz-screen",
                1
            );

            startQuiz();

            break;


        case 2:

            showScreen(
                "memory-screen",
                2
            );

            startMemoryGame();

            break;


        case 3:

            showScreen(
                "hearts-screen",
                3
            );

            resetHeartGame();

            break;


        case 4:

            showScreen(
                "family-screen",
                4
            );

            break;


        case 5:

            showScreen(
                "letter-screen",
                5
            );

            break;

    }

}


/* =========================================================
   UNLOCK LEVEL
========================================================= */

function unlockLevel(level) {

    const card =
        document.getElementById(
            `level-card-${level}`
        );


    if (!card) return;


    card.classList.remove("locked");

    card.classList.add("unlocked");


    const lock =
        card.querySelector(".lock");

    if (lock) {
        lock.remove();
    }


    /*
        Add the PLAY button only once.
    */

    if (!card.querySelector("button")) {

        const button =
            document.createElement("button");

        button.textContent =
            level === 5
                ? "OPEN"
                : "PLAY";

        button.onclick = () =>
            openLevel(level);

        card.appendChild(button);

    }

}


/* =========================================================
   COMPLETE LEVEL
========================================================= */

function completeLevel(level) {

    completedLevels++;

    addScore(100);


    if (level < 5) {

        unlockLevel(level + 1);

    }


    toast(
        `🎉 Level ${level} complete! +100 ❤️`
    );


    setTimeout(() => {

        showScreen(
            "map-screen"
        );

    }, 1500);

}


/* =========================================================
   LEVEL 1 — QUIZ
========================================================= */


/*
    IMPORTANT:

    These questions are intentionally generic.

    You can replace them with your REAL memories.

    Example:

    question:
    "Where did we go for our first date?"

    answers:
    [
        "Singapore",
        "Japan",
        "Manila",
        "Cebu"
    ]

    correct:
    0
*/

const questions = [

    {
        question:
            "What is my favorite thing about you?",

        answers: [
            "Your cooking 😋",
            "Everything about you ❤️",
            "Your ability to steal the blanket 😂",
            "Your jokes 😆"
        ],

        correct: 1
    },


    {
        question:
            "What do I value most about our life together?",

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
            "Choose you again ❤️",
            "Ask for a discount 😂"
        ],

        correct: 2
    },


    {
        question:
            "Where is my favorite place to be?",

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

    const question =
        questions[quizIndex];


    document.getElementById(
        "question"
    ).textContent =
        question.question;


    document.getElementById(
        "question-number"
    ).textContent =
        quizIndex + 1;


    document.getElementById(
        "quiz-progress"
    ).style.width =
        (
            ((quizIndex + 1) /
            questions.length) * 100
        ) + "%";


    const answers =
        document.getElementById(
            "answers"
        );


    answers.innerHTML = "";


    document.getElementById(
        "quiz-feedback"
    ).textContent = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "answer";


            button.textContent =
                answer;


            button.onclick =
                () =>
                    answerQuestion(index);


            answers.appendChild(button);

        }
    );

}


function answerQuestion(index) {

    const question =
        questions[quizIndex];


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (
        index === question.correct
    ) {

        buttons[index]
            .classList.add("correct");


        quizScore++;


        addScore(50);


        document.getElementById(
            "quiz-feedback"
        ).textContent =
            "❤️ Correct!";


        setTimeout(
            nextQuestion,
            900
        );

    }

    else {

        buttons[index]
            .classList.add("wrong");


        buttons[
            question.correct
        ].classList.add("correct");


        document.getElementById(
            "quiz-feedback"
        ).textContent =
            "😜 Almost!";


        setTimeout(
            nextQuestion,
            1200
        );

    }

}


function nextQuestion() {

    quizIndex++;


    if (
        quizIndex <
        questions.length
    ) {

        showQuestion();

    }

    else {

        toast(
            `🏆 ${quizScore}/5 correct!`
        );


        setTimeout(() => {

            completeLevel(1);

        }, 1500);

    }

}


/* =========================================================
   LEVEL 2 — PHOTO MEMORY MATCH
========================================================= */


/*
    We use 5 of your photos.

    Each photo appears twice.

    This creates 10 cards.
*/

let memoryFirst = null;

let memorySecond = null;

let memoryLocked = false;

let memoryMatches = 0;


function startMemoryGame() {

    memoryFirst = null;

    memorySecond = null;

    memoryLocked = false;

    memoryMatches = 0;


    document.getElementById(
        "matches"
    ).textContent = "0";


    const selectedPhotos = [

        photos[0],
        photos[1],
        photos[2],
        photos[3],
        photos[4]

    ];


    let cards = [
        ...selectedPhotos,
        ...selectedPhotos
    ];


    cards =
        cards.sort(
            () => Math.random() - 0.5
        );


    const grid =
        document.getElementById(
            "memory-grid"
        );


    grid.innerHTML = "";


    cards.forEach(
        (photo, index) => {

            const card =
                document.createElement(
                    "button"
                );


            card.className =
                "memory-card";


            card.dataset.photo =
                photo;


            const image =
                document.createElement(
                    "img"
                );


            image.src = photo;

            image.alt =
                "Our memory";


            card.appendChild(
                image
            );


            card.onclick =
                () =>
                    flipMemory(card);


            grid.appendChild(card);

        }
    );

}


function flipMemory(card) {

    if (
        memoryLocked ||
        card === memoryFirst ||
        card.classList.contains(
            "matched"
        )
    ) {

        return;

    }


    card.classList.add(
        "flipped"
    );


    if (!memoryFirst) {

        memoryFirst = card;

        return;

    }


    memorySecond = card;

    memoryLocked = true;


    if (
        memoryFirst.dataset.photo ===
        memorySecond.dataset.photo
    ) {

        memoryFirst.classList.add(
            "matched"
        );

        memorySecond.classList.add(
            "matched"
        );


        memoryMatches++;


        document.getElementById(
            "matches"
        ).textContent =
            memoryMatches;


        addScore(50);


        toast(
            "❤️ You found a memory!"
        );


        memoryFirst = null;

        memorySecond = null;

        memoryLocked = false;


        if (
            memoryMatches === 5
        ) {

            setTimeout(() => {

                completeLevel(2);

            }, 1200);

        }

    }

    else {

        setTimeout(() => {

            memoryFirst.classList
                .remove("flipped");


            memorySecond.classList
                .remove("flipped");


            memoryFirst = null;

            memorySecond = null;

            memoryLocked = false;

        }, 900);

    }

}


/* =========================================================
   LEVEL 3 — FIND HEARTS
========================================================= */

let heartsFound = 0;


function resetHeartGame() {

    heartsFound = 0;


    document.getElementById(
        "hearts-found"
    ).textContent = "0";


    document.querySelectorAll(
        ".hidden-heart"
    ).forEach(heart => {

        heart.style.display =
            "block";

    });

}


function findHeart(element) {

    element.style.display =
        "none";


    heartsFound++;


    document.getElementById(
        "hearts-found"
    ).textContent =
        heartsFound;


    addScore(50);


    toast(
        "❤️ You found one!"
    );


    if (
        heartsFound === 5
    ) {

        setTimeout(() => {

            toast(
                "🎉 You found all my hearts!"
            );


            completeLevel(3);

        }, 1000);

    }

}


/* =========================================================
   LEVEL 4 — FAMILY PHOTO GALLERY
========================================================= */

const familyMessages = [

    `
    ❤️ This is one of the memories
    that reminds me how lucky I am
    to have you in my life.
    `,


    `
    💕 You are one of the most
    important people in my entire world.
    I hope you always know that.
    `,


    `
    👨‍👩‍👦 Our little family is one
    of the greatest things that ever
    happened to me.
    `,


    `
    ✨ Every memory we make together
    is another chapter in the story
    I never want to end.
    `

];


let familyVisited =
    new Set();


function showFamilyMemory(index) {

    document.getElementById(
        "family-message"
    ).textContent =
        familyMessages[index];


    if (
        !familyVisited.has(index)
    ) {

        familyVisited.add(index);

        addScore(50);

    }


    if (
        familyVisited.size === 4
    ) {

        document.getElementById(
            "family-continue"
        ).classList.remove(
            "hidden"
        );


        toast(
            "🏆 Family memories unlocked!"
        );

    }

}


function completeFamily() {

    completeLevel(4);

}


/* =========================================================
   LEVEL 5 — LETTER
========================================================= */

function openLetter() {

    document.getElementById(
        "envelope"
    ).classList.add(
        "hidden"
    );


    document.getElementById(
        "letter-content"
    ).classList.remove(
        "hidden"
    );


    addScore(100);

}


function showFinal() {

    document.getElementById(
        "final-score"
    ).textContent =
        totalScore;


    showScreen(
        "final-screen",
        5
    );


    createConfetti();

}


/* =========================================================
   FINAL GIFT
========================================================= */

function openGift() {

    document.getElementById(
        "gift"
    ).style.display =
        "none";


    document.getElementById(
        "gift-message"
    ).classList.remove(
        "hidden"
    );


    createConfetti();

}


/* =========================================================
   FLOATING HEARTS
========================================================= */

let heartsStarted = false;


function createFloatingHearts() {

    if (heartsStarted) {
        return;
    }


    heartsStarted = true;


    const container =
        document.getElementById(
            "floating-hearts"
        );


    setInterval(() => {

        const heart =
            document.createElement(
                "div"
            );


        heart.textContent =
            Math.random() > 0.5
                ? "❤️"
                : "💕";


        heart.style.position =
            "fixed";


        heart.style.left =
            Math.random() * 100 +
            "vw";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            (10 +
            Math.random() * 18) +
            "px";


        heart.style.opacity =
            0.15 +
            Math.random() * 0.3;


        container.appendChild(
            heart
        );


        const duration =
            5000 +
            Math.random() * 4000;


        heart.animate(

            [

                {
                    transform:
                        "translateY(0)"
                },

                {
                    transform:
                        "translateY(-110vh)"
                }

            ],

            {

                duration,

                easing:
                    "linear"

            }

        );


        setTimeout(() => {

            heart.remove();

        }, duration);


    }, 900);

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti() {

    const emojis = [

        "❤️",
        "💕",
        "🎉",
        "✨",
        "🎊",
        "💖",
        "🌹"

    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        piece.style.position =
            "fixed";


        piece.style.left =
            Math.random() * 100 +
            "vw";


        piece.style.top =
            "-30px";


        piece.style.fontSize =
            (15 +
            Math.random() * 25) +
            "px";


        piece.style.zIndex =
            "999";


        piece.style.pointerEvents =
            "none";


        document.body.appendChild(
            piece
        );


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
                        opacity: 0
                    }

                ],

                {

                    duration:
                        2500 +
                        Math.random() * 2500,

                    easing:
                        "ease-out"

                }

            );


        animation.onfinish =
            () => {

                piece.remove();

            };

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /*
            Make sure the first photo
            exists before starting.
        */

        console.log(
            "❤️ Birthday Adventure loaded!"
        );

        console.log(
            "Photos configured:",
            photos
        );

    }
);
