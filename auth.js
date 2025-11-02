let pathname = `${window.location.pathname}`;
const sweet_alert = async (title, icon) => {
    Swal.fire({
        title: `${title}`,
        icon: `${icon}`,
        showClass: {
            popup: `
      animate__animated
      animate__fadeInDown
      animate__faster
    `,
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutUp
      animate__faster
    `,
        },
    });
    return;
}

let sess_user_name = "";
let sess_user_email = "";

//         {getUserSession}
// ---------- Start ----------
async function get_user_session() {
    const { data, error } = await supabase_api.auth.getSession();

    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }

    console.log(data)
    if (data.session !== null) {
        if (window.location.pathname.endsWith("/login_signup/login.html")) {
            // Agar woh login page par hai, to use home page par bhej do.
            // window.location.pathname = ("./index.html");
            window.location.pathname = ("./");
        }
        sess_user_name = data.session.user.user_metadata.full_name;
        sess_user_email = data.session.user.email;
        localStorage.setItem("user_name",sess_user_name)
        localStorage.setItem("user_email",sess_user_email)
    } else {
        if (!window.location.pathname.endsWith("/login_signup/login.html")) {
            // Agar woh login page par nahi hai, to use login page par bhej do.
            window.location.replace("./login_signup/login.html");
        }
    }
    return;
}
// ---------- End ----------

//         {SignUp}
// ---------- Start ----------
async function sign_up(name, email, password) {
    const { data, error } = await supabase_api.auth.signUp({
        email: `${email}`,
        password: `${password}`,
        options: {
            data: {
                full_name: `${name}`
            }
        }
    })
    if (error) {
        if (error) {

            if (error.message === "User already registered" ) {
                sweet_alert(`Email already registered`, `error`);
                return;
            }
            console.error(`Error : ${error.message}`);
            sweet_alert(`${error.message}`, `error`);
            return;
        }
    }
    console.log(data)
    sweet_alert(`User Registered!`, `success`);
    return;
}
// ---------- End ----------

//         {SignIn}
// ---------- Start ----------
async function sign_in(email, password) {
    const { data, error } = await supabase_api.auth.signInWithPassword({
        email: `${email}`,
        password: `${password}`,
    })
    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }
    console.log(data)
    sweet_alert(`Login Successfull!`, `success`);
    setTimeout(() => get_user_session(), 2000);
    return;
}
// ---------- End ----------

//         {SignOut}
// ---------- Start ----------
async function sign_out() {
    const { error } = await supabase_api.auth.signOut();

    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }

    sweet_alert(`Logout Successfull!`, `success`);
    setTimeout(() => get_user_session(), 2000);
    return;
}
// ---------- End ----------


const initial_func = async () => {
    get_user_session()
}
initial_func()
