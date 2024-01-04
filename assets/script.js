var startButton = document.getElementById('start-btn')
var timeValue = document.querySelector(".timeLeft")
var userValue = document.querySelector(".userScore")
var secondsLeft = 30
var userScore = 0
var currentQuestion = 0;
var overlay = document.querySelector(".start")
var hiscores = localStorage.getItem("Score")
var initialHiScore = localStorage.getItem("Initials")

var questions = [
  {
    q: "What is a function?", 
    a: [
      { text: "Reusable block of code", correct: true},
      { text: "A party", correct: false},
      { text: "A way to repeat code in a loop", correct: false},
      { text: "Another name for JavaScript", correct: false}
    ]
  },
  { q: "What language is commonly used to change the styling of a web page?", 
  a: [
    { text: "Python", correct: false},
    { text: "Photoshop", correct: false},
    { text: "CSS", correct: true},
    { text: "MS Paint", correct: false}
  ]},
  {
    q: "What type of value is true/false?", 
    a: [
      { text: "NaN", correct: false},
      { text: "Boolean", correct: true},
      { text: "Object", correct: false},
      { text: "String", correct: false}
    ]
  },
  {
    q: "What type of language is HTML?", 
    a: [
      { text: "Scripting", correct: false},
      { text: "Markup", correct: true},
      { text: "Programming", correct: false},
      { text: "None of the above", correct: false}
    ]
  },
]

function startGame() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeValue.textContent = secondsLeft

    if(secondsLeft === 0 || currentQuestion >= questions.length || secondsLeft < 0) {
      clearInterval(timerInterval);
      endGame()
    }

  }, 1000);

  var removePreGame = document.querySelectorAll('.pre-game')
  removePreGame.forEach(function (element) {
  element.remove()
})
nextQuestion()

function nextQuestion() {
  if (currentQuestion < questions.length) {
  var questionText = questions[currentQuestion].q
  var pTag = document.createElement('p');
  pTag.textContent = questionText
  overlay.appendChild(pTag)

  questions[currentQuestion].a.forEach(function (answer, index) {
    var btn = document.createElement("button");
    btn.textContent =  answer.text
    btn.addEventListener('click', function() {
      checkAnswer(index)
    })
    overlay.appendChild(btn);
  })
function checkAnswer(index) {
  if(questions[currentQuestion].a[index].correct) {
    userScore++
    userValue.textContent = userScore
    var clear = document.querySelector(".start");
    clear.innerHTML = ""
    currentQuestion++
    nextQuestion();
  } else {
    secondsLeft -= 5
    var clear = document.querySelector(".start");
    clear.innerHTML = ""
    currentQuestion++
    nextQuestion();
  }
}
}}}

function endGame() {
  var initials = prompt("The game is over! Please enter your initials")
  if (initials.length !== 2) {
    alert("Your initials must be 2 characters long!")
    return endGame();  
  } else {
    localStorage.setItem("Initials", initials)
    localStorage.setItem("Score", userScore)


  }
}

startButton.addEventListener('click', startGame)