document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("ventasContainer");

    cargarVentas();


    async function cargarVentas() {
        try {
            const res = await fetch("http://localhost:3001/ventas");
            const ventas = await res.json();

            contenedor.innerHTML = "";

            ventas.forEach(venta => {
                const div = document.createElement("div");
                div.className = "bg-slate-800 p-4 rounded";

                // Productos renderizados
                const productosHTML = venta.productos.map(p => {
                    return `<li>${p.titulo} (x${p.cantidad}) - $${p.precio * p.cantidad}</li>`;
                }).join("");

                div.innerHTML = `
                    <p><strong>ID:</strong> ${venta.id}</p>
                    <p><strong>Usuario:</strong> ${venta.usuario}</p>
                    <p><strong>Fecha:</strong> ${new Date(venta.fecha).toLocaleString()}</p>
                    <p><strong>Total:</strong> $${venta.total}</p>
                    <p><strong>Productos:</strong></p>
                    <ul class="list-disc pl-6">${productosHTML}</ul>
                    <button class="eliminarBtn bg-red-600 text-white px-3 py-1 mt-2 ml-2 rounded" data-id="${venta.id}">Eliminar</button>
                `;

                contenedor.appendChild(div);
            });

            // Eventos para eliminar
            document.querySelectorAll(".eliminarBtn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    if (confirm("¿Estás seguro de eliminar esta venta?")) {
                        await fetch(`http://localhost:3001/ventas/${id}`, {
                            method: "DELETE"
                        });
                        cargarVentas();
                    }
                });
            });

            // // Eventos para modificar usuario
            // document.querySelectorAll(".editarBtn").forEach(btn => {
            //     btn.addEventListener("click", async () => {
            //         const id = btn.dataset.id;
            //         const div = btn.parentElement;
            //         const nuevoUsuario = div.querySelector(".usuarioInput").value;

            //         const res = await fetch(`http://localhost:3001/ventas/${id}`, {
            //             method: "PUT",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify({ usuario: nuevoUsuario })
            //         });

            //         if (res.ok) {
            //             alert("Usuario modificado.");
            //             cargarVentas();
            //         } else {
            //             alert("Error al modificar la venta.");
            //         }
            //     });
            // })

        } catch (error) {
            console.error("Error al cargar ventas:", error);
            contenedor.innerHTML = "<p class='text-red-500'>No se pudieron cargar las ventas.</p>";
        }
    }
});
