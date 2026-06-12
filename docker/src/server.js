import express from 'express'
import userRoutes from './routes.js'
import Sequelize  from 'sequelize'
import config from './config/database.js'
import User from './models/User.js'

const app = express()
app.use(express.json())

const sequelize = new Sequelize(config)

User.init(sequelize)
app.use('/usuarios', userRoutes)

sequelize.authenticate().then( () => {
    console.log("Banco de dados Conectado")
    app.listen(3000, () => {
        console.log("Servidor ON")
    })
}).catch( err => {
    console.error(err)
})



