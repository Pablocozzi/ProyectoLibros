document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("carritoContainer");
    const btnComprar = document.getElementById("btnComprar");

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-red-400'>No hay productos en el carrito.</p>";
        btnComprar.style.display = 'none';
        return;
    }

    renderizarCarrito();

    function renderizarCarrito() {
        contenedor.innerHTML = "";

        carrito.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "bg-slate-800 p-4 rounded flex justify-between items-center";

            div.innerHTML = `
                <div>
                    <h3 class="font-bold text-lg">${item.titulo}</h3>
                    <p>Cantidad: ${item.cantidad}</p>
                    <p>Total: $${item.precio * item.cantidad}</p>
                </div>
                <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded" data-index="${index}">Eliminar</button>
            `;

            contenedor.appendChild(div);
        });

        document.querySelectorAll("button[data-index]").forEach(btn => {
            btn.addEventListener("click", () => {
                const i = parseInt(btn.dataset.index);
                carrito.splice(i, 1);
                localStorage.setItem('carrito', JSON.stringify(carrito));
                renderizarCarrito();
            });
        });

        if (carrito.length === 0) {
            contenedor.innerHTML = "<p class='text-red-400'>No hay productos en el carrito.</p>";
            document.getElementById("btnComprar").style.display = "none";
        }
    }

    btnComprar.addEventListener("click", async () => {
        try {
            let usuario = "Invitado";
            const userData = sessionStorage.getItem("user");

            if (userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    usuario = parsedUser.userName || "Invitado";
                } catch (e) {
                    console.error("Error al parsear el usuario:", e);
                }
            }

            const orden = {
                    usuario,
                    productos: carrito,
                    total: carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0),
                    fecha: new Date().toISOString()
            };

            const res = await fetch("http://localhost:3001/ventas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orden)
            });

            if (res.ok) {
                alert("Compra realizada con éxito.");
                localStorage.removeItem('carrito');
                location.reload();
            } else {
                alert("Error al procesar la orden.");
            }
        } catch (e) {
            console.error(e);
            alert("Error en la conexión.");
        }
    });
});


















// document.addEventListener("DOMContentLoaded", () => {
//     const contenedor = document.getElementById("carritoContainer");
//     const btnComprar = document.getElementById("btnComprar");

//     let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


//      if (carrito.length === 0) {
//         contenedor.innerHTML = "<p class='text-red-400'>No hay productos en el carrito.</p>";
//         btnComprar.style.display = 'none'; 
//         return;
//     }

//     renderizarCarrito();

// function renderizarCarrito() {
//     contenedor.innerHTML = "";

//     carrito.forEach((item, index) => {
//         const div = document.createElement("div");
//         div.className = "bg-slate-800 p-4 rounded flex justify-between items-center";

//         div.innerHTML = `
//             <div>
//                 <h3 class="font-bold text-lg">${item.titulo}</h3>
//                 <p>Cantidad: ${item.cantidad}</p>
//                 <p>Total: $${item.precio * item.cantidad}</p>
//             </div>
//             <button class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded" data-index="${index}">Eliminar</button>
//         `;

//         contenedor.appendChild(div);
//     });

//     document.querySelectorAll("button[data-index]").forEach(btn => {
//         btn.addEventListener("click", () => {
//             const i = parseInt(btn.dataset.index);
//             carrito.splice(i, 1);
//             localStorage.setItem('carrito', JSON.stringify(carrito));
//             renderizarCarrito();
//         });
//     });

//     if (carrito.length === 0) {
//         contenedor.innerHTML = "<p class='text-red-400'>No hay productos en el carrito.</p>";
//         document.getElementById("btnComprar").style.display = "none";
//     }
// }
//     btnComprar.addEventListener("click", async () => {
//         try {
//             const orden = {
//                 usuario: sessionStorage.getItem('usuario'),
//                 productos: carrito,
//                 total: carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0),
//                 fecha: new Date().toISOString()
                
                
//             };

//             const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(orden)
//             });

//             if (res.ok) {
//                 alert("Compra realizada con éxito.");
//                 localStorage.removeItem('carrito');
//                 location.reload();
//             } else {
//                 alert("Error al procesar la orden.");
//             }
//         } catch (e) {
//             console.error(e);
//             alert("Error en la conexión.");
//         }
//     });

// });