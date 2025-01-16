function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
        });
        return false;
    }

    fetch('./users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);

            console.log("Username entered:", username);
            console.log("Password entered:", password);
            console.log("User found:", user);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'ล็อกอินสำเร็จ'
                }).then(() => {
                    window.location.href = './vote.html'; // Redirect to vote page
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
                });
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
            });
        });

    return false; // Prevent form submission
}
