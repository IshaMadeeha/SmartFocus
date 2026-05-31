/*
Create full Smart Study Assistant functionality.

Requirements:

1. TIMER:
- 25-minute timer
- Start and Stop buttons
- Prevent multiple intervals

2. STUDY MODES:
- Homework: 25 min
- Exam: 50 min
- Quick: 15 min
- Change timer based on dropdown

3. WEBCAM:
- Access webcam using getUserMedia
- Display video in element with id "video"

4. EMOTION SIMULATION:
- Every 10 seconds randomly choose:
  Happy, Neutral, Stressed
- Display emotion in "emotionText"

5. SUGGESTIONS:
- Show message based on emotion

6. SMART BEHAVIOR:
- If Happy → increase time slightly
- If Stressed → suggest break

7. PRODUCTIVITY SCORE:
- Increase/decrease score
- Log in console

8. NOTIFICATIONS:
- Ask permission
- Notify when session completes
*/

/*
Fix the timer initialization issue.

Requirements:
- Set default timer to 25 minutes (1500 seconds)
- Display timer as 25:00 on page load
- Ensure timer does not start at 00:00
- Call a function to update timer display when page loads
*/


// Timer variables
let timer;
let timeLeft = 1500; // 25 minutes in seconds
let isRunning = false;

// Emotion variables
const emotions = ["Happy", "Neutral", "Stressed"];
let currentEmotion = "Neutral";


// Productivity score
let productivityScore = 0;

// DOM elements
const timerDisplay = document.getElementById("timer");
const emotionText = document.getElementById("emotionText");
const videoElement = document.getElementById("video");
/*
Connect buttons with timer functions
*/
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

// Initialize timer display on page load
updateTimerDisplay();

// Start timer function
function startTimer() {
    if (isRunning) return; // Prevent multiple intervals
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            notifyCompletion();
        }
    }, 1000);
}

// Stop timer function
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

/*
Fix timer display formatting.

Requirements:
- Display time in MM:SS format
- Always show two digits (e.g., 05:09)
- Update display every second
- Use the element with id "timer"
*/ 

/*
Fix button enable/disable behavior.

Requirements:
- Start button should be enabled initially
- Stop button should be disabled initially
- When timer starts:
    disable Start button
    enable Stop button
- When timer stops:
    enable Start button
    disable Stop button
*/          

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


// Change study mode
/*
Fix study mode time setting.

Requirements:
- When user selects a study mode, update timer value:
    Homework → 25 minutes
    Exam → 50 minutes
    Quick Study → 15 minutes
- Reset timer display when mode changes
- Do not auto-start timer on mode change
*/
function changeStudyMode(mode) {
    switch (mode) {
        case "Homework":
            timeLeft = 25 * 60;
            break;
        case "Exam":
            timeLeft = 50 * 60;
            break;
        case "Quick":
            timeLeft = 15 * 60;
            break;
    }
    updateTimerDisplay();
}

// Access webcam
function accessWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoElement.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing webcam: ", err);
        });
}

// Simulate emotion detection
function simulateEmotion() {
    currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    emotionText.textContent = `Current Emotion: ${currentEmotion}`;
    suggestBasedOnEmotion();
}

// Suggest based on emotion
function suggestBasedOnEmotion() {
    if (currentEmotion === "Happy") {
        timeLeft += 60; // Increase time slightly
        productivityScore += 10; // Increase score
        console.log("Productivity Score: ", productivityScore);
    } else if (currentEmotion === "Stressed") {
        alert("You seem stressed. Consider taking a short break!");
        productivityScore -= 10; // Decrease score
        console.log("Productivity Score: ", productivityScore);
    }
}

// Notify when session completes
function notifyCompletion() {
    if (Notification.permission === "granted") {
        new Notification("Study Session Complete!", {
            body: "Great job! Time for a break or start another session."
        });
    }
}

// Request notification permission on page load
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
    accessWebcam();
    setInterval(simulateEmotion, 10000); // Simulate emotion every 10 seconds
});

/*
Ensure webcam is properly displayed.

Requirements:
- Select video element
- Start webcam on page load
- Handle permission errors
- Show alert if camera not accessible
*/

/*
Improve user interaction for timer.

Requirements:
- Show message when timer starts ("Focus mode started")
- Show message when paused ("Timer paused")
- Show alert when session completes
*/

