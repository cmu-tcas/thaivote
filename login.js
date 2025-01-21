// ฟังก์ชันสำหรับการล็อกอิน
function login() {
    const inputUsername = document.getElementById("username").value;
    const inputPassword = document.getElementById("password").value;

    fetch('./users.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(users => {
            const user = users.find(u => u.username === inputUsername && u.password === inputPassword);

            if (user) {
                // บันทึกข้อมูลผู้ใช้ลงใน localStorage
                localStorage.setItem("username", user.username);
                localStorage.setItem("fname", user.fname);
                localStorage.setItem("avatar", user.avatar);
                
                Swal.fire({
                    icon: 'success',
                    title: 'ล็อกอินสำเร็จ',
                    text: `ยินดีต้อนรับ ${user.fname}`,
                }).then(() => {
                    window.location.href = "vote.html";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'ข้อมูลไม่ถูกต้อง',
                    text: 'กรุณาตรวจสอบ username และ password',
                });
            }
        })
        .catch(error => {
            console.error("Error fetching users:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้',
            });
        });

    return false; // ป้องกันการรีเฟรชหน้า
}
const user = users.find(u => u.username === inputUsername && u.password === inputPassword);

if (user) {
    localStorage.setItem("username", user.username);
    localStorage.setItem("fname", user.fname);
    localStorage.setItem("role", user.role);

    Swal.fire({
        icon: 'success',
        title: 'ล็อกอินสำเร็จ',
        text: `ยินดีต้อนรับ ${user.fname}`,
    }).then(() => {
        window.location.href = "vote.html";
    });
}

