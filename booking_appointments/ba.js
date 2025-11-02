// DOM Elements
const doctorSelect = document.getElementById("doctors_list");
const daySelect = document.getElementById("avail_days");
const timeSelect = document.getElementById("time_slots");
const sub_btn = document.getElementById("submit_btn");

// Required Values
let doctorName;
let doctorDay;
let doctorTime;

const show_docs_list = async () => {
    const doctors = await get_doctors_info();
    doctors.forEach(doctor => {

        const doctor_name = doctor.name;
        const doctor_name_value = doctor_name.replace(/\s+/g, "_")
        console.log(doctor_name_value)

        doctorSelect.innerHTML += `
        <option value=${doctor_name_value}>${doctor_name} (${doctor.species})
        </option>`;
    })
};
show_docs_list()

// Collapses
const collapseDays = document.getElementById("collapse_days");
const collapseTimes = document.getElementById("collapse_times");
const collapseSubmit = document.getElementById("collapse_submit");

const daysCollapse = new bootstrap.Collapse(collapseDays, { toggle: false });
const timesCollapse = new bootstrap.Collapse(collapseTimes, { toggle: false });
const submitCollapse = new bootstrap.Collapse(collapseSubmit, { toggle: false });

let selected_doc;
document.addEventListener("change", async (event) => {
    const target = event.target;
    if (target.id === "doctors_list") {
        if (target.value !== "select_a_doctor") {
            daysCollapse.show();
            selected_doc = target.value;
            doctorName = selected_doc.replace(/_/g, " ");
            console.log("Selected Doctor:", selected_doc);
            const doctor = await doctor_info(selected_doc);

            // Reset and populate available days
            daySelect.innerHTML = `<option value="select_a_day">Select Day</option>`;
            timeSelect.innerHTML = `<option value="select_a_time">Select Time</option>`;

            // Populate days dynamically
            doctor.avail_days.forEach((day) => {
                daySelect.innerHTML += `<option value="${day}">${day}</option>`;
            });
        };
    } else if (target.id === "avail_days") {
        if (target.value !== "select_a_day") {
            timesCollapse.show();
            doctorDay = target.value == "Sat" ? "Saturday" : target.value == "Tue" ? "Tuesday" : target.value == "Thus" ? "Thursday" : target.value == "Wed" ? "Wednesday" : `${target.value}day`
            console.log("Selected Day:", target.value);
            // Fetch time slots dynamically
            timeSelect.innerHTML = `<option value="select_a_time">Select Time</option>`;
            const doctor = await doctor_info(selected_doc);
            doctor.time_slots.forEach((time) => {
                timeSelect.innerHTML += `<option value="${time}">${time}</option>`;
            });
        };
    } else if (target.id === "time_slots") {
        if (target.value !== "select_a_time") {
            submitCollapse.show();
            doctorTime = target.value;
            console.log("Selected Time Slot:", target.value);
        };
    }
});

sub_btn.addEventListener("click", async () => {
    console.log(doctorName)
    console.log(doctorDay)
    console.log(doctorTime)
    add_appointments(doctorName,doctorDay,doctorTime)
})