import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ventasPath = path.join(__dirname, "../client/data/ventas.json");

const leerVentas = async () => {
  const data = await readFile(ventasPath, "utf-8");
  return JSON.parse(data);
};

const guardarVentas = async (data) => {
  await writeFile(ventasPath, JSON.stringify(data, null, 2));
};

// POST - Guardar nueva venta
router.post("/", async (req, res) => {
  try {
    const ventas = await leerVentas();
    const nueva = {
      id: Date.now(),
      ...req.body
    };
    ventas.push(nueva);
    await guardarVentas(ventas);
    res.status(201).json({ mensaje: "Venta registrada", venta: nueva });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar venta" });
  }
});

// GET - Obtener todas las ventas
router.get("/", async (req, res) => {
  try {
    const ventas = await leerVentas();
    res.json(ventas);
  } catch {
    res.status(500).json({ error: "Error al leer ventas" });
  }
});

// DELETE - Eliminar venta por ID
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  let ventas = await leerVentas();
  const inicial = ventas.length;
  ventas = ventas.filter(v => v.id !== id);
  if (ventas.length === inicial) return res.status(404).json({ mensaje: "No encontrada" });

  await guardarVentas(ventas);
  res.json({ mensaje: "Venta eliminada" });
});

// PUT - Modificar una venta
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ventas = await leerVentas();
  const index = ventas.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).json({ mensaje: "No encontrada" });

  ventas[index] = { ...ventas[index], ...req.body };
  await guardarVentas(ventas);
  res.json({ mensaje: "Venta actualizada", venta: ventas[index] });
});

// GET - Resumen de ventas
router.get('/resumen', async (req, res) => {
  try {
    const ventas = await leerVentas();

    const resumen = {
      totalVentas: ventas.length,
      montoTotal: 0,
      productosVendidos: {},
      usuarios: {},
    };

    ventas.forEach((venta) => {
      resumen.montoTotal += venta.total;

      venta.productos.forEach((p) => {
        const nombre = p.titulo;
        resumen.productosVendidos[nombre] = (resumen.productosVendidos[nombre] || 0) + p.cantidad;
      });

      resumen.usuarios[venta.usuario] = (resumen.usuarios[venta.usuario] || 0) + venta.total;
    });

    const topProductos = Object.entries(resumen.productosVendidos)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }));

    const [mejorUsuario, gasto] = Object.entries(resumen.usuarios)
      .sort((a, b) => b[1] - a[1])[0] || [null, 0];

    res.json({
      totalVentas: resumen.totalVentas,
      montoTotal: resumen.montoTotal,
      topProductos,
      mejorUsuario: mejorUsuario ? { nombre: mejorUsuario, gasto } : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al generar resumen de ventas.' });
  }
});



export default router;