const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
    },
];
document.getElementById("start-button").addEventListener("click", displayQuestions);
document.getElementById("leaderboard").addEventListener("click", displayHighScores);
let currentIdx = 0, count = 50, isCorrect = false, timer = null, score = 0, div = null, h2 = null, initials = "", btn = null, reset = false,status="Incorrect!";
const inputBox = document.createElement("input");
inputBox.setAttribute("type", "text");
const main = document.getElementsByTagName("main")[0];



function displayQuestions(reset) {
    if (reset) {
        currentIdx = 0;
        score = 0;
    } 
    isCorrect = true;
    displayTime(isCorrect, reset);
    h2 = document.createElement("h2")
    h2.innerHTML = questions[currentIdx].questionText;
    div = document.createElement("div");
    div.setAttribute("class", "container");
    div.setAttribute("id", "question-card");
    div.appendChild(h2);
    questions[currentIdx].options.map((val) => {
        btn = document.createElement("button");
        btn.innerHTML = val;
        div.appendChild(btn);
        btn.addEventListener("click", (event) => (checkAnswer(event)));
    });
    
    main.firstElementChild.remove();
    main.appendChild(div);  
}

function checkAnswer(event) {
    clearInterval(timer);
    if (event.srcElement.outerText !== questions[currentIdx].answer) {
        isCorrect = false;
        status="Incorrect!";
        alert(status);
        count = displayTime(isCorrect, reset);
        clearInterval(timer);
        if (count < 0) {
            displayEndCard();
        }
        else {
            reset = false;
            displayQuestions(reset);
        }
    } else {
        status="Correct!";
        alert(status);
        currentIdx++;
        if (count > 0) score++;
        reset = false;
        if (currentIdx === questions.length) {
            displayEndCard();
        } else {
            displayQuestions(reset);
        }
    }
}




function displayHighScores(score, name) {
    let scores = JSON.parse(localStorage.getItem("highscores")) ? JSON.parse(localStorage.getItem("highscores")) : [];
    if (typeof (score) === "number") {
        scores.push({ name, score });
    }
    div = document.createElement("div");
    div.setAttribute("class", "container");
    div.setAttribute("id", "highscore-card");
    let h2 = document.createElement("h2");
    h2.innerHTML = "HighScores";
    let div3 = document.createElement("div");
    div3.setAttribute("id", "list-container");
    div.appendChild(h2);
    displayScores(scores, div3);
    let div2 = document.createElement("div");
    div2.setAttribute("id", "inner-container");
    let backbtn = document.createElement("button");
    backbtn.innerHTML = "Go Back";
    let clearScoresbtn = document.createElement("button");
    clearScoresbtn.innerHTML = "Clear HighScores";
    backbtn.addEventListener("click", () => {
        reset = true;
        displayQuestions(reset);
    });
    clearScoresbtn.addEventListener("click", () => {
        localStorage.clear();
        displayScores(null, div3);
    });
    div.appendChild(div3);
    div2.appendChild(backbtn);
    div2.appendChild(clearScoresbtn);
    div.appendChild(div2);
    main.firstElementChild.remove();
    main.appendChild(div);
    localStorage.setItem("highscores", JSON.stringify(scores));
}

function displayScores(scores, div) {
    scores ? scores.map((val) => {
        let list = document.createElement("li");
        list.innerText = `${val.name}:${val.score}`;
        list.style = "list-style-type:decimal";
        div.appendChild(list);
    }) : document.getElementById("list-container").remove();
}

function displayTime(isCorrect, reset) {
    if (reset)
        count = 50;
    if (!isCorrect) {
        count -= 10;
    }
    timer = setInterval(() => {
        return count >= 0 ? document.getElementById("time").innerHTML = count-- : "";
    }, 1000);
    return count;
}

function displayEndCard() {
    if (count < 0) document.getElementById("time").innerHTML = 0;
    div = document.createElement("div");
    div.setAttribute("class", "container end-card");
    let div2 = document.createElement("div");
    div2.setAttribute("class", "end-card");
    h2.innerHTML = "All done!";
    let p = document.createElement("p");
    p.innerHTML = `Your final score is ${score}.`;
    let p1 = document.createElement("p");
    p1.innerHTML = "Enter initials:";
    btn = document.createElement("button");
    btn.innerHTML = "submit";

    div.appendChild(h2);
    div.appendChild(p);
    div2.appendChild(p1);
    div2.appendChild(inputBox);
    div2.appendChild(btn);
    div.appendChild(div2);

    main.firstElementChild.remove();
    main.appendChild(div);
    btn.addEventListener("click", () => {
        inputBox.innerHTML = initials;
        checkInitials(inputBox.value);
    });
}

function checkInitials(value) {
    if (value !== "") {
        displayHighScores(score, inputBox.value);
        inputBox.value = "";
    }
    else
        alert("Please enter initials and then submit");
}



