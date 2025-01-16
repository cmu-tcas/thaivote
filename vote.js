const jwt = localStorage.getItem("jwt");
if (!jwt) {
  window.location.href = 'index.html';
}

async function loadUser() {
  try {
    const response = await fetch("ect.json");
    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    const user = data.users.find((u) => u.jwt === jwt);

    if (user) {
      const userInfo = user.userInfo;
      document.getElementById("fname").innerHTML = userInfo.fname;
      document.getElementById("avatar").src = userInfo.avatar;
      document.getElementById("username").innerHTML = userInfo.username;
    } else {
      // กรณี JWT ไม่ถูกต้อง
      localStorage.removeItem("jwt");
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error("Error loading user:", error);
    Swal.fire({
      text: "Unable to load user information. Please try again later.",
      icon: "error",
      confirmButtonText: "OK"
    }).then(() => {
      localStorage.removeItem("jwt");
      window.location.href = 'index.html';
    });
  }
}

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = 'index.html';
}

loadUser();
