// Configuration Parameters
const BACKEND_API_URL = "YOUR_WEB_APP_URL";

// Term 4 Phase Schedule Database (Section B) - Code Only
const PRE_MID_SCHEDULE = [
    { section: "B", day: "Monday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "EL-2" },
    { section: "B", day: "Monday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "BECG" },
    { section: "B", day: "Tuesday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "SM-2" },
    { section: "B", day: "Tuesday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "OM" },
    { section: "B", day: "Tuesday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "R&S" },
    { section: "B", day: "Wednesday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "EL-2" },
    { section: "B", day: "Wednesday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "STCM" },
    { section: "B", day: "Thursday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "SM-2" },
    { section: "B", day: "Thursday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "OM" },
    { section: "B", day: "Thursday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "R&S" },
    { section: "B", day: "Friday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "STCM" },
    { section: "B", day: "Friday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "BECG" }
];

const POST_MID_SCHEDULE = [
    { section: "B", day: "Monday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "EL-2" },
    { section: "B", day: "Monday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "J2S" },
    { section: "B", day: "Tuesday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "SM-2" },
    { section: "B", day: "Tuesday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "OM" },
    { section: "B", day: "Tuesday", timeSlot: "02:15 PM - 03:45 PM", subjectCode: "SCCSR" },
    { section: "B", day: "Wednesday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "EL-2" },
    { section: "B", day: "Wednesday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "STCM" },
    { section: "B", day: "Wednesday", timeSlot: "04:00 PM - 05:30 PM", subjectCode: "BECG" },
    { section: "B", day: "Thursday", timeSlot: "08:30 AM - 10:00 AM", subjectCode: "SM-2" },
    { section: "B", day: "Thursday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "OM" },
    { section: "B", day: "Thursday", timeSlot: "02:15 PM - 03:45 PM", subjectCode: "SCCSR" },
    { section: "B", day: "Friday", timeSlot: "10:15 AM - 11:45 AM", subjectCode: "STCM" },
    { section: "B", day: "Friday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "J2S" },
    { section: "B", day: "Friday", timeSlot: "04:00 PM - 05:30 PM", subjectCode: "BECG" }
];

let extraClassMode = false;

window.onload = function () {
    const today = new Date();
    document.getElementById('attendance-date').valueAsDate = today;
    document.getElementById('extra-class-date').valueAsDate = today;
    
    document.getElementById('attendance-date').addEventListener('change', () => {
        renderPublicTimetable();
        updateAttendanceSubjectDropdown();
    });
    document.getElementById('section-view-select').addEventListener('change', renderPublicTimetable);

    renderPublicTimetable();
    updateAttendanceSubjectDropdown();
};

function getActiveScheduleForDate(dateString) {
    const targetDate = new Date(dateString);
    targetDate.setHours(0,0,0,0);

    const startPreMid = new Date("2026-06-15");
    const endPreMid = new Date("2026-07-19");
    const startMidTerm = new Date("2026-07-20");
    const endMidTerm = new Date("2026-07-26");
    const startPostMid = new Date("2026-07-27");
    const endPostMid = new Date("2026-08-30");
    const startEndTerm = new Date("2026-08-31");
    const endTermBoundary = new Date("2026-09-06");

    if (targetDate < startPreMid) {
        return { status: "active", data: PRE_MID_SCHEDULE, phase: "Pre-Mid Term (Preview Mode)" };
    } else if (targetDate >= startPreMid && targetDate <= endPreMid) {
        return { status: "active", data: PRE_MID_SCHEDULE, phase: "Pre-Mid Term" };
    } else if (targetDate >= startMidTerm && targetDate <= endMidTerm) {
        return { status: "exam", message: "Mid-Term Examinations Phase" };
    } else if (targetDate >= startPostMid && targetDate <= endPostMid) {
        return { status: "active", data: POST_MID_SCHEDULE, phase: "Post-Mid Term" };
    } else if (targetDate >= startEndTerm && targetDate <= endTermBoundary) {
        return { status: "exam", message: "End-Term Examinations Phase" };
    } else {
        return { status: "unrecorded" };
    }
}

function renderPublicTimetable() {
    const selectedSection = document.getElementById("section-view-select").value;
    const displayContainer = document.getElementById("public-timetable-display");
    const selectedDateStr = document.getElementById("attendance-date").value;
    
    displayContainer.innerHTML = "";

    if (selectedSection === "A") {
        displayContainer.innerHTML = `
            <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-center">
                <span class="text-sm font-bold block">To Be Updated Soon</span>
                <span class="text-xs text-amber-600">Section A schedule data is currently being populated.</span>
            </div>`;
        return;
    }

    const scheduleStatus = getActiveScheduleForDate(selectedDateStr);

    if (scheduleStatus.status === "unrecorded") {
        displayContainer.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-center font-medium text-sm">
                ⚠️ Data Not Updated Yet
            </div>`;
        return;
    }

    if (scheduleStatus.status === "exam") {
        displayContainer.innerHTML = `
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-center">
                <span class="text-sm font-bold block">No Regular Classes</span>
                <span class="text-xs font-semibold text-blue-600">${scheduleStatus.message}</span>
            </div>`;
        return;
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = days[new Date(selectedDateStr).getDay()];

    const targetClasses = scheduleStatus.data.filter(item => item.day.toLowerCase() === selectedDay.toLowerCase());

    if (targetClasses.length === 0) {
        displayContainer.innerHTML = `
            <div class="p-3 bg-slate-50 border border-gray-200 rounded-lg text-center text-gray-500 text-sm">
                No classes scheduled on this day (${selectedDay}).
            </div>`;
        return;
    }

    const phaseHeader = document.createElement("div");
    phaseHeader.className = "text-center text-xs font-bold text-slate-500 bg-indigo-50 border border-indigo-100 py-1.5 rounded-lg mb-3 tracking-wide";
    phaseHeader.innerText = `${scheduleStatus.phase} — ${selectedDay.toUpperCase()}`;
    displayContainer.appendChild(phaseHeader);

    targetClasses.forEach(item => {
        const div = document.createElement("div");
        div.className = "p-3 bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-between hover:border-indigo-200 transition mb-2";
        div.innerHTML = `
            <span class="text-sm font-bold text-gray-800">${item.subjectCode}</span>
            <span class="text-xs font-bold text-indigo-600 font-mono tracking-wide">${item.timeSlot}</span>
        `;
        displayContainer.appendChild(div);
    });
}

function updateAttendanceSubjectDropdown() {
    const select = document.getElementById("subject-select");
    const selectedDateStr = document.getElementById("attendance-date").value;
    select.innerHTML = "";
    
    const scheduleStatus = getActiveScheduleForDate(selectedDateStr);

    if (scheduleStatus.status !== "active") {
        let opt = document.createElement("option");
        opt.text = scheduleStatus.status === "exam" ? `-- ${scheduleStatus.message} --` : "-- Data Not Updated Yet --";
        opt.value = "";
        select.appendChild(opt);
        return;
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDay = days[new Date(selectedDateStr).getDay()];
    
    const dayClasses = scheduleStatus.data.filter(item => item.day.toLowerCase() === selectedDay.toLowerCase());

    if(dayClasses.length === 0) {
        let opt = document.createElement("option");
        opt.text = `-- No standard sessions scheduled for ${selectedDay} --`;
        opt.value = "";
        select.appendChild(opt);
    } else {
        dayClasses.forEach(item => {
            let opt = document.createElement("option");
            opt.value = `Sec ${item.section} - ${item.subjectCode}`;
            opt.text = `[${item.timeSlot}] ${item.subjectCode}`;
            select.appendChild(opt);
        });
    }
}

function toggleExtraClassMode() {
    extraClassMode = !extraClassMode;
    const standardWrapper = document.getElementById("standard-subject-wrapper");
    const extraWrapper = document.getElementById("extra-class-form-wrapper");
    const toggleBtn = document.getElementById("extra-class-btn");
    const title = document.getElementById("session-panel-title");

    if (extraClassMode) {
        standardWrapper.classList.add("hidden");
        extraWrapper.classList.remove("hidden");
        toggleBtn.innerText = "Standard View";
        title.innerText = "2. Extra Class Logging";
    } else {
        standardWrapper.classList.remove("hidden");
        extraWrapper.classList.add("hidden");
        toggleBtn.innerText = "Add Extra Class";
        title.innerText = "1. Standard Session Logging";
    }
}

function formatTimeToAMPM(timeString) {
    if (!timeString) return "";
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

// core implementation logic engine: processing self service submissions validation channels
async function submitSelfAttendance() {
    const rollDigitsInput = document.getElementById("student-roll-digits").value.trim();
    const statusMsg = document.getElementById("submission-status-msg");
    
    statusMsg.classList.add("hidden");

    // 1. Structural numeric constraints checking validations
    const rollNum = parseInt(rollDigitsInput);
    if (!rollDigitsInput || isNaN(rollNum) || rollDigitsInput.length !== 3 || rollNum < 64 || rollNum > 126) {
        statusMsg.innerText = "❌ Validation Error: Enter an active three digit identifier extension from 064 to 126.";
        statusMsg.className = "text-sm font-semibold text-red-600 block";
        return;
    }

    const fullRollNumber = `25PGHR${rollDigitsInput}`;
    let dateInput, selectedSubject;

    // 2. Class tracking configuration assembly evaluation blocks
    if (extraClassMode) {
        dateInput = document.getElementById("extra-class-date").value;
        const customSubject = document.getElementById("subject-custom-input").value.trim().toUpperCase();
        const timeFrom = formatTimeToAMPM(document.getElementById("extra-time-from").value);
        const timeTo = formatTimeToAMPM(document.getElementById("extra-time-to").value);

        if (!dateInput || !customSubject || !timeFrom || !timeTo) {
            alert("Please complete all fields for the extra class configuration.");
            return;
        }
        selectedSubject = `EXTRA: [${timeFrom} - ${timeTo}] ${customSubject}`;
    } else {
        dateInput = document.getElementById("attendance-date").value;
        selectedSubject = document.getElementById("subject-select").value;

        if (!selectedSubject || selectedSubject.trim() === "" || selectedSubject.startsWith("--")) {
            alert("Please select an active scheduled course session slot before signing.");
            return;
        }
    }

    const submitBtn = document.getElementById("self-submit-btn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Logging Verification Stream...";

    // 3. Compile transaction payload packet structure
    const outputPayload = {
        date: dateInput,
        subject: selectedSubject,
        records: [
            { email: fullRollNumber, status: "Present" } // Maps roll ID directly into spreadsheet log destination row
        ]
    };

    try {
        await fetch(BACKEND_API_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(outputPayload)
        });

        statusMsg.innerText = `✅ Success: Presence verified cleanly for ${fullRollNumber}!`;
        statusMsg.className = "text-sm font-bold text-emerald-600 block";
        document.getElementById("student-roll-digits").value = ""; // Clear input field upon successful processing
    } catch (error) {
        statusMsg.innerText = "❌ Network Error: Transaction submission failed link arrays.";
        statusMsg.className = "text-sm font-semibold text-red-600 block";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Mark Me Present";
    }
}