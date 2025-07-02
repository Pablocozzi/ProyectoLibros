document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("ventasContainer");
  const selector = document.getElementById("selectorUsuario");
  const resumenUsuario = document.getElementById("resumenUsuario");

  cargarVentas();
  cargarUsuarios();

  async function cargarVentas() {
    try {
      const res = await fetch("http://localhost:3001/ventas");
      const ventas = await res.json();

      contenedor.innerHTML = "";

      ventas.forEach((venta) => {
        const div = document.createElement("div");
        div.className = "bg-slate-800 p-4 rounded mb-4";

        const productosHTML = venta.productos
          .map((p) => {
            return `<li>${p.titulo} (x${p.cantidad}) - $${
              p.precio * p.cantidad
            }</li>`;
          })
          .join("");

        div.innerHTML = `
          <p><strong>ID:</strong> ${venta.id}</p>
          <p><strong>Usuario:</strong> ${venta.usuario}</p>
          <p><strong>Fecha:</strong> ${new Date(
            venta.fecha
          ).toLocaleString()}</p>
          <p><strong>Total:</strong> $${venta.total}</p>
          <p><strong>Productos:</strong></p>
          <ul class="list-disc pl-6">${productosHTML}</ul>
          <button class="eliminarBtn bg-red-600 text-white px-3 py-1 mt-2 ml-2 rounded" data-id="${
            venta.id
          }">Eliminar</button>
        `;

        contenedor.appendChild(div);
      });

      document.querySelectorAll(".eliminarBtn").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const id = btn.dataset.id;
          if (confirm("¿Estás seguro de eliminar esta venta?")) {
            await fetch(`http://localhost:3001/ventas/${id}`, {
              method: "DELETE",
            });
            cargarVentas();
            cargarUsuarios();
          }
        });
      });
    } catch (error) {
      console.error("Error al cargar ventas:", error);
      contenedor.innerHTML =
        "<p class='text-red-500'>No se pudieron cargar las ventas.</p>";
    }
  }

  async function cargarUsuarios() {
    try {
      const res = await fetch("http://localhost:3001/ventas");
      const ventas = await res.json();

      const usuariosUnicos = [...new Set(ventas.map((v) => v.usuario))];
      selector.innerHTML =
        `<option value="">-- Seleccionar usuario --</option>` +
        usuariosUnicos
          .map((u) => `<option value="${u}">${u}</option>`)
          .join("");
    } catch (e) {
      console.error("Error al cargar usuarios:", e);
    }
  }

  selector.addEventListener("change", () => {
    const usuario = selector.value;
    if (usuario) {
      mostrarResumenPorUsuario(usuario);
    } else {
      resumenUsuario.innerHTML = "";
    }
  });

  async function mostrarResumenPorUsuario(usuario) {
    try {
      const res = await fetch("http://localhost:3001/ventas");
      const ventas = await res.json();

      const filtradas = ventas.filter((v) => v.usuario === usuario);

      const cantidadVentas = filtradas.length;

      const totalArticulos = filtradas.reduce((acc, venta) => {
        return acc + venta.productos.reduce((sum, p) => sum + p.cantidad, 0);
      }, 0);

      const totalGenerado = filtradas.reduce(
        (acc, venta) => acc + venta.total,
        0
      );

      resumenUsuario.innerHTML = `
        <p><strong>Usuario:</strong> ${usuario}</p>
        <p><strong>Ventas realizadas:</strong> ${cantidadVentas}</p>
        <p><strong>Total de artículos vendidos:</strong> ${totalArticulos}</p>
        <p><strong>Monto total generado:</strong> $${totalGenerado}</p>
      `;
    } catch (e) {
      console.error("Error al mostrar resumen:", e);
    }
  }

  document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
  });
});
