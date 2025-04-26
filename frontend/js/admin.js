fetch("../backend/admin.php")
    .then(res => res.json())
    .then(users => {
        const div = document.getElementById("users");
        div.innerHTML = "<h3>All Registered Users</h3>";
        users.forEach(user => {
            const el = document.createElement("div");
            el.textContent = `${user.username} (${user.email}) - [${user.role}]`;
            el.classList.add("user-entry");
            div.appendChild(el);
        });
    })
    .catch(err => {
        document.getElementById("users").textContent = "Error loading users.";
    });
