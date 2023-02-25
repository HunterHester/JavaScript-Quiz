const cardEl = document.querySelector('.card');
const timeEl = document.querySelector('.time');

//function for timer
let secondsLeft = 15; 
function setTime() {
    const timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }

    }, 1000);
};

setTime();