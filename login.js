// var jwt = localStorage.getItem("jwt");
// if (jwt != null) {
//   window.location.href = 'vote.html'
// }

// function login() {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   const xhttp = new XMLHttpRequest();
//   xhttp.open("POST", "ect.json");
//   xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//   xhttp.send(JSON.stringify({
//     "username": username,
//     "password": password
//   }));
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4) {
//       const objects = JSON.parse(this.responseText);
//       console.log(objects);
//       if (objects['status'] == 'ok') {
//         localStorage.setItem("jwt", objects['accessToken']);
//         Swal.fire({
//           text: objects['message'],
//           icon: 'success',
//           confirmButtonText: 'OK'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             window.location.href = './index.html';
//           }
//         });
//       } else {
//         Swal.fire({
//           text: objects['message'],
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     }
//   };
//   return false;
// }
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // ส่งข้อมูลไปที่ API เพื่อทำการ Login
    const response = await fetch("https://thaivote.pages.dev/ect.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresIn: 60000,  // ตั้งเวลา expiration (ตัวอย่าง)
      }),
    });

    // ตรวจสอบสถานะของ response
    const data = await response.json();
    console.log("Response data:", data);  // Debug ข้อมูลที่ได้รับ

    if (response.ok) {
      // ถ้าการตอบกลับเป็น 200 OK
      if (data.status === "ok") {
        // บันทึก JWT ลงใน LocalStorage
        localStorage.setItem("jwt", data.accessToken);
        console.log("JWT saved:", data.accessToken);  // Debug JWT ที่บันทึก

        // แสดงข้อความสำเร็จ
        Swal.fire({
          text: data.message,
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          window.location.href = "./vote.html"; // เปลี่ยนหน้าไปยัง vote.html
          console.log("Redirecting to vote.html");  // Debug การเปลี่ยนหน้า
        });
      } else {
        // กรณีที่การตอบกลับเป็นสถานะ 'error'
        Swal.fire({
          text: data.message,
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } else {
      // กรณีที่ status ไม่ใช่ 200 OK
      Swal.fire({
        text: "Login failed. Please check your username and password.",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  } catch (error) {
    // จัดการข้อผิดพลาดที่อาจเกิดขึ้นจากการเชื่อมต่อ
    console.error("Error logging in:", error);
    Swal.fire({
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonText: "OK"
    });
  }
}
