import { API } from "./api.js"
console.log(API)
const formLogIn = document.getElementById("logInForm")
const error = document.getElementById("error")

formLogIn.addEventListener('submit', (e)=>{
    e.preventDefault()
    logIn()
})
//////////////////////////////


const logIn = async () => {
    const userName = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    const rol = document.getElementById("rol").value;

    const res = await fetch(`${API}/user/login`, {
        method: 'POST',
        body: JSON.stringify({ username: userName, pass, rol }), // 👈 CAMBIO AQUÍ
        headers: {
            'Content-Type': 'application/json'
        }
    });
console.log(userName, pass, rol)
    const data = await res.json();

    if (data.status) {
        console.log(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        sessionStorage.setItem('rol', data.rol);

        if (data.rol === "admin") {
            window.location.href = "/pages/admin.html";
        } else {
            window.location.href = "/pages/home.html";
        }
    } else {
        error.textContent = "Error al encontrar al usuario 🫠";
    }
};

// const logIn = async()=>{
//     const userName = document.getElementById("user").value
//     const pass = document.getElementById("pass").value
//     const rol = document.getElementById("rol").value

//     const res = await fetch(`${API}/user/login`,{
//         method: 'POST',
//         body: JSON.stringify({userName,pass}),
//         headers:{
//             'Content-Type': 'application/json'
//         }
//     })

//     const data = await res.json()

//     if(data.status){
//         console.log(data)
//         sessionStorage.setItem('user', JSON.stringify(data))
//         window.location.href = "/pages/home.html"
//     }else{
//         error.textContent = "Error al encontrar al usuario 🫠"
//     }
