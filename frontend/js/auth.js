function register() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    fetch("../backend/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Registered successfully! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Registration failed. Try another username/email.");
        }
    });
}


function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    fetch("../backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            if (data.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "dashboard.html";
            }
        } else {
            alert("Invalid credentials.");
        }
    });
}
