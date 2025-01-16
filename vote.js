async function loadUser() {
  const jwt = localStorage.getItem("jwt");

  // ตรวจสอบว่า JWT มีอยู่ใน LocalStorage หรือไม่
  if (!jwt) {
    // ถ้าไม่มี JWT ให้ไปยังหน้า login
    window.location.href = 'login.html';
    return;
  }

  try {
    // เรียก API เพื่อดึงข้อมูลผู้ใช้
    const response = await fetch("https://thaivote.pages.dev/user.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,  // ใส่ JWT ใน Authorization header
      },
    });

    // ตรวจสอบสถานะของ response
    const data = await response.json();
    console.log("User data:", data);  // Debug ข้อมูลที่ได้รับจาก API

    if (response.ok) {
      // ถ้าได้รับข้อมูลผู้ใช้สำเร็จ
      if (data.status === "ok") {
        const user = data.user;
        document.getElementById("fname").innerHTML = user.fname;
        document.getElementById("lname").innerHTML = user.lname;
        document.getElementById("username").innerHTML = user.username;
        document.getElementById("email").innerHTML = user.email;
        document.getElementById("avatar").src = user.avatar;
      }
    } else {
      // ถ้า response ไม่เป็น ok (เช่น JWT ไม่ถูกต้อง)
      Swal.fire({
        text: data.message || "Failed to load user data",
        icon: "error",
        confirmButtonText: "OK"
      }).then(() => {
        // หาก JWT ไม่ถูกต้อง ให้ออกจากระบบ
        localStorage.removeItem("jwt");
        window.location.href = 'login.html';
      });
    }
  } catch (error) {
    // จัดการข้อผิดพลาดที่อาจเกิดขึ้นจากการเชื่อมต่อ
    console.error("Error loading user:", error);
    Swal.fire({
      text: "Unable to load user information. Please try again later.",
      icon: "error",
      confirmButtonText: "OK"
    }).then(() => {
      localStorage.removeItem("jwt");
      window.location.href = 'login.html';
    });
  }
}

// เรียกใช้ฟังก์ชันเพื่อโหลดข้อมูลผู้ใช้เมื่อโหลดหน้า
loadUser();
