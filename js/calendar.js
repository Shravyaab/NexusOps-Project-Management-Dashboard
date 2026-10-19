// Stores the currently selected date
let currentDate = new Date();
// Stores all calendar tasks
let allTasks = {};
// Stores selected week's complete dates
let selectedWeekFullDates = [];
// Stores the selected week's index
let selectedWeekIndex = -1;

let monthScroll = 0;
let weekScroll = 0;
let dayScroll = 0;
let lastSelectedMonthDate = null;
let lastSelectedTime = "";

// Save task into the allTasks object using a unique key
function saveTask(box) {
    lastSelectedTime = box.dataset.time;
    let key = 
    box.dataset.year + "-" + 
    box.dataset.month + "-" +
    box.dataset.date + "-" + 
    box.dataset.day + "-" + 
    box.dataset.time;
    allTasks[key] = box.value.trim();
}

// Show or hide the mini calendar
function toggleCalender() {
    let panel = document.getElementById("mycal-mini-panel");
    panel.style.display = (panel.style.display === "none") ? "block" : "none";
}
// Stores the selected week's dates
let selectedWeekDates = [1, 2, 3, 4, 5, 6, 7];
let selectedDay = null;

// Highlights the currently active tab
function setActiveTab(activeId) {
    document.querySelectorAll(".mycal-tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(activeId).classList.add("active");
}
// Display selected day's tasks
// Generates a 24-hour timeline with 30-minute intervals
function showDay() {
    setActiveTab("mycal-day-btn");
    let html = `
    <div class="mycal-week-header-row">
        <div>Time</div>
        <div class="mycal-selected-day-header">
            ${document.getElementById("mycal-display-header-title").innerHTML}
        </div>
    </div>`;

    for (let i = 0; i < 48; i++) {
        let hour = Math.floor(i / 2);
        let minute = i % 2 === 0 ? "00" : "30";
        let displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        let period = hour < 12 ? "AM" : "PM";
        html += `
            <div class="mycal-day-row">
                <div class="mycal-time-cell">
                    ${displayHour}:${minute} ${period}
                </div>
                <textarea class="mycal-single-event-textarea" readonly>${getDayTask(displayHour + ':' + minute + ' ' + period)}</textarea>
            </div>`;
    }
    document.getElementById("mycal-main-content").innerHTML = html;

    setTimeout(() => {
        document.getElementById("mycal-main-content").scrollTop = dayScroll;
        if (!lastSelectedTime) return;
        const rows = document.querySelectorAll(".mycal-day-row");
        rows.forEach(row => {
            const time = row.querySelector(".mycal-time-cell").innerText.trim();
            if (time === lastSelectedTime) {
                row.scrollIntoView({ block: "center" });
            }
        });
    }, 100);
}

// Display tasks for the selected week
// Creates seven columns (Sunday to Saturday)
function showWeek() {
    setActiveTab("mycal-week-btn");
    let html = `<div class="mycal-week-view-grid-header"><div>Time</div>`;
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    days.forEach((day, i) => {
        html += `<div onclick="selectWeekDay(${i},this)">${day} ${selectedWeekDates[i]}</div>`;
    });
    html += `</div>`;

    for (let i = 0; i < 48; i++) {
        let hour = Math.floor(i / 2);
        let minute = i % 2 === 0 ? "00" : "30";
        let displayHour = hour === 0 ? "12" : hour > 12 ? hour - 12 : hour;
        let ampm = hour < 12 ? "AM" : "PM";
        let timeStr = `${displayHour}:${minute} ${ampm}`;

        html += `<div class="mycal-week-view-data-row"><div class="mycal-week-time-label">${timeStr}</div>`;

        for (let d = 0; d < 7; d++) {
            let key = `${selectedWeekFullDates[d].getFullYear()}-${selectedWeekFullDates[d].getMonth()}-${selectedWeekDates[d]}-${days[d]}-${timeStr}`;
            html += `
                <textarea class="mycal-week-input-box"
                data-year="${selectedWeekFullDates[d].getFullYear()}"
                data-month="${selectedWeekFullDates[d].getMonth()}"
                data-day="${days[d]}"
                data-date="${selectedWeekDates[d]}"
                data-time="${timeStr}"
                oninput="saveTask(this)"
                ondblclick="viewTasks(this)">${allTasks[key] || ""}</textarea>`;
            }
            html += `</div>`;
    }

    document.getElementById("mycal-main-content").innerHTML = html;
    setTimeout(() => {
        document.getElementById("mycal-main-content").scrollTop = weekScroll;
        let headers = document.querySelectorAll(".mycal-week-view-grid-header div");
        for (let i = 0; i < selectedWeekDates.length; i++) {
            if (selectedWeekDates[i] == selectedDay) {
                headers[i + 1].classList.add("mycal-active-column-header");
            }
        }
    }, 0);
}
// Updates the selected day when a week header is clicked
function selectWeekDay(index, element) {
    document.querySelectorAll(".mycal-week-view-grid-header div").forEach(h => h.classList.remove("mycal-active-column-header"));
    element.classList.add("mycal-active-column-header");
    currentDate = new Date(selectedWeekFullDates[index]);
    selectedDay = currentDate.getDate();
    document.getElementById("mycal-display-header-title").innerHTML = `${currentDate.getDate()} ${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;
}

// Shows one year before and one year after the current month
function showMonth() {
    setActiveTab("mycal-month-btn");
    const startDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
    while (startDate.getDay() !== 0) { startDate.setDate(startDate.getDate() - 1); }

    let html = `
    <div class="mycal-continuous-wrapper">
        <div class="mycal-month-grid-header">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>
        <div class="mycal-month-grid-body">`;

    let tempDate = new Date(startDate);
    for (let i = 0; i < 742; i++) {
        let d = tempDate.getDate(), m = tempDate.getMonth(), y = tempDate.getFullYear();
        html += `
            <div class="mycal-month-day-cell" id="mycal-date-${y}-${m}-${d}"
                 onclick="selectMonthDate(${d},${m},${y})" ondblclick="showMonthTasks(${d},${m},${y})">
                <div class="mycal-full-date">
                ${d} ${tempDate.toLocaleString("default", { month: "short" })} ${y}
                </div>
                ${getMonthTasks(d, m, y)}
            </div>`;
        tempDate.setDate(tempDate.getDate() + 1);
    }
    html += `</div></div>`;
    document.getElementById("mycal-main-content").innerHTML = html;

    setTimeout(() => {
        const selected = document.getElementById(`mycal-date-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`);
        if (selected) selected.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
}

// Updates the current week and refreshes Week View and select date from month
function selectMonthDate(day, month, year) {
    currentDate = new Date(year, month, day);
    selectedDay = day;
    let weekStart = new Date(year, month, day);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    selectedWeekDates = [];
    selectedWeekFullDates = [];
    for (let i = 0; i < 7; i++) {
        let temp = new Date(weekStart);
        temp.setDate(weekStart.getDate() + i);
        selectedWeekDates.push(temp.getDate());
        selectedWeekFullDates.push(new Date(temp));
    }
    document.getElementById("mycal-display-header-title").innerHTML = `${day} ${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
    showWeek();
}

// Creates the mini calendar for the current month
function renderCalender() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = currentDate.getFullYear(), month = currentDate.getMonth();
    document.getElementById("mycal-mini-month-year").innerHTML = monthNames[month] + " " + year;
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `<div class="mycal-mini-grid"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>`;
    for (let i = 0; i < firstDay; i++) html += `<div></div>`;
    for (let day = 1; day <= daysInMonth; day++) {
        html += `<div class="mycal-mini-date-cell" data-day="${day}" onclick="selectDate(${day})">${day}</div>`;
    }
    html += `</div>`;
    document.getElementById("mycal-mini-calendar-container").innerHTML = html;
}

function prevMonth() {
     currentDate.setMonth(currentDate.getMonth() - 1); 
     renderCalender(); 
    }

function nextMonth() { 
    currentDate.setMonth(currentDate.getMonth() + 1); 
    renderCalender(); 
}
//Selects a date from the mini calendar and Updates the selected week and opens Week View
function selectDate(day) {
    let selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    currentDate = new Date(selectedDate);
    let weekStart = new Date(selectedDate);
    weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
    selectedWeekDates = [];
    selectedWeekFullDates = [];
    for (let i = 0; i < 7; i++) {
        let tempDate = new Date(weekStart);
        tempDate.setDate(weekStart.getDate() + i);
        selectedWeekDates.push(tempDate.getDate());
        selectedWeekFullDates.push(new Date(tempDate));
    }
    selectedDay = day;
    document.getElementById("mycal-display-header-title").innerHTML = `${currentDate.getDate()} ${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;
    showWeek();
    document.getElementById("mycal-mini-panel").style.display = "none";
}

// Auto-numbering Logic
// Automatically adds "1." when typing the first task
document.addEventListener("input", function (e) {

    if (!e.target.classList.contains("mycal-week-input-box")) return;

    let box = e.target;

    if (box.value.length === 1 && !box.value.startsWith("1. ")) {
        box.value = "1. " + box.value;

        box.selectionStart = box.selectionEnd = box.value.length;
    }

});
// Automatically inserts the next task number when Enter is pressed
document.addEventListener("keydown", function (e) {
    if (e.target.classList.contains("mycal-week-input-box") && e.key === "Enter") {
        e.preventDefault();
        let box = e.target;
        let lines = box.value.trim().split("\n");
        box.value += "\n" + (lines.length + 1) + ". ";
        setTimeout(() => { box.selectionStart = box.selectionEnd = box.value.length; }, 0);
    }
});
//TASK POPUP
// Stores the currently opened task box
let currentBox = null;
// Opens the task popup and displays all tasks
// for the selected time slot
function viewTasks(box) {

    currentBox = box;

    let lines = box.value.split("\n");
    let html = "";

    lines.forEach((line, index) => {

        if (line.trim() !== "") {

            html += `
            <div class="mycal-task-item">

                <span>${line}</span>

                <button class="mycal-delete-btn"
                    onclick="deleteTask(${index})">
                    🗑
                </button>

            </div>`;
        }

    });

    if (html === "") {
        html = "<p>No Tasks</p>";
    }

    document.getElementById("mycal-task-modal-details").innerHTML = html;
    document.getElementById("mycal-task-modal").style.display = "block";
}

// Stores the task index selected for deletion
let deleteIndex = null;
function deleteTask(index) {
    deleteIndex = index;
    document.getElementById("mycal-delete-modal").style.display = "block";
}

function confirmDeleteTask() {

    let lines = currentBox.value.split("\n");

    // Remove selected task
    lines.splice(deleteIndex, 1);

    let newLines = [];

    lines.forEach((line) => {

        let text = line.replace(/^\d+\.\s*/, "").trim();

        if (text !== "") {
            newLines.push((newLines.length + 1) + ". " + text);
        }

    });

    currentBox.value = newLines.join("\n");

    // Save back
    let key =
        currentBox.dataset.year + "-" +
        currentBox.dataset.month + "-" +
        currentBox.dataset.date + "-" +
        currentBox.dataset.day + "-" +
        currentBox.dataset.time;

    allTasks[key] = currentBox.value;

    // Close delete popup
    document.getElementById("mycal-delete-modal").style.display = "none";

    // Refresh popup
    viewTasks(currentBox);

    // Refresh week view
    currentBox.dispatchEvent(new Event("input"));

}
// Closes the task popup
function closeTaskModal() { 
    document.getElementById("mycal-task-modal").style.display = "none";
 }

// Closes the delete confirmation popup
function closeDeleteModal() { 
    document.getElementById("mycal-delete-modal").style.display = "none"; 
}

// Close popups when clicking outside them
window.onclick = function (event) {
    if (event.target == document.getElementById("mycal-task-modal")) closeTaskModal();
    if (event.target == document.getElementById("mycal-delete-modal")) closeDeleteModal();
}

// Displays all tasks for the selected date from the Month View
function showMonthTasks(day, month, year) {
    let html = "", found = false;
    let prefix = `${year}-${month}-${day}-`;
    for (let key in allTasks) {
        if (key.startsWith(prefix)) {
            let time = key.split("-")[4];
            html += `<div style="margin-bottom:10px;"><b>${time}</b><br>${allTasks[key].replace(/\n/g, "<br>")}</div>`;
            found = true;
        }
    }
    document.getElementById("mycal-task-modal-details").innerHTML = found ? html : "<p>No Tasks</p>";
    document.getElementById("mycal-task-modal").style.display = "block";
}

// Returns the task for a specific day and time
function getDayTask(time) {
    let date = currentDate.getDate(), month = currentDate.getMonth(), year = currentDate.getFullYear();
    let keyPrefix = `${year}-${month}-${date}-`;
    for (let key in allTasks) {
        if (key.startsWith(keyPrefix) && key.endsWith("-" + time)) return allTasks[key];
    }
    return "";
}

// Returns task previews for a date used in Month View
function getMonthTasks(day, month, year) {
    let html = "";
    let prefix = `${year}-${month}-${day}-`;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (let key in allTasks) {
        if (key.startsWith(prefix)) {
            let taskTime = key.split("-")[4];

            html += `
            <div class="mycal-month-task-preview">
            ${allTasks[key].replace(/\n/g, "<br>")}
            
            <div class="mycal-month-hover-popup">
            <div class="mycal-popup-header">
            📅 ${day} ${monthNames[month]} ${year}
            </div>

            <div class="mycal-popup-body">
            <pre>${allTasks[key]}</pre>
            </div>

            <div class="mycal-popup-footer">
            🕒 ${taskTime}
            </div>
            </div>
            </div>`;
        }
    }
    return html;
}
//Saves the current scroll position before switching between Day, Week and Month views
function saveCurrentScroll() {
    const content = document.getElementById("mycal-main-content");
    if (document.querySelector(".mycal-continuous-wrapper")) monthScroll = content.scrollTop;
    else if (document.querySelector(".mycal-week-view-grid-header")) weekScroll = content.scrollTop;
    else if (document.querySelector(".mycal-selected-day-header")) dayScroll = content.scrollTop;
}
// Load the mini calendar and Day View when the page opens
renderCalender();
showDay();