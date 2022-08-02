import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

//importing routes
import userRouter from './routes/userRoutes.js'

const app = express()

//mongodb+srv://admin:<password>@cluster0.mtxhn0h.mongodb.net/?retryWrites=true&w=majority


app.use(cors())
app.use(morgan("dev"))
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))


//registering routes
app.use('/users', userRouter)

//connecting to mongodb
const mongodbURL = `mongodb+srv://admin:admin08@cluster0.mtxhn0h.mongodb.net/tour_db?retryWrites=true&w=majority`

const PORT = 5000

mongoose.connect(mongodbURL)
    .then(()=>{
        app.listen(PORT , ()=>{
            console.log(`Server Up and Running on ${PORT}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })
