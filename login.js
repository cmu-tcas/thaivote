async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("ect.json");
    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    console.log("Fetched data:", data); // Debug ข้อมูลที่ดึงมา
    const user = data.users.find(
      (u) => u.username === username && u.password === password
    );
    console.log("Matched user:", user); // Debug ข้อมูลผู้ใช้

    if (user) {
      localStorage.setItem("jwt", user.jwt);
      console.log("JWT saved:", user.jwt); // Debug JWT ที่บันทึก
      Swal.fire({
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        window.location.href = "./vote.html";
        console.log("Redirecting to vote.html"); // Debug การเปลี่ยนหน้า
      });
    } else {
      Swal.fire({
        text: "Invalid username or password!",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    Swal.fire({
      text: "Something went wrong. Please try again later.",
      icon: "error",
      confirmButtonText: "OK"
    });
  }
}

// async function login() {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   try {
//     const response = await fetch("ect.json");
//     if (!response.ok) throw new Error("Failed to fetch user data");

//     const data = await response.json();
//     const user = data.users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       localStorage.setItem("jwt", user.jwt);
//       Swal.fire({
//         text: "Login successful!",
//         icon: "success",
//         confirmButtonText: "OK"
//       }).then(() => {
//         window.location.href = "./vote.html";
//       });
//     } else {
//       Swal.fire({
//         text: "Invalid username or password!",
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//     }
//   } catch (error) {
//     console.error("Error logging in:", error);
//     Swal.fire({
//       text: "Something went wrong. Please try again later.",
//       icon: "error",
//       confirmButtonText: "OK"
//     });
//   }
// }
