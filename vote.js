// ตรวจสอบว่า jwt มีอยู่ใน localStorage หรือไม่
const jwt = localStorage.getItem("jwt");
if (!jwt) {
  window.location.href = 'index.html';
}

// โหลดข้อมูลผู้ใช้
async function loadUser() {
  try {
    const response = await fetch("ect.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${jwt}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await response.json();
    if (data.status === "ok") {
      const user = data.user;
      document.getElementById("fname").innerHTML = user.fname;
      document.getElementById("avatar").src = user.avatar;
      document.getElementById("username").innerHTML = user.username;
    } else {
      // กรณีที่ JWT ไม่ถูกต้องหรือหมดอายุ
      localStorage.removeItem("jwt");
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error("Error loading user:", error);
    // กรณีมีปัญหาในการเชื่อมต่อกับ API
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

// ฟังก์ชันสำหรับออกจากระบบ
function logout() {
  localStorage.removeItem("jwt");
  window.location.href = 'index.html';
}

// เรียกใช้ฟังก์ชันโหลดข้อมูลผู้ใช้
loadUser();
