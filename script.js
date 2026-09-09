/* =========================================================
   OUR ADVENTURE ❤️

   PHOTO MAPPING

   photo1.jpg = Wedding
   photo2.jpg = Japan Trip
   photo3.jpg = Mommy + Jarren
   photo4.jpg = Family
   photo5.jpg = First Date
========================================================= */


/* =========================================================
   GAME STATE
========================================================= */

let score = 0;
let currentLevel = 0;
let highestUnlockedLevel = 1;

const completedLevels = new Set();


/* =========================================================
   SCREENS
========================================================= */

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


function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });


    const target =
        document.getElementById(screenId);


    if (!target) {

        console.error(
            `Screen not found: ${screenId}`
        );

        return;
    }


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   START
========================================================= */

function startGame() {

    currentLevel = 0;

    updateHUD();

    refreshMap();

    showScreen("map-screen");

    showToast(
        "Let's begin, Mommy ❤️"
    );
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

    const levelElement =
        document.getElementById(
            "current-level"
        );

    const scoreElement =
        document.getElementById(
            "score"
        );


    if (levelElement) {

        levelElement.textContent =
            currentLevel;
    }


    if (scoreElement) {

        scoreElement.textContent =
            score;
    }
}


function addScore(points) {

    score += points;

    updateHUD();
}


/* =========================================================
   MAP
========================================================= */

function showMap() {

    currentLevel = 0;

    updateHUD();

    refreshMap();

    showScreen("map-screen");
}


function refreshMap() {

    for (
        let level = 1;
        level <= 5;
        level++
    ) {

        const card =
            document.getElementById(
                `level-card-${level}`
            );


        if (!card) {
            continue;
        }


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


        const existingButton =
            card.querySelector(
                ".level-button"
            );

        const existingLock =
            card.querySelector(
                ".lock"
            );


        if (existingButton) {
            existingButton.remove();
        }


        if (existingLock) {
            existingLock.remove();
        }


        if (unlocked) {

            const button =
                document.createElement(
                    "button"
                );


            button.type = "button";

            button.className =
                "level-button";


            button.textContent =
                completedLevels.has(level)
                    ? "REPLAY"
                    : "PLAY";


            button.addEventListener(
                "click",
                () => openLevel(level)
            );


            card.appendChild(button);

        } else {

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


/* =========================================================
   OPEN LEVEL
========================================================= */

function openLevel(level) {

    if (
        level >
        highestUnlockedLevel
    ) {

        showToast(
            "Complete the previous level first, Love ❤️"
        );

        return;
    }


    currentLevel = level;

    updateHUD();


    switch (level) {

        case 1:

            resetQuiz();

            showScreen(
                "quiz-screen"
            );

            break;


        case 2:

            resetMemoryGame();

            showScreen(
                "memory-screen"
            );

            break;


        case 3:

            resetHeartHunt();

            showScreen(
                "hearts-screen"
            );

            break;


        case 4:

            resetFamily();

            showScreen(
                "family-screen"
            );

            break;


        case 5:

            resetLetter();

            showScreen(
                "letter-screen"
            );

            break;
    }
}


/* =========================================================
   LEVEL COMPLETION
========================================================= */

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
    }


    const titleElement =
        document.getElementById(
            "complete-title"
        );


    const messageElement =
        document.getElementById(
            "complete-message"
        );


    const pointsElement =
        document.getElementById(
            "points-earned"
        );


    if (titleElement) {

        titleElement.textContent =
            title;
    }


    if (messageElement) {

        messageElement.textContent =
            message;
    }


    if (pointsElement) {

        pointsElement.textContent =
            firstCompletion
                ? bonusPoints
                : 0;
    }


    refreshMap();


    const modal =
        document.getElementById(
            "level-complete-modal"
        );


    if (modal) {

        modal.classList.remove(
            "hidden"
        );

    } else {

        showMap();
    }


    launchConfetti(35);
}


function continueJourney() {

    const modal =
        document.getElementById(
            "level-complete-modal"
        );


    if (modal) {

        modal.classList.add(
            "hidden"
        );
    }


    showMap();
}


/* =========================================================
   LEVEL 1
   LOVE QUIZ
========================================================= */

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
            "Exactly, Love. One date changed everything. ❤️"
    },


    {
        question:
            "What is my favorite thing about you?",

        answers: [
            "Your cooking 🍳",
            "Your laugh",
            "Everything about you ❤️"
        ],

        correct: 2,

        message:
            "Correct, Mommy. There was never just one thing. ❤️"
    },


    {
        question:
            "Who made our little family even more special?",

        answers: [
            "Jarren ❤️",
            "Nobody",
            "Singapore 🇸🇬"
        ],

        correct: 0,

        message:
            "Our greatest little adventure. 👨‍👩‍👦❤️"
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
            "Again and again and again, Asawa. ❤️"
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
            "That's the answer, My Love. Always. ❤️"
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

    if (
        quizIndex >=
        quizQuestions.length
    ) {

        finishLevelOne();

        return;
    }


    const question =
        quizQuestions[quizIndex];


    const questionNumber =
        document.getElementById(
            "question-number"
        );


    const questionText =
        document.getElementById(
            "question"
        );


    const progress =
        document.getElementById(
            "quiz-progress"
        );


    const answers =
        document.getElementById(
            "answers"
        );


    const feedback =
        document.getElementById(
            "quiz-feedback"
        );


    if (questionNumber) {

        questionNumber.textContent =
            quizIndex + 1;
    }


    if (questionText) {

        questionText.textContent =
            question.question;
    }


    if (progress) {

        progress.style.width =
            `${
                (
                    (quizIndex + 1) /
                    quizQuestions.length
                ) * 100
            }%`;
    }


    if (!answers) {

        console.error(
            "Quiz answers container not found."
        );

        return;
    }


    answers.innerHTML = "";


    if (feedback) {

        feedback.textContent = "";
    }


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    selectQuizAnswer(
                        index,
                        button
                    );

                }
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

    if (quizLocked) {
        return;
    }


    quizLocked = true;


    const question =
        quizQuestions[quizIndex];


    const buttons =
        document.querySelectorAll(
            "#answers button"
        );


    const feedback =
        document.getElementById(
            "quiz-feedback"
        );


    buttons.forEach(
        (button, index) => {

            button.disabled =
                true;


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


        if (feedback) {

            feedback.textContent =
                question.message;
        }

    } else {

        selectedButton.classList.add(
            "wrong"
        );


        if (feedback) {

            feedback.textContent =
                "Almost, Mommy! Love pa rin kita. 😘";
        }
    }


    setTimeout(() => {

        const lastQuestion =
            quizIndex ===
            quizQuestions.length - 1;


        if (lastQuestion) {

            finishLevelOne();

            return;
        }


        quizIndex++;

        quizLocked = false;

        renderQuestion();

    }, 900);
}


function finishLevelOne() {

    highestUnlockedLevel =
        Math.max(
            highestUnlockedLevel,
            2
        );


    completeLevel(
        1,
        25,
        "Our Beginning ❤️",
        "Good job, Mommy! You unlocked the next chapter of our story."
    );
}


/* =========================================================
   LEVEL 2
   MEMORY GAME
========================================================= */

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


    const matchesElement =
        document.getElementById(
            "matches"
        );


    if (matchesElement) {

        matchesElement.textContent =
            0;
    }


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


    if (!grid) {
        return;
    }


    grid.innerHTML = "";


    deck.forEach(photo => {

        const card =
            document.createElement(
                "button"
            );


        card.type =
            "button";


        card.className =
            "memory-card";


        card.dataset.id =
            photo.id;


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


        card.addEventListener(
            "click",
            () => flipMemoryCard(card)
        );


        grid.appendChild(card);

    });
}


function flipMemoryCard(card) {

    if (
        memoryLocked ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
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

    const first =
        flippedCards[0];


    const second =
        flippedCards[1];


    if (!first || !second) {
        return;
    }


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


        const matchesElement =
            document.getElementById(
                "matches"
            );


        if (matchesElement) {

            matchesElement.textContent =
                matches;
        }


        addScore(10);


        flippedCards = [];


        showToast(
            "Memory matched, Love! +10 ❤️"
        );


        if (matches === 5) {

            setTimeout(() => {

                completeLevel(
                    2,
                    25,
                    "Our Memories 🧩",
                    "Five photos, but so many memories behind them, Mommy. ❤️"
                );

            }, 700);
        }

    } else {

        memoryLocked =
            true;


        setTimeout(() => {

            first.classList.remove(
                "flipped"
            );


            second.classList.remove(
                "flipped"
            );


            flippedCards = [];

            memoryLocked =
                false;

        }, 900);
    }
}


/* =========================================================
   LEVEL 3
   HEART HUNT
========================================================= */

let heartsFound = 0;


function resetHeartHunt() {

    heartsFound = 0;


    const counter =
        document.getElementById(
            "hearts-found"
        );


    if (counter) {

        counter.textContent =
            0;
    }


    document.querySelectorAll(
        ".hidden-heart"
    ).forEach(heart => {

        heart.classList.remove(
            "found"
        );


        heart.disabled =
            false;

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


    heart.disabled =
        true;


    heartsFound++;


    const counter =
        document.getElementById(
            "hearts-found"
        );


    if (counter) {

        counter.textContent =
            heartsFound;
    }


    addScore(10);


    showToast(
        "You found my heart, Asawa ❤️ +10"
    );


    if (heartsFound === 5) {

        setTimeout(() => {

            completeLevel(
                3,
                25,
                "Our Adventures 🇯🇵",
                "I'd travel anywhere as long as I get to experience it with you, Love."
            );

        }, 650);
    }
}


/* =========================================================
   LEVEL 4
   FAMILY
========================================================= */

const familyMessages = [

    "Mommy, watching you with Jarren gives me another reason to love and admire you. Thank you for being such an amazing Mommy to our little boy. ❤️",

    "My favorite team: Mommy, Daddy, and Jarren. Our little family is the best thing we've built together, Asawa. 👨‍👩‍👦❤️"

];


let viewedFamilyMemories =
    new Set();


function resetFamily() {

    viewedFamilyMemories =
        new Set();


    const counter =
        document.getElementById(
            "family-count"
        );


    if (counter) {

        counter.textContent =
            0;
    }


    const message =
        document.getElementById(
            "family-message"
        );


    if (message) {

        message.textContent =
            "Choose a memory ❤️";
    }


    const continueButton =
        document.getElementById(
            "family-continue"
        );


    if (continueButton) {

        continueButton.classList.add(
            "hidden"
        );
    }


    document.querySelectorAll(
        ".family-photo"
    ).forEach(photo => {

        photo.classList.remove(
            "viewed"
        );

    });
}


function showFamilyMemory(index) {

    const message =
        document.getElementById(
            "family-message"
        );


    if (message) {

        message.textContent =
            familyMessages[index];
    }


    if (
        !viewedFamilyMemories.has(
            index
        )
    ) {

        viewedFamilyMemories.add(
            index
        );


        const photo =
            document.getElementById(
                `family-photo-${index}`
            );


        if (photo) {

            photo.classList.add(
                "viewed"
            );
        }


        const counter =
            document.getElementById(
                "family-count"
            );


        if (counter) {

            counter.textContent =
                viewedFamilyMemories.size;
        }


        addScore(10);
    }


    if (
        viewedFamilyMemories.size ===
        2
    ) {

        const continueButton =
            document.getElementById(
                "family-continue"
            );


        if (continueButton) {

            continueButton.classList.remove(
                "hidden"
            );
        }
    }
}


function completeFamily() {

    completeLevel(
        4,
        25,
        "Our Little Family 👨‍👩‍👦",
        "Mommy, you unlocked the final chapter of our adventure. ❤️"
    );
}


/* =========================================================
   LEVEL 5
========================================================= */

let letterOpened = false;


function resetLetter() {

    letterOpened = false;


    const envelope =
        document.getElementById(
            "envelope"
        );


    const letter =
        document.getElementById(
            "letter-content"
        );


    if (envelope) {

        envelope.classList.remove(
            "hidden"
        );
    }


    if (letter) {

        letter.classList.add(
            "hidden"
        );
    }
}


function openLetter() {

    if (letterOpened) {
        return;
    }


    letterOpened =
        true;


    const envelope =
        document.getElementById(
            "envelope"
        );


    const letter =
        document.getElementById(
            "letter-content"
        );


    if (envelope) {

        envelope.classList.add(
            "hidden"
        );
    }


    if (letter) {

        letter.classList.remove(
            "hidden"
        );
    }


    if (
        !completedLevels.has(5)
    ) {

        addScore(25);
    }


    createHeartBurst();


    showToast(
        "One last message from me, Mommy ❤️"
    );
}


/* =========================================================
   FINAL
========================================================= */

function showFinal() {

    if (
        !completedLevels.has(5)
    ) {

        completedLevels.add(5);

        addScore(50);
    }


    currentLevel =
        5;


    highestUnlockedLevel =
        5;


    updateHUD();


    const finalScore =
        document.getElementById(
            "final-score"
        );


    if (finalScore) {

        finalScore.textContent =
            score;
    }


    showScreen(
        "final-screen"
    );


    launchConfetti(90);
}


/* =========================================================
   GIFT
========================================================= */

let giftOpened = false;


function openGift() {

    if (giftOpened) {
        return;
    }


    giftOpened =
        true;


    const gift =
        document.getElementById(
            "gift"
        );


    const giftMessage =
        document.getElementById(
            "gift-message"
        );


    const tapGift =
        document.querySelector(
            ".tap-gift"
        );


    if (gift) {

        gift.classList.add(
            "opened"
        );
    }


    setTimeout(() => {

        if (gift) {

            gift.style.display =
                "none";
        }


        if (tapGift) {

            tapGift.style.display =
                "none";
        }


        if (giftMessage) {

            giftMessage.classList.remove(
                "hidden"
            );
        }


        launchConfetti(150);

        createHeartBurst();


        if (giftMessage) {

            setTimeout(() => {

                giftMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 200);
        }

    }, 450);
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    if (toastTimer) {

        clearTimeout(
            toastTimer
        );
    }


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 1800);
}


/* =========================================================
   SHUFFLE
========================================================= */

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


    return array;
}


/* =========================================================
   FLOATING HEARTS
========================================================= */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "floating-hearts"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floating-heart";


    const hearts = [
        "❤️",
        "💕",
        "💗",
        "💖"
    ];


    heart.textContent =
        hearts[
            Math.floor(
                Math.random() *
                hearts.length
            )
        ];


    heart.style.left =
        `${Math.random() * 100}%`;


    heart.style.fontSize =
        `${12 + Math.random() * 18}px`;


    heart.style.animationDuration =
        `${7 + Math.random() * 7}s`;


    container.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, 15000);
}


setInterval(
    createFloatingHeart,
    1600
);


/* =========================================================
   HEART BURST
========================================================= */

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


/* =========================================================
   CONFETTI
========================================================= */

function launchConfetti(amount = 70) {

    const container =
        document.getElementById(
            "confetti-container"
        );


    if (!container) {
        return;
    }


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
            `${10 + Math.random() * 16}px`;


        piece.style.animationDuration =
            `${2.5 + Math.random() * 3}s`;


        piece.style.animationDelay =
            `${Math.random()}s`;


        container.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, 7000);
    }
}


/* =========================================================
   ENVELOPE KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const envelope =
            document.getElementById(
                "envelope"
            );


        if (
            envelope &&
            document.activeElement === envelope &&
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


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        score = 0;

        currentLevel = 0;

        highestUnlockedLevel = 1;


        updateHUD();

        refreshMap();


        const modal =
            document.getElementById(
                "level-complete-modal"
            );


        if (modal) {

            modal.classList.add(
                "hidden"
            );
        }


        console.log(
            "❤️ Birthday Adventure loaded successfully."
        );
    }
);
