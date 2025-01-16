// ฟังก์ชันสำหรับการโหลดข้อมูลผู้ใช้จาก localStorage
window.onload = function() {
    const username = localStorage.getItem("username"); // ดึง username จาก localStorage
    const fname = localStorage.getItem("fname"); // ดึง fname จาก localStorage
    const avatar = localStorage.getItem("avatar"); // ดึง avatar จาก localStorage

    // แสดงข้อมูลในหน้า vote.html
    if (fname) {
        document.getElementById("fname").innerText = fname; // แสดง fname
    }
    if (username) {
        document.getElementById("username-display").innerText = username; // แสดง username
    }
    if (avatar) {
        document.getElementById("avatar").src = avatar; // แสดง avatar
    } else {
        document.getElementById("avatar").src = "default-avatar.png"; // รูปเริ่มต้นถ้าไม่มี avatar
    }
};

// ฟังก์ชันสำหรับการล็อกเอาท์
function logout() {
    localStorage.removeItem("username"); // ลบ username ออกจาก localStorage
    localStorage.removeItem("fname"); // ลบ fname ออกจาก localStorage
    localStorage.removeItem("avatar"); // ลบ avatar ออกจาก localStorage
    window.location.href = "index.html"; // เปลี่ยนไปหน้า index.html
}
