async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("ect.json");
    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    const user = data.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("jwt", user.jwt);
      Swal.fire({
        text: "Login successful!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        window.location.href = "./vote.html";
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
