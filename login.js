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

    fetch('users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                // Save user data in localStorage for future use
                localStorage.setItem('user', JSON.stringify(user));
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'ล็อกอินสำเร็จ'
                }).then(() => {
                    window.location.href = 'vote.html'; // Redirect to the vote page
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
                text: 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง'
            });
        });

    return false; // Prevent form submission
}
