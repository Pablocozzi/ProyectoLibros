import { API } from "./api.js";
const formLogIn = document.getElementById("logInForm");
const error = document.getElementById("error");

formLogIn.addEventListener("submit", (e) => {
  e.preventDefault();
  logIn();
});

const logIn = async () => {
  const userName = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;
  const rol = document.getElementById("rol").value;

  try {

    const res = await fetch(`${API}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username: userName, pass, rol }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
console.log(userName, pass, rol)
    const data = await res.json();

    if (!res.ok) {
      error.textContent = data.message || "Error al iniciar sesión";
      return;
    }
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('rol', data.rol);



    if (data.rol === "admin") {
      window.location.href = "/pages/admin.html";
    } else {
      window.location.href = "/pages/home.html";
    }

  } catch (e) {
    console.error("Error:", e);
    error.textContent = "No se pudo conectar con el servidor.";
  }
};
