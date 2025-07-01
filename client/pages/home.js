document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("librosContainer");
    const selector = document.getElementById("categoria");

    const nombreUsuario = JSON.parse(sessionStorage.getItem("user"))?.username || "Invitado";
document.getElementById("usuarioNombre").textContent = `Usuario: ${nombreUsuario}`;

    let libros = [];

    fetch("../../data/data.json")
        .then(res => res.json())
        .then(data => {
            libros = data;
            cargarCategorias(libros);
            mostrarLibros(libros);
        })
        .catch(err => {
            contenedor.innerHTML = "<p class='text-red-500'>Error al cargar los libros.</p>";
            console.error("Error:", err);
        });

    selector.addEventListener("change", () => {
        const seleccion = selector.value;
        const filtrados = seleccion === "Todas"
            ? libros
            : libros.filter(libro => libro.categoria === seleccion);
        mostrarLibros(filtrados);
    });

    function cargarCategorias(libros) {
        const categorias = [...new Set(libros.map(libro => libro.categoria))];
        categorias.forEach(cat => {
            const opcion = document.createElement("option");
            opcion.value = cat;
            opcion.textContent = cat;
            selector.appendChild(opcion);
        });
    }

    function mostrarLibros(lista) {
    contenedor.innerHTML = "";
    lista.forEach(libro => {
        const div = document.createElement("div");
        div.className = "bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4 items-center";

        div.innerHTML = `
            <img src="${libro.imagen}" alt="${libro.titulo}" class="w-32 h-48 object-cover rounded">
            <div class="text-left flex-1">
                <h3 class="text-xl font-semibold text-slate-100">${libro.titulo}</h3>
                <p class="text-slate-400"><strong>Autor:</strong> ${libro.autor}</p>
                <p class="text-slate-300 my-2">${libro.info}</p>
                <p class="text-slate-400"><strong>Páginas:</strong> ${libro.paginas}</p>
                <p class="text-slate-400"><strong>Precio:</strong> $${libro.precio}</p>
                <button data-id="${libro.id}" class="btn-agregar mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Agregar al carrito</button>
            </div>
        `;
        contenedor.appendChild(div);
    });

    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const libro = libros.find(lib => lib.id === id);
            agregarAlCarrito(libro);
        });
    });
}

function agregarAlCarrito(libro) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existente = carrito.find(p => p.id === libro.id);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...libro, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`"${libro.titulo}" fue añadido al carrito.`);
}

const verCarritoBtn = document.getElementById("btnVerCarrito");
verCarritoBtn.addEventListener("click", () => {
    window.location.href = "carrito.html";
});

  document.getElementById("btnCerrarSesion").addEventListener("click", () => {
  sessionStorage.clear();  // Borra todo el sessionStorage
  window.location.href = "../index.html"; // Redirige al login
});

});



