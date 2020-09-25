const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wordsCount = document.querySelector(".words-written");

var timerRunning = false;
var timer = [0, 0, 0, 0];
var interval;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = `0${time}`;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTimer = `${leadingZero(timer[0])}:${leadingZero(timer[1])}:${leadingZero(timer[2])}`;
    let words = testArea.value.split(' ').length;
    wordsCount.innerHTML = `${words} Words`;
    theTimer.innerHTML = currentTimer;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    //so that each time we complete a full minute this seconds counter resets
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    //so that each time we complete a hundred 1/100 of a second the counter resets, also after a full minute we reset
    timer[2] = Math.floor((timer[3] - (timer[1] * 100) - (timer[0] * 6000)));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let OriginTextMatch = originText.substring(0, textEntered.length);

    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
    } else {
        if (textEntered == OriginTextMatch) {
            testWrapper.style.borderColor = "#65CCF3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Start the timer:
function start() {
    let textLength = testArea.value.length;
    if (textLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    wordsCount.innerHTML = "0 Words";
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);