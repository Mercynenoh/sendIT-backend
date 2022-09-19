import {Router} from 'express'
import{addParcel, getParcel, deleteParcel, updateDelivered, updatesent, getAllParcels, editParcel, getrecievedParcels, getsentParcels} from '../Controllers/parcelController'
import { VerifyToken } from '../Middleware/verifyToken'


 const routers = Router()

 routers.post('/add',VerifyToken, addParcel)
 routers.get('/sentparcels/:Senderemail', getsentParcels)
 routers.get('/receivedparcels/:RecepientEmail', getrecievedParcels)
 routers.put('/edit/:id', editParcel)
 routers.get('/get',VerifyToken, getAllParcels)
 routers.put('/update/:id', updateDelivered)
 routers.delete('/delete/:id', deleteParcel)
 routers.post('/sent/:id', updatesent)
 routers.get('/:id', getParcel)
 

 
 export  default routers
