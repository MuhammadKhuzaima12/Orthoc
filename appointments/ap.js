const user_aps = document.getElementById("user_aps");

const show_aps = async () => {
    const appointments = await get_appointments();
    appointments.forEach(appointment => {
        user_aps.innerHTML += `
        <li>${appointment.doctor}</li>
        `; 
    });
}