const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "None of these"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  },
  {
    question: "Which tag is used to define a paragraph in HTML?",
    options: ["<p>", "<div>", "<a>", "<span>"],
    answer: "<p>"
  },
  {
    question: "Which is used for Connect To Database?",
    options: [
      "PHP",
      "HTML",
      "JS",
      "All"
    ],
    answer: "PHP"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Common Style Sheet",
      "Computer Style Sheet",
      "Colorful Style Sheet",
      "Cascading Style Sheet"
    ],
    answer: "Cascading Style Sheet"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "<!-- -->"],
    answer: "//"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timer;
let timeLeft = 10;

const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultBtn = document.getElementById("result-btn");
const timeDisplay = document.getElementById("time");
const resultBox = document.getElementById("result-box");
const quizBox = document.getElementById("quiz-box");
const scoreDisplay = document.getElementById("score-display");
const summary = document.getElementById("summary");
const progressFill = document.getElementById("progress");

function loadQuestion(index) {
  stopTimer();
  startTimer();

  const q = quizData[index];
  questionNumberEl.innerText = `Question ${index + 1} of ${quizData.length}`;
  questionTextEl.innerText = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      stopTimer();
      selectAnswer(btn, q.answer);
    };
    optionsEl.appendChild(btn);
  });

  updateProgress();
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsEl.querySelectorAll("button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("incorrect");
    }
  });

  const isCorrect = selectedBtn.innerText === correctAnswer;
  if (isCorrect) score++;

  userAnswers.push({ correct: isCorrect, question: quizData[currentQuestion].question });
}

function updateProgress() {
  const progressPercent = ((currentQuestion) / quizData.length) * 100;
  progressFill.style.width = `${progressPercent}%`;
}

function startTimer() {
  timeLeft = 10;
  timeDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      autoNext();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function autoNext() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  userAnswers.push({ correct: false, question: quizData[currentQuestion].question });

  setTimeout(() => {
    if (currentQuestion < quizData.length - 1) {
      currentQuestion++;
      loadQuestion(currentQuestion);
      if (currentQuestion === quizData.length - 1) {
        nextBtn.style.display = "none";
        resultBtn.style.display = "inline-block";
      }
    } else {
      showResults();
    }
  }, 1000);
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
    if (currentQuestion === quizData.length - 1) {
      nextBtn.style.display = "none";
      resultBtn.style.display = "inline-block";
    }
  }
});

resultBtn.addEventListener("click", showResults);

function showResults() {
  quizBox.style.display = "none";
  resultBox.style.display = "block";
  scoreDisplay.innerText = `You scored ${score} out of ${quizData.length}`;
  progressFill.style.width = `100%`;

  summary.innerHTML = "";
  userAnswers.forEach((entry, i) => {
    const div = document.createElement("div");
    div.innerText = `Q${i + 1}: ${entry.question} - ${entry.correct ? "✅ Correct" : "❌ Incorrect"}`;
    summary.appendChild(div);
  });
}

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  resultBox.style.display = "none";
  quizBox.style.display = "block";
  nextBtn.style.display = "inline-block";
  resultBtn.style.display = "none";
  loadQuestion(currentQuestion);
});

window.onload = () => {
  loadQuestion(currentQuestion);
};
