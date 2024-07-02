// update this config!! 
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const saveToCloudButton = document.getElementById('save-to-cloud');

const pomodoroTimer = {
    minutes: 25,
    seconds: 0,
    interval: null
};

document.getElementById('start-timer').addEventListener('click', startPomodoro);
document.getElementById('reset-timer').addEventListener('click', resetPomodoro);

function startPomodoro() {
    if (!pomodoroTimer.interval) {
        pomodoroTimer.interval = setInterval(updateTimer, 1000);
    }
}

function resetPomodoro() {
    clearInterval(pomodoroTimer.interval);
    pomodoroTimer.interval = null;
    pomodoroTimer.minutes = 25;
    pomodoroTimer.seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    if (pomodoroTimer.seconds === 0) {
        if (pomodoroTimer.minutes === 0) {
            resetPomodoro();
            alert('Pomodoro session completed!');
            return;
        } else {
            pomodoroTimer.minutes--;
            pomodoroTimer.seconds = 59;
        }
    } else {
        pomodoroTimer.seconds--;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    document.getElementById('minutes').innerText = String(pomodoroTimer.minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(pomodoroTimer.seconds).padStart(2, '0');
}

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `${taskText} <button onclick="completeTask(this)" class="button highlight2">Complete</button> <button onclick="removeTask(this)" class="button highlight2">Remove</button>`;
        taskList.appendChild(taskItem);
        taskInput.value = '';
        VanillaTilt.init(taskItem, {
            max: 25,
            speed: 400
        });
    }
}

function completeTask(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
}

