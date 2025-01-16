document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'กรุณาเข้าสู่ระบบก่อนใช้งาน'
        }).then(() => {
            window.location.href = './index.html'; // Redirect to login page
        });
        return;
    }

    // Display user information
    document.getElementById('fname').textContent = user.fname;
    document.getElementById('username').textContent = user.username;
    document.getElementById('avatar').src = user.avatar || 'default-avatar.png';
});

function logout() {
    Swal.fire({
        title: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ออกจากระบบ',
        cancelButtonText: 'ยกเลิก'
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem('user');
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'ออกจากระบบสำเร็จ'
            }).then(() => {
                window.location.href = './index.html'; // Redirect to login page
            });
        }
    });
}
