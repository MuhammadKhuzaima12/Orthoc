const supabaseUrl = 'https://qpvjkcjwwvuhvxjgxzdb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwdmprY2p3d3Z1aHZ4amd4emRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5NzQ4MDgsImV4cCI6MjA3NzU1MDgwOH0.wAJsHSu6ipuIZIhnnLA1NGrsntQLLcgKDy-XzOL4klU"
const supabase_api = supabase.createClient(supabaseUrl, supabaseKey);

//  Fetching Doctors Information
const get_doctors_info = async () => {
    const { data, error } = await supabase_api
        .from('doctors_data')
        .select();

    if (error) {
        console.error(error.message);
        return;
    }

    console.log(data)
    return data;
}
// get_doctors_info()

const doctor_info = async (selected_doc) => {
    const selected_doctor = selected_doc.replace(/_/g, " ");
    const { data, error } = await supabase_api
        .from('doctors_data')
        .select()
        .eq("name", `${selected_doctor}`)
        .single();

    if (error) {
        console.error(error.message);
        return;
    }

    // console.log(data)
    return data;
}
// doctor_info()

const add_appointments = async (doctor, day, time) => {
    const { error } = await supabase_api
        .from('appointments')
        .insert({
            username: `${localStorage.getItem("user_name")}`,
            user_email: `${localStorage.getItem("user_email")}`,
            doctor: `${doctor}`,
            day: `${day}`,
            time: `${time}`,
        });

    if (error) {
        console.error(error.message);
        return;
    }
    return;
}
// add_appointments()

const get_appointments = async (doctor, day, time) => {
    const { data, error } = await supabase_api
        .from('appointments')
        .select()
        .eq("user_email", `${localStorage.getItem("user_email")}`);

    if (error) {
        console.error(error.message);
        return;
    }

    console.log(data)
    return data;
}
// get_appointments()

