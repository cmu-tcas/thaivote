// ฟังก์ชันสำหรับการโหลดข้อมูลผู้ใช้จาก localStorage
window.onload = function() {
    const username = localStorage.getItem("username"); // ดึง username จาก localStorage
    const fname = localStorage.getItem("fname"); // ดึง fname จาก localStorage
    const avatar = localStorage.getItem("avatar"); // ดึง avatar จาก localStorage

    // อัปเดต fname ในส่วนที่ระบุ id="user-fname"
    if (fname) {
        const fnameElement = document.getElementById("user-fname");
        const fnameDisplayElement = document.getElementById("user-fname-display");

        if (fnameElement) fnameElement.innerText = fname; // แสดง fname ใน dropdown
        if (fnameDisplayElement) fnameDisplayElement.innerText = fname; // แสดง fname ใน card-text
    }

    // อัปเดต username
    if (username) {
        const usernameElement = document.getElementById("username-display");
        if (usernameElement) usernameElement.innerText = username;
    }

    // อัปเดต avatar
    if (avatar) {
        const avatarElement = document.getElementById("avatar");
        if (avatarElement) avatarElement.src = avatar;
    } else {
        const avatarElement = document.getElementById("avatar");
        if (avatarElement) avatarElement.src = "default-avatar.png"; // รูปเริ่มต้นถ้าไม่มี avatar
    }
};

// ฟังก์ชันสำหรับการล็อกเอาท์
function logout() {
    localStorage.removeItem("username"); // ลบ username ออกจาก localStorage
    localStorage.removeItem("fname"); // ลบ fname ออกจาก localStorage
    localStorage.removeItem("avatar"); // ลบ avatar ออกจาก localStorage
    window.location.href = "index.html"; // เปลี่ยนไปหน้า index.html
}
