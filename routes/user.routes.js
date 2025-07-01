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
// router.post('/login', (req, res) => {
//   const { username, pass, rol } = req.body;
//     console.log(userData)
//   const user = userData.find(
//     u =>
//       (u.username === username || u.userName === username) &&
//       u.pass === pass &&
//       u.rol === rol
//   );

//   if (user) {
//     return res.status(200).json({
//       status: true,
//       username: user.username || user.userName,
//       name: user.name,
//       rol: user.rol
//     });
//   }
//   console.log('Intentando login con:', req.body);
//   res.status(400).json({ status: false, mensaje: 'Usuario o rol incorrecto' });
// });


// router.post('/login', (req, res)=>{
//     const userName = req.body.userName
//     const pass = req.body.pass

//     const result = userData.find(e => e.username === userName && e.pass === pass)
    
//     if(result){
//         const data = {
//             name: result.name,
//             lastName: result.lastname,
//             userName: result.username,
//             status: true
//         }
//         console.log(data)
//         res.status(200).json(data)
//     }else{
//         res.status(400).json({status:false})
//     }
// })


export default router 