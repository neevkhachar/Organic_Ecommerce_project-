import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';      
const app = express();

app.get('/',(req,res)=>{
        res.send("hello kese hoo ")
})

app.use(cors({
        origin:process.env.CORS_ORIGIN,
        optionsSuccessStatus:200
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())

// routes import
import userRoute from './routes/user.Routes.js'
import productRoute from './routes/product.Routes.js'
import orderRoute from './routes/order.Routes.js'
import cartRoute from './routes/cart.Routes.js'

app.use('/api/v1/users',userRoute)
app.use('/api/v1/products',productRoute)
app.use('/api/v1/orders',orderRoute)
app.use('/api/v1/cart',cartRoute)

export { app }
