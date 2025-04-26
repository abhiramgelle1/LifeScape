// Load all users
function loadUsers() {
    fetch("../backend/admin.php")
        .then(res => res.json())
        .then(users => {
            const userDiv = document.getElementById("user-list");
            userDiv.innerHTML = "<h3>Registered Users</h3>";

            users.forEach(user => {
                const container = document.createElement("div");
                container.className = "user-entry";
                container.innerHTML = `
                    <strong>${user.username}</strong> (${user.email}) - Role: ${user.role}
                    <button onclick="editUser(${user.id}, '${user.email}', '${user.role}')">Edit</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                `;
                userDiv.appendChild(container);
            });
        });
}

function editUser(id, oldEmail, oldRole) {
    const newEmail = prompt("Enter new email:", oldEmail);
    const newRole = prompt("Enter new role (player/admin):", oldRole);

    if (newEmail && newRole) {
        fetch("../backend/admin.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, email: newEmail, role: newRole })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                alert("User updated successfully.");
                loadUsers();
            } else {
                alert("Error updating user.");
            }
        });
    }
}

function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch("../backend/admin.php", {
            method: "DELETE",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        }).then(res => res.json()).then(data => {
            if (data.success) {
                alert("User deleted successfully.");
                loadUsers();
            } else {
                alert("Error deleting user.");
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', loadUsers);