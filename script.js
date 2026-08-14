/* ==========================================
   MATCH MASTER
   A Global Learning Game
========================================== */


/* ==========================================
   HTML ELEMENTS
========================================== */

const loginScreen =
    document.getElementById("loginScreen");

const categoryScreen =
    document.getElementById("categoryScreen");

const gameScreen =
    document.getElementById("gameScreen");

const resultScreen =
    document.getElementById("resultScreen");


const usernameInput =
    document.getElementById("username");

const loginBtn =
    document.getElementById("loginBtn");

const loginError =
    document.getElementById("loginError");


const welcomeName =
    document.getElementById("welcomeName");

const gameName =
    document.getElementById("gameName");

const resultName =
    document.getElementById("resultName");


const categorySelect =
    document.getElementById("category");

const startBtn =
    document.getElementById("startBtn");


const itemsContainer =
    document.getElementById("items");

const targetsContainer =
    document.getElementById("targets");


const scoreElement =
    document.getElementById("score");

const totalElement =
    document.getElementById("total");

const gameMessage =
    document.getElementById("gameMessage");


const resultImages =
    document.getElementById("resultImages");

const finalScore =
    document.getElementById("finalScore");

const finalTotal =
    document.getElementById("finalTotal");

const percentageScore =
    document.getElementById("percentageScore");


const backBtn =
    document.getElementById("backBtn");


const logoutBtn =
    document.getElementById("logoutBtn");

const gameLogoutBtn =
    document.getElementById("gameLogoutBtn");

const resultLogoutBtn =
    document.getElementById("resultLogoutBtn");

const wrongScore =
    document.getElementById("wrongScore");

const resultMessage =
    document.getElementById("resultMessage");

const categoryBtn =
    document.getElementById("categoryBtn");


/* ==========================================
   GAME DATA
========================================== */

const gameData = {


    /* ======================================
       MONUMENT
    ====================================== */

    monument: [

        {
            id: "taj",

            image:
                "Taj_Mahal.jpeg",

            answer:
                "Agra",

            name:
                "Taj Mahal"
        },


        {
            id: "konark",

            image:
                "konark_temple.jpg",

            answer:
                "Odisha",

            name:
                "Konark Sun Temple"
        },


        {
            id: "redfort",

            image:
                "red_fort.webp",

            answer:
                "Delhi",

            name:
                "Red Fort"
        }

    ],


    /* ======================================
       FLAGS
    ====================================== */

    flag: [

        {
            id: "india",

            image:
                "indian_flag.webp",

            answer:
                "India",

            name:
                "Indian Flag"
        },


        {
            id: "pakistan",

            image:
                "pak_flag.webp",

            answer:
                "Pakistan",

            name:
                "Pakistani Flag"
        },


        {
            id: "bangladesh",

            image:
                "bangladesh_flag.webp",

            answer:
                "Bangladesh",

            name:
                "Bangladeshi Flag"
        }

    ],


    /* ======================================
       LANDMARKS
    ====================================== */

    landmark: [

        {
            id: "eiffel",

            image:
                "eiffel_tower.jpg",

            answer:
                "France",

            name:
                "Eiffel Tower"
        },


        {
            id: "china",

            image:
                "great_wall.jpeg",

            answer:
                "China",

            name:
                "Great Wall"
        },


        {
            id: "taj",

            image:
                "Taj_Mahal.jpeg",

            answer:
                "India",

            name:
                "Taj Mahal"
        }

    ],


    /* ======================================
       CURRENCY
    ====================================== */

    currency: [

        {
            id: "india",

            image:
                "indian_notes.jpg",

            answer:
                "Indian Rupee",

            name:
                "India"
        },


        {
            id: "bangladesh",

            image:
                "bangladesh_notes.jpg",

            answer:
                "Taka",

            name:
                "Bangladesh"
        },


        {
            id: "japan",

            image:
                "japan_notes.jpg",

            answer:
                "Yen",

            name:
                "Japan"
        }

    ],


    /* ======================================
       HISTORICAL FIGURES
    ====================================== */

    history: [

        {
            id: "gandhi",

            image:
                "mahatma_gandhi.jpg",

            answer:
                "India",

            name:
                "Mahatma Gandhi"
        },


        {
            id: "mandela",

            image:
                "nelson_mandela.jpg",

            answer:
                "South Africa",

            name:
                "Nelson Mandela"
        },


        {
            id: "lincoln",

            image:
                "abraham_lincolon.jpg",

            answer:
                "United States",

            name:
                "Abraham Lincoln"
        }

    ],

};


/* ==========================================
   GAME VARIABLES
========================================== */

let currentData = [];

let score = 0;

let draggedId = null;

let username =
    localStorage.getItem(
        "matchMasterUser"
    ) || "";


/* ==========================================
   SCREEN MANAGEMENT
========================================== */

function showScreen(screen) {

    loginScreen.classList.add(
        "hidden"
    );

    categoryScreen.classList.add(
        "hidden"
    );

    gameScreen.classList.add(
        "hidden"
    );

    resultScreen.classList.add(
        "hidden"
    );


    screen.classList.remove(
        "hidden"
    );
}


/* ==========================================
   LOGIN
========================================== */

function login() {

    const name =
        usernameInput.value.trim();


    if (name === "") {

        loginError.textContent =
            "Please enter your name.";

        return;
    }


    username = name;


    localStorage.setItem(
        "matchMasterUser",
        username
    );


    loginError.textContent = "";


    showCategory();
}


/* ==========================================
   CATEGORY SCREEN
========================================== */

function showCategory() {

    welcomeName.textContent =
        username;


    showScreen(
        categoryScreen
    );
}


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem(
        "matchMasterUser"
    );


    username = "";


    usernameInput.value = "";


    showScreen(
        loginScreen
    );
}


/* ==========================================
   SHUFFLE
========================================== */

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );
}


/* ==========================================
   START GAME
========================================== */

function startGame() {

    const category =
        categorySelect.value;


    currentData =
        shuffle(
            gameData[category]
        );


    score = 0;

    draggedId = null;


    scoreElement.textContent =
        score;


    totalElement.textContent =
        currentData.length;


    gameName.textContent =
        username;


    gameMessage.textContent = "";


    itemsContainer.innerHTML = "";

    targetsContainer.innerHTML = "";


    showScreen(
        gameScreen
    );


    createItems();

    createTargets();
}


/* ==========================================
   CREATE DRAGGABLE ITEMS
========================================== */

function createItems() {

    currentData.forEach(
        item => {

            const image =
                document.createElement(
                    "img"
                );


            image.src =
                item.image;


            image.alt =
                item.name;


            image.className =
                "draggable";


            image.draggable =
                true;


            image.dataset.id =
                item.id;


            /* --------------------------
               DRAG START
            -------------------------- */

            image.addEventListener(
                "dragstart",
                event => {

                    draggedId =
                        item.id;


                    image.classList.add(
                        "dragging"
                    );


                    event.dataTransfer.setData(
                        "text/plain",
                        item.id
                    );


                    event.dataTransfer.effectAllowed =
                        "move";
                }
            );


            /* --------------------------
               DRAG END
            -------------------------- */

            image.addEventListener(
                "dragend",
                () => {

                    image.classList.remove(
                        "dragging"
                    );

                }
            );


            itemsContainer.appendChild(
                image
            );

        }
    );
}


/* ==========================================
   CREATE DROP TARGETS
========================================== */

function createTargets() {

    const shuffled =
        shuffle(
            currentData
        );


    shuffled.forEach(
        item => {

            const target =
                document.createElement(
                    "div"
                );


            target.className =
                "target";


            target.dataset.id =
                item.id;


            target.textContent =
                item.answer;


            /* --------------------------
               DRAG OVER
            -------------------------- */

            target.addEventListener(
                "dragover",
                event => {

                    if (
                        !target.classList.contains(
                            "correct"
                        )
                    ) {

                        event.preventDefault();


                        target.classList.add(
                            "over"
                        );
                    }

                }
            );


            /* --------------------------
               DRAG LEAVE
            -------------------------- */

            target.addEventListener(
                "dragleave",
                () => {

                    target.classList.remove(
                        "over"
                    );

                }
            );


            /* --------------------------
               DROP
            -------------------------- */

            target.addEventListener(
                "drop",
                event => {

                    event.preventDefault();


                    target.classList.remove(
                        "over"
                    );


                    const id =
                        event.dataTransfer
                            .getData(
                                "text/plain"
                            )
                        || draggedId;


                    checkAnswer(
                        id,
                        target,
                        item
                    );

                }
            );


            targetsContainer.appendChild(
                target
            );

        }
    );
}


/* ==========================================
   CHECK ANSWER
========================================== */

function checkAnswer(
    id,
    target,
    targetItem
) {


    /* Already matched */

    if (
        target.classList.contains(
            "correct"
        )
    ) {

        return;
    }


    /* ==============================
       CORRECT
    ============================== */

    if (
        id === targetItem.id
    ) {

        score++;


        scoreElement.textContent =
            score;


        target.classList.add(
            "correct"
        );


        const originalImage =
            [
                ...itemsContainer.children
            ].find(
                image =>
                    image.dataset.id === id
            );


        if (originalImage) {

            const clonedImage =
                originalImage.cloneNode(
                    true
                );


            clonedImage.draggable =
                false;


            target.innerHTML = "";


            target.appendChild(
                clonedImage
            );


            originalImage.remove();
        }


        gameMessage.textContent =
            "Correct! 🎉";


        gameMessage.style.color =
            "#3d8f42";


        /* ==============================
           GAME COMPLETE
        ============================== */

        if (
            score ===
            currentData.length
        ) {

            setTimeout(
                showResult,
                600
            );

        }

    }


    /* ==============================
       WRONG
    ============================== */

    else {

        target.classList.add(
            "wrong"
        );


        gameMessage.textContent =
            "Wrong answer! Try again.";


        gameMessage.style.color =
            "#d94444";


        setTimeout(
            () => {

                target.classList.remove(
                    "wrong"
                );

            },
            400
        );

    }

}


/* ==========================================
   RESULT SCREEN
========================================== */

function showResult() {

    showScreen(resultScreen);

    resultName.textContent = username;

    resultImages.innerHTML = "";

    /* Show completed images */

    currentData.forEach(item => {

        const image =
            document.createElement("img");

        image.src = item.image;

        image.alt = item.name;

        resultImages.appendChild(image);

    });


    /* Calculate results */

    const total =
        currentData.length;

    const wrong =
        total - score;

    const percentage =
        Math.round(
            (score / total) * 100
        );


    /* Display results */

    finalScore.textContent =
        score;

    finalTotal.textContent =
        total;

    wrongScore.textContent =
        wrong;

    percentageScore.textContent =
        percentage + "%";


    /* Result message */

    if (percentage === 100) {

        resultMessage.textContent =
            "🏆 Excellent! Perfect Score!";

    }

    else if (percentage >= 70) {

        resultMessage.textContent =
            "🎉 Great Job! Keep Learning!";

    }

    else if (percentage >= 40) {

        resultMessage.textContent =
            "👍 Good Try! You Can Do Better!";

    }

    else {

        resultMessage.textContent =
            "📚 Keep Practicing and Try Again!";

    }
}



/* ==========================================
   RESULT BUTTONS
========================================== */

backBtn.addEventListener(
    "click",
    startGame
);


categoryBtn.addEventListener(
    "click",
    showCategory
);


/* ==========================================
   EVENT LISTENERS
========================================== */

loginBtn.addEventListener(
    "click",
    login
);


usernameInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            login();

        }

    }
);


startBtn.addEventListener(
    "click",
    startGame
);


logoutBtn.addEventListener(
    "click",
    logout
);


gameLogoutBtn.addEventListener(
    "click",
    logout
);


resultLogoutBtn.addEventListener(
    "click",
    logout
);


/* ==========================================
   AUTO LOGIN
========================================== */

if (username !== "") {

    showCategory();

} else {

    showScreen(
        loginScreen
    );

}