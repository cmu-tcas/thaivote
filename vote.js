// ตรวจสอบว่า jwt มีอยู่ใน LocalStorage หรือไม่
const jwt = localStorage.getItem("jwt");
if (!jwt) {
  window.location.href = 'index.html'; // กลับไปหน้า Login หากไม่มี JWT
}

// ฟังก์ชันโหลดข้อมูลผู้ใช้
async function loadUser() {
  try {
    // ดึงข้อมูลผู้ใช้จาก ect.json
    const response = await fetch("ect.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${jwt}`
      }
    });

    // ตรวจสอบว่า Fetch สำเร็จหรือไม่
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    // แปลงข้อมูลที่ได้จาก JSON
    const data = await response.json();
    console.log("Fetched data:", data); // Debug ข้อมูลที่ได้จากไฟล์ JSON

    // ตรวจสอบว่า JWT ตรงกับผู้ใช้ในระบบหรือไม่
    const user = data.users.find((u) => u.jwt === jwt);
    console.log("Matched user:", user); // Debug ข้อมูลผู้ใช้ที่ตรงกับ JWT

    if (user) {
      // อัปเดตข้อมูลในหน้า HTML
      document.getElementById("fname").innerHTML = user.userInfo.fname;
      document.getElementById("avatar").src = user.userInfo.avatar;
      document.getElementById("username").innerHTML = user.userInfo.username;
    } else {
      // JWT ไม่ถูกต้องหรือหมดอายุ
      console.error("Invalid JWT or user not found");
      localStorage.removeItem("jwt");
      window.location.href = 'index.html';
    }
  } catch (error) {
    console.error("Error loading user:", error); // Debug ข้อผิดพลาดที่เกิดขึ้น
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
  window.location.href = 'index.html'; // กลับไปหน้า Login
}

// เรียกใช้ฟังก์ชันโหลดข้อมูลผู้ใช้
loadUser();
