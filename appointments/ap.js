const user_aps = document.getElementById("user_aps");

const show_aps = async () => {
    const appointments = await get_appointments();
    if (appointments.length === 0) {
        sweet_alert("No Appointments Found", "error");
        setTimeout(() =>sweet_alert("Book an Appointments", "info"), 2000)
        setTimeout(() =>window.location.replace("../booking_appointments/ba.html"), 4000)
        return;
    } else {
        appointments.forEach(appointment => {
            user_aps.innerHTML += `
        <ul>${appointment.doctor}
        <li>${appointment.day}</li>
        <li>${appointment.time}</li>
        </ul>
        `;
        });
    }
}
show_aps()