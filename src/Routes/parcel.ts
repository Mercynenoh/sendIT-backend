import {Router} from 'express'
import{addParcel, getParcel, deleteParcel, updateDelivered, updatesent, getAllParcels, editParcel, getrecievedParcels} from '../Controllers/parcelController'


 const routers = Router()

 routers.post('/add', addParcel)
 routers.get('/sentparcels', getAllParcels)
 routers.get('/receivedparcels', getrecievedParcels)
 routers.put('/edit', editParcel)
 routers.get('/get', getAllParcels)
 routers.get('/update/:id', updateDelivered)
 routers.get('/delete/:id', deleteParcel)
 routers.post('/sent/:id', updatesent)
 routers.get('/:id', getParcel)
 

 
 export  default routers
