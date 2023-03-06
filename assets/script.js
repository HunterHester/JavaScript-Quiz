//Selectors!!
const cardEl = document.querySelector('.card');
const timeEl = document.querySelector('.time');
const confirmButton = document.querySelector('#confirm');
const cardBodyEl = document.querySelector('.card-body');
const headerEl = document.querySelector('.card-header');


//Creating and initializing variables
let correctCounter = 0;
let incorrectCounter = 0;
let isWin = false;
let secondsLeft = 300; 
let timerInterval;


//Questions and answers in an array containing individual objects for every question
const questions = [ {
    question: "What is the correct way to write a JavaScript Array?",
    answers: ['var numbers = (1,2,3,4)', 'var numbers = [1,2,3,4]'],
    correctAnswer: 1
    },
    {
    question: "JavaScript is the same as Java.",
    answers: ['True', 'False'],
    correctAnswer: 1
    },
    {
    question: "JavaScript is Case Sensitive.",
    answers: ['True', 'False'],
    correctAnswer: 0
    },
    {
        question: "How do you call a function named 'myFunction'?",
        answers: ["myFunction()", "function myFunction()"],
        correctAnswer: 0 
    }
];


//basic function for timer
function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz()
        }

    }, 1000);
};


function startQuiz() {
    secondsLeft = 90;
    confirmButton.disabled = true;
    setTime();
    
    //initalizing questionNum
    let questionNum = 0;
    displayQuestion(questionNum);
  

    function displayQuestion(index) {
      cardBodyEl.innerHTML = "";
      
      //creates question element and displays it on webpage
      const questionEl = document.createElement("h3");
      questionEl.textContent = questions[index].question;
      cardBodyEl.appendChild(questionEl);

      //creates answer buttons using for loop
      for (let i = 0; i < questions[index].answers.length; i++) {
        const answerBtn = document.createElement("button");
        answerBtn.textContent = questions[index].answers[i];
        answerBtn.setAttribute("data-answer", i);
        answerBtn.classList.add("answer-btn");
        cardBodyEl.appendChild(answerBtn);
        cardBodyEl.appendChild(document.createElement("br"));
        
        // Add event listener to answer button
        answerBtn.addEventListener("click", function(event) {
          const selectedAnswer = parseInt(event.target.getAttribute("data-answer"));
          
          //determines if answer is correct
          if (selectedAnswer === questions[index].correctAnswer) {
            // Display a success message and move to the next question
            const successEl = document.createElement("p");
            successEl.textContent = "Correct!";
            cardBodyEl.appendChild(successEl);
            correctCounter++;
            
            questionNum++;
            if (questionNum < questions.length) {
              displayQuestion(questionNum);
            } else {
              endQuiz();
            }
          } else {
            // Display an error message and subtract time
            const errorEl = document.createElement("p");
            errorEl.textContent = "Incorrect!";
            cardBodyEl.appendChild(errorEl);
            
            secondsLeft -= 10;
            incorrectCounter++;

            questionNum++;
            if (questionNum < questions.length) {
              displayQuestion(questionNum);
            } else {
              endQuiz();
            }
          }
        });
      }
    }
  }


function endQuiz() {
  clearInterval(timerInterval);
  timeEl.textContent = "";

  console.log("You have gotten", correctCounter, "right and", incorrectCounter, "wrong!");
  cardBodyEl.innerHTML = "";
  headerEl.innerHTML = "";

  const resultsHeader = document.createElement("h2");
  resultsHeader.textContent = "You have completed the quiz!"
  headerEl.appendChild(resultsHeader);

  const resultsEl = document.createElement("h3");
  resultsEl.textContent = "Please enter your initials to add to the scoreboard:";
  cardBodyEl.appendChild(resultsEl);

  const initialsInput = document.createElement("input");
  initialsInput.setAttribute("type", "text");
  initialsInput.setAttribute("maxlength", "3");
  cardBodyEl.appendChild(initialsInput);

  const submitBtn = document.createElement("button")
  submitBtn.textContent = "Submit";
  cardBodyEl.appendChild(submitBtn);

  submitBtn.addEventListener("click", function(event){
    event.preventDefault();

    const scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];
    scoreboard.push({
      Initials: initialsInput.value.trim().toUpperCase(),
      Score: correctCounter
    });
    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    renderMessage();

  });

  function renderMessage() {
    const scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

    if (scoreboard !== null) {
      cardBodyEl.innerHTML = "";

      const scoreboardEl = document.createElement("h3");
      scoreboardEl.textContent = "Scoreboard:";
      cardBodyEl.appendChild(scoreboardEl);

      const scoreboardList = document.createElement("ul");

      scoreboard.forEach(function(score) {
        const scoreboardItem = document.createElement("li");
        scoreboardItem.textContent = score.Initials + ": " + score.Score;
        scoreboardList.appendChild(scoreboardItem);
      });

      cardBodyEl.appendChild(scoreboardList);
    }
  }

  confirmButton.disabled = false;
}

  
  

confirmButton.addEventListener('click', startQuiz);
