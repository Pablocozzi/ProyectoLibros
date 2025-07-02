import { Router } from "express";
import { readFile } from 'fs/promises' 

const router = Router()
const fileUsers = await readFile('./client/data/users.json', 'utf-8')
const userData = JSON.parse(fileUsers)


router.post('/login', (req, res) => {
  const { username, pass, rol } = req.body;
  const user = userData.find(u => u.username === username || u.userName === username);

  if (!user) {
    return res.status(404).json({ status: false, message: "Usuario no encontrado" });
  }

  if (user.pass !== pass) {
    return res.status(401).json({ status: false, message: "Contraseña incorrecta" });
  }

  if (user.rol !== rol) {
    return res.status(403).json({ status: false, message: "Rol incorrecto para este usuario" });
  }

  if (user) {
    return res.status(200).json({
      status: true,
      username: user.username || user.userName,
      name: user.name,
      rol: user.rol
    });
  }
}) 

export default router 