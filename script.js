let timer;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

window.addEventListener('load', () => {
    loadLaps();
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            elapsedTime += 10;
            updateDisplay();
        }, 10);
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    lapsContainer.innerHTML = '';
    localStorage.removeItem('laps');
}

function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
        saveLap(lapTime);
    }
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;
    return `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}

function saveLap(lapTime) {
    let laps = JSON.parse(localStorage.getItem('laps')) || [];
    laps.push(lapTime);
    localStorage.setItem('laps', JSON.stringify(laps));
}

function loadLaps() {
    let laps = JSON.parse(localStorage.getItem('laps')) || [];
    laps.forEach(lapTime => {
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    });
}
