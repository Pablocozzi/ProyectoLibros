import express from 'express'
import userRouter from './routes/user.routes.js' 
import ventasRoutes from './routes/ventas.routes.js'

const app = express()
const port = 3001

app.use(express.json())

app.use(express.static('./client'))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.use('/user', userRouter)
app.use('/ventas', ventasRoutes)