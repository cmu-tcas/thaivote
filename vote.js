// ฟังก์ชันสำหรับโหลดข้อมูลผู้ใช้
    async function loadUserData() {
      const username = localStorage.getItem("username");
      const fname = localStorage.getItem("fname");
      const avatar = localStorage.getItem("avatar");

// แสดงข้อมูลพื้นฐาน (fname, username, avatar)
        if (fname) {
            const fnameElement = document.getElementById("user-fname");
            const fnameDisplayElement = document.getElementById("user-fname-display");
    
            if (fnameElement) fnameElement.innerText = fname; // แสดง fname ใน dropdown
            if (fnameDisplayElement) fnameDisplayElement.innerText = fname; // แสดง fname ใน card-text
        }
      if (username) document.getElementById("username-display").innerText = username;
      if (avatar) {
        document.getElementById("avatar").src = avatar;
      } else {
        document.getElementById("avatar").src = "default-avatar.png";
      }

// ดึงข้อมูลจาก users.json
      try {
        const response = await fetch("users.json");
        if (!response.ok) throw new Error("Failed to fetch users.json");

        const users = await response.json();
        const user = users.find((u) => u.username === username);

        if (user) {
          // แสดงสถานะการเลือกตั้ง
          const statusElement = document.getElementById("status-election");
          statusElement.innerText = user["status-election"];
          statusElement.style.color = user["status-color"];
        } else {
          // กรณีไม่พบผู้ใช้ใน JSON
          console.error("User not found in users.json");
          document.getElementById("status-election").innerText = "ไม่พบข้อมูลผู้ใช้";
          document.getElementById("status-election").style.color = "red";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        document.getElementById("status-election").innerText =
          "ไม่สามารถโหลดข้อมูลสถานะได้ในขณะนี้";
        document.getElementById("status-election").style.color = "red";
      }
    }

// ฟังก์ชันสำหรับการล็อกเอาท์
    function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("fname");
      localStorage.removeItem("avatar");
      window.location.href = "index.html";
    }

// เรียกฟังก์ชันโหลดข้อมูลผู้ใช้เมื่อโหลดหน้า
    window.onload = loadUserData;



//     // อัปเดต username
//     if (username) {
//         const usernameElement = document.getElementById("username-display");
//         if (usernameElement) usernameElement.innerText = username;
//     }

//     // อัปเดต avatar
//     if (avatar) {
//         const avatarElement = document.getElementById("avatar");
//         if (avatarElement) avatarElement.src = avatar;
//     } else {
//         const avatarElement = document.getElementById("avatar");
//         if (avatarElement) avatarElement.src = "default-avatar.png"; // รูปเริ่มต้นถ้าไม่มี avatar
//     }
// };

// // ฟังก์ชันสำหรับการล็อกเอาท์
// function logout() {
//     localStorage.removeItem("username"); // ลบ username ออกจาก localStorage
//     localStorage.removeItem("fname"); // ลบ fname ออกจาก localStorage
//     localStorage.removeItem("avatar"); // ลบ avatar ออกจาก localStorage
//     window.location.href = "index.html"; // เปลี่ยนไปหน้า index.html
// }
