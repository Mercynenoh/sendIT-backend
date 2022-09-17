import express, { json } from 'express'
import router from './Routes/user'
import cors from 'cors'
import routers from './Routes/parcel'

const app= express()

app.use(json())
app.use(cors())
app.use('/user', router),
app.use('/parcels', routers)


app.listen(5000,()=>{
    
})