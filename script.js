/* ==========================================
   BIRTHDAY ADVENTURE
   Uses ONLY:
   photo1.jpg = Wedding
   photo2.jpg = Japan
   photo3.jpg = Wife + Jarren
   photo4.jpg = Family
   photo5.jpg = First Date
========================================== */


/* ==========================================
   GAME STATE
========================================== */

let score = 0;

let highestUnlockedLevel = 1;

let currentLevel = 0;

let pendingNextLevel = null;

const completedLevels = new Set();


/* ==========================================
   SCREENS
========================================== */

const screenIds = [
    "start-screen",
    "map-screen",
    "quiz-screen",
    "memory-screen",
    "hearts-screen",
    "family-screen",
    "letter-screen",
    "final-screen"
];


function showScreen(id) {

    screenIds.forEach(screenId => {

        const screen =
            document.getElementById(screenId);

        if (screen) {
            screen.classList.remove("active");
        }

    });


    const target =
        document.getElementById(id);

    if (target) {

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* ==========================================
   START
========================================== */

function startGame() {

    currentLevel = 0;

    updateHUD();

    showMap();

    showToast(
        "Your adventure begins ❤️"
    );

}


/* ==========================================
   MAP
========================================== */

function showMap() {

    currentLevel = 0;

    updateHUD();

    refreshMap();

    showScreen("map-screen");

}


function refreshMap() {

    for (let level = 1; level <= 5; level++) {

        const card =
            document.getElementById(
                `level-card-${level}`
            );

        if (!card) continue;


        const unlocked =
            level <= highestUnlockedLevel;


        card.classList.toggle(
            "unlocked",
            unlocked
        );

        card.classList.toggle(
            "locked",
            !unlocked
        );

        card.classList.toggle(
            "completed",
            completedLevels.has(level)
        );


        const oldButton =
            card.querySelector(
                ".level-button"
            );

        const oldLock =
            card.querySelector(
                ".lock"
            );


        if (unlocked) {

            if (oldLock) {
                oldLock.remove();
            }


            if (!oldButton) {

                const button =
                    document.createElement(
                        "button"
                    );

                button.className =
                    "level-button";

                button.textContent =
                    completedLevels.has(level)
                        ? "REPLAY"
                        : "PLAY";

                button.onclick =
                    () => openLevel(level);

                card.appendChild(button);

            } else {

                oldButton.textContent =
                    completedLevels.has(level)
                        ? "REPLAY"
                        : "PLAY";

                oldButton.onclick =
                    () => openLevel(level);

            }

        } else {

            if (oldButton) {
                oldButton.remove();
            }


            if (!oldLock) {

                const lock =
                    document.createElement(
                        "span"
                    );

                lock.className =
                    "lock";

                lock.textContent =
                    "🔒";

                card.appendChild(lock);

            }

        }

    }

}


/* ==========================================
   OPEN LEVEL
========================================== */

function openLevel(level) {

    if (level > highestUnlockedLevel) {

        showToast(
            "Complete the previous level first ❤️"
        );

        return;

    }


    currentLevel = level;

    updateHUD();


    switch (level) {

        case 1:

            resetQuiz();

            showScreen("quiz-screen");

            break;


        case 2:

            resetMemoryGame();

            showScreen("memory-screen");

            break;


        case 3:

            resetHeartHunt();

            showScreen("hearts-screen");

            break;


        case 4:

            resetFamily();

            showScreen("family-screen");

            break;


        case 5:

            resetLetter();

            showScreen("letter-screen");

            break;

    }

}


/* ==========================================
   HUD
========================================== */

function updateHUD() {

    document.getElementById(
        "current-level"
    ).textContent =
        currentLevel;


    document.getElementById(
        "score"
    ).textContent =
        score;

}


/* ==========================================
   QUIZ
========================================== */

const quizQuestions = [

    {
        question:
            "Where did our story begin?",

        answers: [
            "With our first date ❤️",
            "In Japan 🇯🇵",
            "At our wedding 💍"
        ],

        correct: 0,

        message:
            "Exactly. One date changed everything. ❤️"
    },

    {
        question:
            "What is my favorite thing about you?",

        answers: [
            "Your smile",
            "Your laugh",
            "Everything about you ❤️"
        ],

        correct: 2,

        message:
            "Correct. There was never just one thing. ❤️"
    },

    {
        question:
            "Who made our little family even more special?",

        answers: [
            "Jarren ❤️",
            "Nobody",
            "The neighbors 😆"
        ],

        correct: 0,

        message:
            "Our greatest little adventure. 👨‍👩‍👦"
    },

    {
        question:
            "If I could start our story again, what would I do?",

        answers: [
            "Take a different path",
            "Choose you again ❤️",
            "Stay home"
        ],

        correct: 1,

        message:
            "Again and again and again. ❤️"
    },

    {
        question:
            "What do I want most for our future?",

        answers: [
            "More adventures",
            "More memories",
            "More years together",
            "All of the above ❤️"
        ],

        correct: 3,

        message:
            "That's the answer. Always. ❤️"
    }

];


let quizIndex = 0;

let quizLocked = false;


function resetQuiz() {

    quizIndex = 0;

    quizLocked = false;

    renderQuestion();

}


function renderQuestion() {

    const question =
        quizQuestions[quizIndex];


    document.getElementById(
        "question-number"
    ).textContent =
        quizIndex + 1;


    document.getElementById(
        "question"
    ).textContent =
        question.question;


    document.getElementById(
        "quiz-progress"
    ).style.width =
        `${
            ((quizIndex + 1) /
            quizQuestions.length) * 100
        }%`;


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


            button.textContent =
                answer;


            button.onclick =
                () =>
                    selectQuizAnswer(
                        index,
                        button
                    );


            answers.appendChild(
                button
            );

        }
    );

}


function selectQuizAnswer(
    answerIndex,
    selectedButton
) {

    if (quizLocked) return;

    quizLocked = true;


    const question =
        quizQuestions[quizIndex];


    const buttons =
        document.querySelectorAll(
            "#answers button"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled = true;


            if (
                index ===
                question.correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        answerIndex ===
        question.correct
    ) {

        selectedButton.classList.add(
            "correct"
        );

        addScore(10);

        document.getElementById(
            "quiz-feedback"
        ).textContent =
            question.message;

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        document.getElementById(
            "quiz-feedback"
        ).textContent =
            "Almost! But I still love you. 😘";

    }


    setTimeout(() => {

        quizIndex++;

        quizLocked = false;


        if (
            quizIndex <
            quizQuestions.length
        ) {

            renderQuestion();

        } else {

            completeLevel(
                1,
                25,
                "Our Beginning ❤️",
                "You unlocked the memories that came next."
            );

        }

    }, 1300);

}


/* ==========================================
   MEMORY GAME

   IMPORTANT:
   Five actual photos are duplicated here
   to create five matching pairs.
========================================== */

const memoryPhotos = [

    {
        id: "wedding",
        src: "images/photo1.jpg"
    },

    {
        id: "japan",
        src: "images/photo2.jpg"
    },

    {
        id: "jarren",
        src: "images/photo3.jpg"
    },

    {
        id: "family",
        src: "images/photo4.jpg"
    },

    {
        id: "first-date",
        src: "images/photo5.jpg"
    }

];


let flippedCards = [];

let memoryLocked = false;

let matches = 0;


function resetMemoryGame() {

    flippedCards = [];

    memoryLocked = false;

    matches = 0;


    document.getElementById(
        "matches"
    ).textContent = 0;


    const deck = [

        ...memoryPhotos,
        ...memoryPhotos

    ].map(
        (photo, index) => ({

            ...photo,

            uniqueId:
                `${photo.id}-${index}`

        })
    );


    shuffle(deck);


    const grid =
        document.getElementById(
            "memory-grid"
        );


    grid.innerHTML = "";


    deck.forEach(photo => {

        const card =
            document.createElement(
                "button"
            );


        card.className =
            "memory-card";


        card.dataset.id =
            photo.id;


        card.dataset.unique =
            photo.uniqueId;


        card.innerHTML = `

            <div class="memory-card-inner">

                <div class="memory-front">
                    ❤️
                </div>

                <div class="memory-back">
                    <img
                        src="${photo.src}"
                        alt="Our memory"
                    >
                </div>

            </div>

        `;


        card.onclick =
            () => flipMemoryCard(card);


        grid.appendChild(card);

    });

}


function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card.classList.contains(
            "flipped"
        ) ||
        card.classList.contains(
            "matched"
        )
    ) {
        return;
    }


    card.classList.add(
        "flipped"
    );


    flippedCards.push(card);


    if (
        flippedCards.length === 2
    ) {

        checkMemoryMatch();

    }

}


function checkMemoryMatch() {

    const [
        first,
        second
    ] = flippedCards;


    if (
        first.dataset.id ===
        second.dataset.id
    ) {

        first.classList.add(
            "matched"
        );

        second.classList.add(
            "matched"
        );


        matches++;


        document.getElementById(
            "matches"
        ).textContent =
            matches;


        addScore(10);


        flippedCards = [];


        showToast(
            "Memory matched! +10 ❤️"
        );


        if (matches === 5) {

            setTimeout(() => {

                completeLevel(
                    2,
                    25,
                    "Our Memories 🧩",
                    "Five photos, but so many memories behind them."
                );

            }, 700);

        }

    } else {

        memoryLocked = true;


        setTimeout(() => {

            first.classList.remove(
                "flipped"
            );

            second.classList.remove(
                "flipped"
            );


            flippedCards = [];

            memoryLocked = false;

        }, 900);

    }

}


/* ==========================================
   HEART HUNT
========================================== */

let heartsFound = 0;


function resetHeartHunt() {

    heartsFound = 0;


    document.getElementById(
        "hearts-found"
    ).textContent = 0;


    document.querySelectorAll(
        ".hidden-heart"
    ).forEach(heart => {

        heart.classList.remove(
            "found"
        );

        heart.disabled = false;

    });

}


function findHeart(heart) {

    if (
        heart.classList.contains(
            "found"
        )
    ) {
        return;
    }


    heart.classList.add(
        "found"
    );

    heart.disabled = true;


    heartsFound++;


    document.getElementById(
        "hearts-found"
    ).textContent =
        heartsFound;


    addScore(10);


    showToast(
        "You found my heart ❤️ +10"
    );


    if (heartsFound === 5) {

        setTimeout(() => {

            completeLevel(
                3,
                25,
                "Our Adventures 🇯🇵",
                "I'd travel anywhere as long as I get to experience it with you."
            );

        }, 650);

    }

}


/* ==========================================
   FAMILY
========================================== */

const familyMessages = [

    "Watching you become Jarren's mom gave me another reason to love and admire you. ❤️",

    "This is my favorite team: you, me, and Jarren. Our little family is the best thing we've built together. 👨‍👩‍👦❤️"

];


let viewedFamilyMemories =
    new Set();


function resetFamily() {

    viewedFamilyMemories =
        new Set();


    document.getElementById(
        "family-count"
    ).textContent = 0;


    document.getElementById(
        "family-message"
    ).textContent =
        "Choose a memory ❤️";


    document.getElementById(
        "family-continue"
    ).classList.add(
        "hidden"
    );


    document.querySelectorAll(
        ".family-photo"
    ).forEach(photo => {

        photo.classList.remove(
            "viewed"
        );

    });

}


function showFamilyMemory(index) {

    document.getElementById(
        "family-message"
    ).textContent =
        familyMessages[index];


    if (
        !viewedFamilyMemories.has(
            index
        )
    ) {

        viewedFamilyMemories.add(
            index
        );


        document.getElementById(
            `family-photo-${index}`
        ).classList.add(
            "viewed"
        );


        document.getElementById(
            "family-count"
        ).textContent =
            viewedFamilyMemories.size;


        addScore(10);

    }


    if (
        viewedFamilyMemories.size ===
        2
    ) {

        document.getElementById(
            "family-continue"
        ).classList.remove(
            "hidden"
        );

    }

}


function completeFamily() {

    completeLevel(
        4,
        25,
        "Our Little Family 👨‍👩‍👦",
        "You unlocked the final chapter of our adventure."
    );

}


/* ==========================================
   LETTER
========================================== */

let letterOpened = false;


function resetLetter() {

    letterOpened = false;


    document.getElementById(
        "envelope"
    ).classList.remove(
        "hidden"
    );


    document.getElementById(
        "letter-content"
    ).classList.add(
        "hidden"
    );

}


function openLetter() {

    if (letterOpened) return;


    letterOpened = true;


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


    addScore(25);


    createHeartBurst();


    showToast(
        "One last message from me ❤️"
    );

}


/* ==========================================
   FINAL
========================================== */

function showFinal() {

    if (
        !completedLevels.has(5)
    ) {

        completedLevels.add(5);

        addScore(50);

    }


    highestUnlockedLevel = 5;

    currentLevel = 5;

    updateHUD();


    document.getElementById(
        "final-score"
    ).textContent =
        score;


    showScreen(
        "final-screen"
    );


    launchConfetti(80);

}


/* ==========================================
   GIFT
========================================== */

let giftOpened = false;


function openGift() {

    if (giftOpened) return;

    giftOpened = true;


    const gift =
        document.getElementById(
            "gift"
        );


    gift.classList.add(
        "opened"
    );


    setTimeout(() => {

        gift.style.display =
            "none";


        document.querySelector(
            ".tap-gift"
        ).style.display =
            "none";


        document.getElementById(
            "gift-message"
        ).classList.remove(
            "hidden"
        );


        launchConfetti(150);

        createHeartBurst();


        setTimeout(() => {

            document.getElementById(
                "gift-message"
            ).scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }, 200);

    }, 450);

}


/* ==========================================
   COMPLETE LEVEL
========================================== */

function completeLevel(
    level,
    bonusPoints,
    title,
    message
) {

    const firstCompletion =
        !completedLevels.has(level);


    if (firstCompletion) {

        completedLevels.add(level);

        addScore(bonusPoints);

    }


    if (level < 5) {

        highestUnlockedLevel =
            Math.max(
                highestUnlockedLevel,
                level + 1
            );


        pendingNextLevel =
            level + 1;

    }


    document.getElementById(
        "complete-title"
    ).textContent =
        title;


    document.getElementById(
        "complete-message"
    ).textContent =
        message;


    document.getElementById(
        "points-earned"
    ).textContent =
        firstCompletion
            ? bonusPoints
            : 0;


    document.getElementById(
        "level-complete-modal"
    ).classList.remove(
        "hidden"
    );


    launchConfetti(35);

}


function continueJourney() {

    document.getElementById(
        "level-complete-modal"
    ).classList.add(
        "hidden"
    );


    showMap();

}


/* ==========================================
   SCORE
========================================== */

function addScore(points) {

    score += points;

    updateHUD();

}


/* ==========================================
   TOAST
========================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 1800);

}


/* ==========================================
   SHUFFLE
========================================== */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

}


/* ==========================================
   FLOATING BACKGROUND HEARTS
========================================== */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "floating-hearts"
        );


    if (!container) return;


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        Math.random() > 0.5
            ? "❤️"
            : "💕";


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${
            12 +
            Math.random() * 18
        }px`;


    heart.style.animationDuration =
        `${
            7 +
            Math.random() * 7
        }s`;


    container.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 15000);

}


setInterval(
    createFloatingHeart,
    1500
);


/* ==========================================
   HEART BURST
========================================== */

function createHeartBurst() {

    for (
        let i = 0;
        i < 16;
        i++
    ) {

        setTimeout(
            createFloatingHeart,
            i * 55
        );

    }

}


/* ==========================================
   CONFETTI
========================================== */

function launchConfetti(amount = 70) {

    const container =
        document.getElementById(
            "confetti-container"
        );


    const symbols = [
        "❤️",
        "💕",
        "✨",
        "🎉",
        "💖"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.fontSize =
            `${
                10 +
                Math.random() * 16
            }px`;


        piece.style.animationDuration =
            `${
                2.5 +
                Math.random() * 3
            }s`;


        piece.style.animationDelay =
            `${
                Math.random() * 1
            }s`;


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 7000);

    }

}


/* ==========================================
   KEYBOARD ACCESSIBILITY FOR ENVELOPE
========================================== */

document.addEventListener(
    "keydown",
    event => {

        const envelope =
            document.getElementById(
                "envelope"
            );


        if (
            document.activeElement ===
                envelope &&
            (
                event.key === "Enter" ||
                event.key === " "
            )
        ) {

            event.preventDefault();

            openLetter();

        }

    }
);


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateHUD();

        refreshMap();

    }
);
