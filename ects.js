document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) {
        window.location.href = "home.html";  // หากไม่มีผู้ใช้ล็อกอินอยู่ ให้กลับไปหน้า login
    } else {
        document.getElementById("userProfile").textContent = `${user.firstName}`;
        document.getElementById("userName").textContent = `${user.lastName}`;
        document.getElementById("profilePic").src = user.profilePic;
    }
});

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "home.html";
}
