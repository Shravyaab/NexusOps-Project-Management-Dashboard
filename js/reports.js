(() => {

    // =====================================================
    // DAILY WORK REPORT
    // =====================================================

    const reportDateInput = document.getElementById("dwr-report-date");
    const taskModal = document.getElementById("dwr-task-modal");
    const modalTaskText = document.getElementById("dwr-modal-task-text");
    const modalProject = document.getElementById("dwr-modal-project-select");
    const modalOtherProject = document.getElementById("dwr-modal-other-project");
    const modalStart = document.getElementById("dwr-modal-start-time");
    const modalEnd = document.getElementById("dwr-modal-end-time");
    const modalDelete = document.getElementById("dwr-modal-delete-btn");

    const dayBody = document.getElementById("dwr-day-body");
    const weekBody = document.getElementById("dwr-week-body");
    const calendarGrid = document.getElementById("dwr-calendar-grid");

    const daySummary = document.getElementById("dwr-day-summary-body");
    const weekSummary = document.getElementById("dwr-week-summary-body");
    const monthSummary = document.getElementById("dwr-month-summary-body");

    const printBtn = document.getElementById("dwr-print-btn");
    const printWeekBtn = document.getElementById("dwr-print-week-btn");
    const printMonthBtn = document.getElementById("dwr-print-month-btn");

    let activeCalendarDate = new Date();

    let selectedDate = "";
    let selectedSlot = -1;
    let editingTask = null;
    let currentlyEditingTask = null;
    let selectedDateForModal = "";
    let selectedStartSlotIndex = -1;
    let isViewMode = false;

   // Stores all available 30-minute schedule slots for a day
    const scheduleSlots = [];
    // Project-wise color mapping used throughout the application
    const projectColors = {
        "Scrum Dashboard": "#7293d3",
        "ThermoG": "#f5b994",
        "Modbus": "#a2d5ab"
    };
// Generate 48 time slots (00:00 - 23:30) with 30-minute intervals
    for (let i = 0; i < 48; i++) {
        scheduleSlots.push(i * 30);

    }
// Set today's date as the default report date
    if (reportDateInput) {
        reportDateInput.value = new Date().toISOString().split("T")[0];

    }
    // =====================================================
    // FORMAT FUNCTIONS
    // =====================================================
// Convert a Date object into YYYY-MM-DD format
    function formatDateStr(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;

    }

    // Returns the selected date range based on export option
    function getDateRange(type, fromId, toId) {
        let endDate = new Date(reportDateInput.value + "T00:00:00");
        let startDate = new Date(endDate);

        switch (type) {
            case "today":
                break;

            case "7days":
                startDate.setDate(endDate.getDate() - 6);
                break;

            case "30days":
                startDate.setDate(endDate.getDate() - 29);
                break;

            case "currentMonth":
                startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
                endDate = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
                break;

            case "lastMonth":
                startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
                endDate = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
                break;

            case "3months":
                startDate.setMonth(endDate.getMonth() - 3);
                break;

            case "6months":
                startDate.setMonth(endDate.getMonth() - 6);
                break;

            case "1year":
                startDate.setFullYear(endDate.getFullYear() - 1);
                break;

            case "custom":
                startDate = new Date(document.getElementById(fromId).value);
                endDate = new Date(document.getElementById(toId).value);
                break;
        }

        return {
            startDate,
            endDate
        };
    }
// Returns the Sunday of the selected week
    function getSundayOfWeek(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - d.getDay());
        return d;

    }
// Converts minutes into a 12-hour time format (HH:MM AM/PM)
    function getTimeLabel(minutes) {
        let h = Math.floor(minutes / 60);
        let m = minutes % 60;
        let ap = h >= 12 ? "PM" : "AM";
        h = h % 12;
        if (h === 0) h = 12;
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;

    }
    // =====================================================
    // STORAGE
    // =====================================================
// Load all tasks for a specific date
    function loadTasks(date) {
        return JSON.parse(localStorage.getItem("tasks-" + date)) || [];

    }
// Save tasks for a specific date
    function saveTasks(date, tasks) {
        localStorage.setItem("tasks-" + date, JSON.stringify(tasks));

    }
    // =====================================================
    // COLOR
    // =====================================================
// Returns the colour assigned to each project
    function getProjectColor(project) {

        switch (project) {
            case "Scrum Dashboard":
                return "#7293d3";

            case "ThermoG":
                return "#f5b994";

            case "Modbus":
                return "#a2d5ab";

            default:
                return "#ffffff";
        }

    }
    // =====================================================
    // LOAD TIME DROPDOWNS
    // =====================================================
// Load all available time slots into the modal dropdowns
    function loadTimeDropdowns() {
        modalStart.innerHTML = "";
        modalEnd.innerHTML = "";
        scheduleSlots.forEach((slot, index) => {
            const txt = getTimeLabel(slot);
            modalStart.add(new Option(txt, index));
            modalEnd.add(new Option(txt, index));
        });

    }
    // Refresh all Day, Week, Month views and summaries
    function loadActiveViews() {
        renderDayView();
        renderWeekView();
        renderMonthView();
        renderDaySummary();
        renderWeekSummary();
        renderMonthSummary();

    }
    // =====================================================
    // INITIALIZATION
    // =====================================================

    window.addEventListener("load", () => {
        loadTimeDropdowns();
        renderDayView();
        renderWeekView();
        renderMonthView();
        renderDaySummary();
        setupTabs();
        setupModal();
        updateSubmitButton();

        document.getElementById("dwr-day-export-type").addEventListener("change", function () {

            document.getElementById("dwr-day-from-date").style.display =
                this.value === "custom" ? "inline-flex" : "none";

            document.getElementById("dwr-day-to-date").style.display =
                this.value === "custom" ? "inline-flex" : "none";

        });

        document.getElementById("dwr-week-export-type").addEventListener("change", function () {

            document.getElementById("dwr-week-from-date").style.display =
                this.value === "custom" ? "inline-flex" : "none";

            document.getElementById("dwr-week-to-date").style.display =
                this.value === "custom" ? "inline-flex" : "none";

        });

        document.getElementById("dwr-month-export-type").addEventListener("change", function () {

            document.getElementById("dwr-month-from-date").style.display =
                this.value === "custom" ? "inline-block" : "none";

            document.getElementById("dwr-month-to-date").style.display =
                this.value === "custom" ? "inline-block" : "none";

        });

    });
// Refresh all reports whenever the selected report date changes
    if (reportDateInput) {
        reportDateInput.addEventListener("change", () => {

            activeCalendarDate = new Date(reportDateInput.value + "T00:00:00");

            renderDayView();
            renderWeekView();
            renderMonthView();
            renderDaySummary();
            renderWeekSummary();
            renderMonthSummary();
            updateSubmitButton();

        });

    }
    // Reset the report to today's date
    document.getElementById("dwr-today-btn").onclick = () => {

        reportDateInput.value = formatDateStr(new Date());
        activeCalendarDate = new Date(reportDateInput.value + "T00:00:00");

        renderDayView();
        renderWeekView();
        renderMonthView();
        renderDaySummary();
        renderWeekSummary();
        renderMonthSummary();
        updateSubmitButton();

    };
    // =====================================================
    // TABS
    // =====================================================
// Register click events for all report tabs
    function setupTabs() {

        document.querySelectorAll(".dwr-tab-btn").forEach(btn => {

            btn.onclick = () => {

                document.querySelectorAll(".dwr-tab-btn").forEach(b => b.classList.remove("active"));

                document.querySelectorAll(".dwr-page").forEach(p => p.classList.remove("active"));

                btn.classList.add("active");

                document.getElementById(btn.dataset.page).classList.add("active");

            };

        });

    }
    // Programmatically switch to a specific tab
    function switchToTab(pageId) {

        document.querySelectorAll(".dwr-tab-btn")
            .forEach(btn => btn.classList.remove("active"));

        document.querySelectorAll(".dwr-page")
            .forEach(page => page.classList.remove("active"));

        document.getElementById(pageId)
            .classList.add("active");

        document.querySelector(`[data-page="${pageId}"]`)
            .classList.add("active");

    }
    
    // Generate the Day View timetable with task cards
    function renderDayView() {

        const currentDate = reportDateInput.value;

        const tasks = loadTasks(currentDate);
        const dayExportType = document.getElementById("dwr-day-export-type");
        const dayFromDate = document.getElementById("dwr-day-from-date");
        const dayToDate = document.getElementById("dwr-day-to-date");


        dayBody.innerHTML = "";

        const occupied = Array(scheduleSlots.length).fill(false);

        const taskMap = {};

        tasks.forEach(task => {

            taskMap[task.startSlot] = task;

            for (let i = 0; i < task.duration; i++) {

                occupied[task.startSlot + i] = true;

            }

        });

        scheduleSlots.forEach((slot, row) => {

            const tr = document.createElement("tr");

            tr.className = row % 2 == 0 ? "hour-line" : "half-hour-line";

            const tdTime = document.createElement("td");

            tdTime.className = "time-col";

            tdTime.textContent = getTimeLabel(slot);

            tr.appendChild(tdTime);

            const rootTask = taskMap[row];

            if (occupied[row]) {

                if (rootTask) {

                    const tdTask = document.createElement("td");

                    tdTask.className = "task-cell";

                    tdTask.rowSpan = rootTask.duration;

                    tdTask.style.backgroundColor = getProjectColor(rootTask.project);

                    tdTask.innerHTML = `
                    <div class="dwr-task-card">
                    <div class="dwr-task-text">
                    ${rootTask.text}
                    </div>
                    
                    <div class="dwr-task-project">
                    <strong>Project:</strong> ${rootTask.project}
                    </div>
                    </div>
                    `;

                    tdTask.onclick = () => {
                        openViewTask(rootTask, currentDate);

                    };

                    tdTask.ondblclick = () => {
                        openEditTask(rootTask, currentDate);

                    };

                    tr.appendChild(tdTask);

                }

            }

            else {

                const tdEmpty = document.createElement("td");

                tdEmpty.className = "empty-slot";

                tdEmpty.onclick = () => {

                    openCreateTask(currentDate, row);

                };

                tr.appendChild(tdEmpty);

            }

            dayBody.appendChild(tr);

        });


    }
    // =====================================================
    // DAY SUMMARY
    // =====================================================
// Display project-wise work summary for the selected day
    function renderDaySummary() {

        daySummary.innerHTML = "";

        const tasks = loadTasks(reportDateInput.value);

        const summary = {};

        tasks.forEach(task => {

            if (!summary[task.project]) {

                summary[task.project] = {

                    duration: 0,

                    remarks: []

                };

            }

            summary[task.project].duration += task.duration * 30;

            summary[task.project].remarks.push(task.text);

        });

        Object.keys(summary).forEach(project => {

            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${project}</td>
            <td>${summary[project].duration} mins</td>
            <td>${summary[project].remarks.join(", ")}</td>
            `;

            // Color every cell in the row
            tr.querySelectorAll("td").forEach(td => {
                td.style.backgroundColor = getProjectColor(project);
                td.style.color = "#000";
                td.style.fontWeight = "600";
            });

            daySummary.appendChild(tr);

        });

    }
    // =====================================================
    // WEEK VIEW
    // =====================================================
// Generate the weekly timetable and task layout
    function renderWeekView() {

        const weekExportType = document.getElementById("dwr-week-export-type");
        const weekFromDate = document.getElementById("dwr-week-from-date");
        const weekToDate = document.getElementById("dwr-week-to-date");


        const selected = new Date(reportDateInput.value + "T00:00:00");

        const sunday = getSundayOfWeek(selected);

        const saturday = new Date(sunday);
        saturday.setDate(sunday.getDate() + 6);

        document.getElementById("dwr-week-range-label").textContent =
            `${sunday.toLocaleDateString()} - ${saturday.toLocaleDateString()}`;

        const headerIds = [
            "dwr-col-sun",
            "dwr-col-mon",
            "dwr-col-tue",
            "dwr-col-wed",
            "dwr-col-thu",
            "dwr-col-fri",
            "dwr-col-sat"
        ];

        const weekDates = [];

        for (let i = 0; i < 7; i++) {

            const d = new Date(sunday);

            d.setDate(sunday.getDate() + i);

            weekDates.push(formatDateStr(d));

            const header = document.getElementById(headerIds[i]);

            header.innerHTML = `
            ${d.toLocaleDateString(undefined, {
                weekday: "short"
            })}
            <br>
            
            <span style="font-size:11px">
            ${d.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric"
            })}
            </span>
            `;

            header.style.cursor = "pointer";

            header.onclick = () => {

                reportDateInput.value = weekDates[i];

                activeCalendarDate = new Date(weekDates[i]);

                loadActiveViews();

                switchToTab("dwr-day-page");

            };
        }

        const occupied = Array(scheduleSlots.length)
            .fill(null)
            .map(() => Array(7).fill(false));

        const taskMap = {};

        weekDates.forEach((date, d) => {

            const tasks = loadTasks(date);

            tasks.forEach(task => {

                taskMap[`${task.startSlot}-${d}`] = {
                    task: task,
                    date: date
                };

                for (let i = 0; i < task.duration; i++) {

                    occupied[task.startSlot + i][d] = true;

                }

            });

        });

        weekBody.innerHTML = "";

        for (let row = 0; row < scheduleSlots.length; row++) {

            const tr = document.createElement("tr");

            tr.className = row % 2 === 0 ? "hour-line" : "half-hour-line";

            const tdTime = document.createElement("td");

            tdTime.className = "time-col";

            tdTime.textContent = getTimeLabel(scheduleSlots[row]);

            tr.appendChild(tdTime);

            for (let d = 0; d < 7; d++) {

                const rootTask = taskMap[`${row}-${d}`];

                if (occupied[row][d]) {

                    if (rootTask) {

                        const td = document.createElement("td");

                        td.className = "task-cell";

                        td.rowSpan = rootTask.task.duration;

                        td.style.backgroundColor = getProjectColor(rootTask.task.project);

                        td.innerHTML = `
                        <div class="dwr-task-card">
                            <div class="dwr-task-text">
                                ${rootTask.task.text}
                            </div>
                        </div>
                    `;

                        td.onclick = () => {

                            reportDateInput.value = rootTask.date;

                            activeCalendarDate = new Date(rootTask.date);

                            loadActiveViews();

                            switchToTab("dwr-day-page");

                        };

                        tr.appendChild(td);

                    }

                    continue;

                }

                const td = document.createElement("td");

                td.className = "empty-slot";

                td.onclick = () => {

                    reportDateInput.value = weekDates[d];

                    activeCalendarDate = new Date(weekDates[d]);

                    loadActiveViews();

                    switchToTab("dwr-day-page");

                    openCreateTask(weekDates[d], row);

                };

                tr.appendChild(td);

            }

            weekBody.appendChild(tr);

        }

        renderWeekSummary();

    }
    // =====================================================
    // WEEK SUMMARY
    // =====================================================

    function renderWeekSummary() {

        weekSummary.innerHTML = "";

        const selected = new Date(reportDateInput.value + "T00:00:00");

        const sunday = getSundayOfWeek(selected);

        const summary = {};

        for (let i = 0; i < 7; i++) {

            const d = new Date(sunday);

            d.setDate(sunday.getDate() + i);

            const tasks = loadTasks(formatDateStr(d));

            tasks.forEach(task => {

                if (!summary[task.project]) {

                    summary[task.project] = {

                        duration: 0,

                        remarks: [],

                    };

                }

                summary[task.project].duration += task.duration * 30;

                summary[task.project].remarks.push(task.text);

            });

        }

        Object.keys(summary).forEach(project => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
        <td>${project}</td>
        <td>${summary[project].duration} mins</td>
        <td>${summary[project].remarks.join(", ")}</td>
    `;

            // Color every cell in the row
            tr.querySelectorAll("td").forEach(td => {
                td.style.backgroundColor = getProjectColor(project);
                td.style.color = "#000";
                td.style.fontWeight = "600";
            });

            weekSummary.appendChild(tr);

        });

    }
    // =====================================================
    // MONTH VIEW
    // =====================================================
// Generate the month calendar view
    function renderMonthView() {
        const monthExportType = document.getElementById("dwr-month-export-type");
        const monthFromDate = document.getElementById("dwr-month-from-date");
        const monthToDate = document.getElementById("dwr-month-to-date");


        calendarGrid.innerHTML = "";

        const currentYear = new Date().getFullYear();

        const startDate = new Date(currentYear - 1, 0, 1);
        const endDate = new Date(currentYear + 1, 11, 31);

        let current = new Date(startDate);

        while (current <= endDate) {

            const dateStr = formatDateStr(current);
            const tasks = loadTasks(dateStr);

            const cell = document.createElement("div");
            cell.className = "dwr-calendar-day";

            cell.id = "day-" + dateStr;

            if (dateStr === reportDateInput.value) {
                cell.classList.add("selected");
            }

            if (dateStr === formatDateStr(new Date())) {
                cell.classList.add("today");
            }

            cell.innerHTML = `
            <div class="dwr-full-date">
                ${current.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
            })}
            </div>
        `;

            if (tasks.length) {

                const dot = document.createElement("div");

                dot.className = "dwr-month-dot";

                dot.style.background = getProjectColor(tasks[0].project);

                cell.appendChild(dot);

            }

            cell.onclick = () => {

                reportDateInput.value = dateStr;

                activeCalendarDate = new Date(dateStr);

                loadActiveViews();

                switchToTab("dwr-day-page");

            };

            calendarGrid.appendChild(cell);

            current.setDate(current.getDate() + 1);

        }

        renderMonthSummary();

        scrollToSelectedDate();

    }
    // Automatically scroll to the currently selected date
    function scrollToSelectedDate() {

        setTimeout(() => {

            const cell = document.getElementById(
                "day-" + reportDateInput.value
            );

            if (cell) {

                cell.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }

        }, 100);

    }

    // =====================================================
    // MONTH SUMMARY
    // =====================================================

    function renderMonthSummary() {

        monthSummary.innerHTML = "";

        const summary = {};

        const selected = new Date(reportDateInput.value + "T00:00:00");

        const year = selected.getFullYear();
        const month = selected.getMonth();

        const days = new Date(year, month + 1, 0).getDate();

        for (let d = 1; d <= days; d++) {

            const date = formatDateStr(new Date(year, month, d));

            const tasks = loadTasks(date);

            tasks.forEach(task => {

                if (!summary[task.project]) {

                    summary[task.project] = {

                        duration: 0,

                        remarks: []

                    };

                }

                summary[task.project].duration += task.duration * 30;

                summary[task.project].remarks.push(task.text);

            });

        }

        Object.keys(summary).forEach(project => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
        <td>${project}</td>
        <td>${summary[project].duration} mins</td>
        <td>${summary[project].remarks.join(", ")}</td>
    `;

            // Color every cell in the row
            tr.querySelectorAll("td").forEach(td => {
                td.style.backgroundColor = getProjectColor(project);
                td.style.color = "#000";
                td.style.fontWeight = "600";
            });

            monthSummary.appendChild(tr);

        });

    }
    // =====================================================
    // MODAL
    // =====================================================
// Register all modal button and dropdown events
    function setupModal() {

        document.getElementById("dwr-modal-save-btn").onclick = saveTask;

        document.getElementById("dwr-modal-cancel-btn").onclick = closeModal;

        modalDelete.onclick = deleteTask;

        modalProject.onchange = () => {

            modalOtherProject.style.display =
                modalProject.value === "Other" ? "block" : "none";

            const color = getProjectColor(modalProject.value);

            document.getElementById("dwr-task-modal")
                .querySelector(".dwr-modal-content")
                .style.borderColor = color;

        };

        modalStart.onchange = () => {

            updateEndTimes(
                selectedDate,
                parseInt(modalStart.value),
                editingTask
            );

        };
        // Close popup when clicking outside
        taskModal.addEventListener("click", function (e) {

            if (e.target === taskModal) {

                closeModal();

            }

        });

    }
// Open modal for creating a new task
    function openCreateTask(date, slot) {

        if (!isToday(date)) {
            alert("You can add tasks only for today's date.");
            return;
        }

        if (isDaySubmitted(date)) {
            alert("Today's report is already submitted.");
            return;
        }

        editingTask = null;

        selectedDate = date;

        selectedSlot = slot;

        modalTaskText.value = "";

        modalProject.value = "";

        modalOtherProject.value = "";

        modalOtherProject.style.display = "none";

        updateStartTimes(date);

        modalStart.value = slot;

        updateEndTimes(date, slot);

        modalDelete.style.display = "none";

        taskModal.classList.add("active");

    }
// Open modal for editing an existing task
    function openEditTask(task, date) {

        if (!isToday(date)) {

            alert("Only today's tasks can be edited.");

            return;

        }

        if (isDaySubmitted(date)) {

            alert("This report has already been submitted.");

            return;

        }
        const today = new Date().toISOString().split("T")[0];

        if (date !== today) {

            alert("Past tasks are read only.");

            return;

        }

        editingTask = task;

        selectedDate = date;

        modalTaskText.value = task.text;

        if (projectColors[task.project]) {

            modalProject.value = task.project;

            modalOtherProject.style.display = "none";

        } else {

            modalProject.value = "Other";

            modalOtherProject.style.display = "block";

            modalOtherProject.value = task.project;

        }

        updateStartTimes(date, task);

        modalStart.value = task.startSlot;

        updateEndTimes(date, task.startSlot, task);

        modalEnd.value = task.startSlot + task.duration - 1;

        modalDelete.style.display = "inline-block";

        taskModal.classList.add("active");

    }
    // Open task in read-only mode
    function openViewTask(task, date) {

        const today = new Date().toISOString().split("T")[0];

        if (date === today) {

            openEditTask(task, date);

            return;

        }

        editingTask = task;

        selectedDate = date;

        modalTaskText.value = task.text;

        modalTaskText.readOnly = true;

        modalProject.disabled = true;

        modalStart.disabled = true;

        modalEnd.disabled = true;

        modalDelete.style.display = "none";

        document.getElementById("dwr-modal-save-btn").style.display = "none";

        taskModal.classList.add("active");

    }
// Close the task modal and reset controls
    function closeModal() {

        modalTaskText.readOnly = false;

        modalProject.disabled = false;

        modalStart.disabled = false;

        modalEnd.disabled = false;

        document.getElementById("dwr-modal-save-btn").style.display = "inline-block";

        taskModal.classList.remove("active");

    }
    // =====================================================
    // SAVE TASK
    // =====================================================

// Validate task details and save them to Local Storage
    function saveTask() {

        const text = modalTaskText.value.trim();

        if (text === "") {
            alert("Please enter task description.");
            return;
        }

        let project =
            modalProject.value === "Other"
                ? modalOtherProject.value.trim()
                : modalProject.value;

        if (project === "") {
            alert("Please select project.");
            return;
        }

        const startSlot = parseInt(modalStart.value);
        const endSlot = parseInt(modalEnd.value);

        if (endSlot < startSlot) {
            alert("Invalid time range.");
            return;
        }

        const duration = endSlot - startSlot + 1;

        let tasks = loadTasks(selectedDate);

        // -----------------------------
        // Remove old task while editing
        // -----------------------------

        if (editingTask) {

            tasks = tasks.filter(t => t.id !== editingTask.id);

        }

        // -----------------------------
        // Check overlapping
        // -----------------------------

        for (const task of tasks) {

            const taskStart = task.startSlot;
            const taskEnd = task.startSlot + task.duration - 1;

            const overlap =
                startSlot <= taskEnd &&
                endSlot >= taskStart;

            if (overlap) {

                alert("Selected time overlaps with another task.");

                return;

            }

        }

        // -----------------------------
        // Create task object
        // -----------------------------

        const newTask = {

            id: editingTask
                ? editingTask.id
                : Date.now().toString(),

            text,
            project,
            startSlot,
            duration

        };

        tasks.push(newTask);

        tasks.sort((a, b) => a.startSlot - b.startSlot);

        saveTasks(selectedDate, tasks);

        closeModal();

        renderDayView();

        renderWeekView();

        renderMonthView();

        renderDaySummary();

        renderWeekSummary();

        renderMonthSummary();

    }
    // =====================================================
    // DATE HELPERS
    // =====================================================
// Check whether the selected date is today's date
    function isToday(dateStr) {

        const today = new Date().toISOString().split("T")[0];

        return dateStr === today;

    }
// Check whether today's report has already been submitted
    function isDaySubmitted(dateStr) {

        return localStorage.getItem("submitted-" + dateStr) === "true";

    }
    // Enable or disable the Submit button
    function updateSubmitButton() {

        const btn = document.getElementById("dwr-submit-report-btn");

        if (!btn) return;

        const today = new Date().toISOString().split("T")[0];
        const selected = reportDateInput.value;

        // Future or Previous day
        if (selected !== today) {

            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
            btn.textContent = "Submit Day Report";

            return;
        }

        // Already submitted today
        if (isDaySubmitted(today)) {

            btn.disabled = true;
            btn.style.opacity = "0.5";
            btn.style.cursor = "not-allowed";
            btn.textContent = "Submitted";

            return;
        }

        // Today's report can be submitted
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.textContent = "Submit Day Report";

    }
    // =====================================================
    // DELETE
    // =====================================================

    function deleteTask() {

        if (!editingTask) return;

        if (!isToday(selectedDate)) {

            alert("Only today's tasks can be deleted.");

            return;

        }

        if (isDaySubmitted(selectedDate)) {

            alert("This report has already been submitted.");

            return;

        }

        if (!confirm("Delete this task?")) return;

        let tasks = loadTasks(selectedDate);

        tasks = tasks.filter(t => t.id !== editingTask.id);

        saveTasks(selectedDate, tasks);

        closeModal();

        renderDayView();

        renderWeekView();

        renderMonthView();

        renderDaySummary();

    }
    // =====================================================
    // END TIME
    // =====================================================
// Populate available start times
    function updateStartTimes(date, editingTask = null) {

        modalStart.innerHTML = "";

        const tasks = loadTasks(date);

        for (let slot = 0; slot < scheduleSlots.length; slot++) {

            let occupied = false;

            for (const task of tasks) {

                if (
                    editingTask &&
                    task.id === editingTask.id
                ) continue;

                if (
                    slot >= task.startSlot &&
                    slot < task.startSlot + task.duration
                ) {
                    occupied = true;
                    break;
                }
            }

            if (!occupied) {

                modalStart.add(
                    new Option(
                        getTimeLabel(scheduleSlots[slot]),
                        slot
                    )
                );

            }
        }
    }
// Populate valid end times based on the selected start time
    function updateEndTimes(date, startSlot, editingTask = null) {

        modalEnd.innerHTML = "";

        const tasks = loadTasks(date);

        let maxEnd = scheduleSlots.length - 1;

        for (const task of tasks) {

            if (
                editingTask &&
                task.id === editingTask.id
            ) continue;

            if (task.startSlot > startSlot) {

                maxEnd = Math.min(maxEnd, task.startSlot - 1);

            }
        }

        for (let i = startSlot; i <= maxEnd; i++) {

            modalEnd.add(
                new Option(
                    getTimeLabel(scheduleSlots[i]),
                    i
                )
            );

        }

    }
    // Export Day Report as CSV
    function exportDayToCSV() {

        const option =
            document.getElementById("dwr-day-export-type").value;

        const { startDate, endDate } =
            getDateRange(
                option,
                "dwr-day-from-date",
                "dwr-day-to-date"
            );

        let csv = "Date,Start Time,Project,Task Description,Duration\r\n";

        let current = new Date(startDate);

        while (current <= endDate) {

            const dateStr = formatDateStr(current);

            const tasks =
                JSON.parse(localStorage.getItem("tasks-" + dateStr)) || [];

            tasks.forEach(task => {

                csv += `"${dateStr}","${getTimeLabel(scheduleSlots[task.startSlot])}","${task.project || ""}","${task.text.replace(/"/g, '""')}","${task.duration * 30} mins"\r\n`;

            });

            current.setDate(current.getDate() + 1);
        }

        const blob = new Blob([csv], { type: "text/csv" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "Day_Report.csv";;

        link.click();

    }
    // Export Week Report as CSV
    function exportWeekToCSV() {

        const option =
            document.getElementById("dwr-week-export-type").value;

        const { startDate, endDate } =
            getDateRange(
                option,
                "dwr-week-from-date",
                "dwr-week-to-date"
            );

        let csv = "Date,Start Time,Project,Task Description,Duration\r\n";

        let current = new Date(startDate);

        while (current <= endDate) {

            const dateStr = formatDateStr(current);

            const tasks =
                JSON.parse(localStorage.getItem("tasks-" + dateStr)) || [];

            tasks.forEach(task => {

                csv += `"${dateStr}","${getTimeLabel(scheduleSlots[task.startSlot])}","${task.project || ""}","${task.text.replace(/"/g, '""')}","${task.duration * 30} mins"\r\n`;

            });

            current.setDate(current.getDate() + 1);
        }

        const blob = new Blob([csv], { type: "text/csv" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "Week_Report.csv";;

        link.click();

    }
    // Export Month Report as CSV
    function exportMonthToCSV() {

        const option =
            document.getElementById("dwr-month-export-type").value;

        const { startDate, endDate }
            =
            getDateRange(option, "dwr-month-from-date", "dwr-month-to-date");

        let csv = "Date,Start Time,Project,Task Description,Duration\r\n";

        let current = new Date(startDate);

        while (current <= endDate) {

            const dateStr = formatDateStr(current);

            const tasks =
                JSON.parse(localStorage.getItem("tasks-" + dateStr)) || [];

            tasks.forEach(task => {

                csv += `"${dateStr}","${getTimeLabel(scheduleSlots[task.startSlot])}","${task.project || ""}","${task.text.replace(/"/g, '""')}","${task.duration * 30} mins"\r\n`;
            });

            current.setDate(current.getDate() + 1);
        }

        const blob = new Blob([csv], { type: "text/csv" });

        const link = document.createElement("a");

        link.href = URL.createObjectURL(blob);

        link.download = "Month_Report.csv";
        link.click();

    }
    // Print the selected report
    function printReport(type) {

        const option =
            document.getElementById(`dwr-${type}-export-type`).value;

        const from = `dwr-${type}-from-date`;

        const to = `dwr-${type}-to-date`;

        const { startDate, endDate } =
            getDateRange(option, from, to);

        console.log(startDate, endDate);

        window.print();
    }
    document.getElementById("dwr-export-csv-btn").onclick = exportDayToCSV;

    document.getElementById("dwr-export-week-csv-btn").onclick = exportWeekToCSV;

    document.getElementById("dwr-export-month-csv-btn").onclick = exportMonthToCSV;

    printBtn.onclick = () => printReport("day");

    printWeekBtn.onclick = () => printReport("week");

    printMonthBtn.onclick = () => printReport("month");

// Generates the PDF, emails it and locks the report

    document.getElementById("dwr-submit-report-btn").onclick = async function () {

        const today = new Date().toISOString().split("T")[0];
        const selectedDate = reportDateInput.value;

        if (selectedDate !== today) {
            alert("Only today's report can be submitted.");
            return;
        }

        if (isDaySubmitted(selectedDate)) {
            alert("Today's report has already been submitted.");
            return;
        }

        const tasks = loadTasks(selectedDate);

        if (tasks.length === 0) {
            alert("Please add at least one task before submitting.");
            return;
        }

        try {

            // Send PDF to email
            const response = await fetch("http://localhost:5005/send-report", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    date: selectedDate,
                    tasks: tasks
                })

            });

            const result = await response.json();

            if (!result.success) {

                alert("Failed to send report.");

                return;

            }

            // Mark report as submitted
            localStorage.setItem("submitted-" + selectedDate, "true");

            updateSubmitButton();

            alert("Report submitted successfully.\nPDF has been emailed.");

        } catch (err) {

            console.error(err);

            alert("Unable to connect to the server.");

        }

    };
})();