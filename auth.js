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

// DOM Signout Element
const signOut = document.querySelectorAll(".signOut");

const login_link = () => { window.location.replace("../login_signup/login.html") }

//         {getUserSession}
// ---------- Start ----------
async function get_user_session() {
    const { data, error } = await supabase_api.auth.getSession();

    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }

    if (data.session) {
        // ✅ Agar user login hai
        if (window.location.pathname.endsWith("/login_signup/login.html")) {
            window.location.replace("../index.html");
            return; // stop further execution to prevent loop
        }

        sess_user_name = data.session.user.user_metadata.full_name;
        sess_user_email = data.session.user.email;
        localStorage.setItem("user_name", sess_user_name);
        localStorage.setItem("user_email", sess_user_email);

        signOut.forEach(btn => {
            btn.textContent = "Sign Out";
            btn.classList.remove("btn-info");
            btn.classList.add("btn-danger");
            btn.onclick = sign_out;
        });

    } else {
        // ❌ Agar user login nahi hai
        signOut.forEach(btn => {
            btn.textContent = "Login";
            btn.classList.remove("btn-danger");
            btn.classList.add("btn-info");
            btn.onclick = login_link;
        });

        // ✅ Prevent loop by only redirecting if NOT already on index.html
        if (
            !window.location.pathname.endsWith("/login_signup/login.html") &&
            !window.location.pathname.endsWith("/index.html") &&
            !window.location.pathname.endsWith("/")
        ) {
            sweet_alert("Please Login!", "warning");
            setTimeout(() => window.location.replace("../index.html"), 2000);
            return;
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
    });
    if (error) {
        if (error.message === "User already registered") {
            sweet_alert(`Email already registered`, `error`);
            return;
        }
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }
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
    });
    if (error) {
        console.error(`Error : ${error.message}`);
        sweet_alert(`${error.message}`, `error`);
        return;
    }
    sweet_alert(`Login Successfull!`, `success`);
    setTimeout(() => get_user_session(), 1000);
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

    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");

    alert(`Logout Successful!`);
    // sweet_alert(`Logout Successful!`, `success`);

    signOut.forEach(btn => {
        btn.textContent = "Login";
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-info");
        btn.onclick = login_link;
    });

    setTimeout(() => {
        sessionStorage.removeItem("session_checked");
        window.location.replace("../index.html");
    }, 1500);
}
// ---------- End ----------


let initial_func = async (e) => {
    e.preventDefault();
    await get_user_session();
};

document.addEventListener("DOMContentLoaded", async () => {
    await get_user_session();
});

console.log(signOut);
