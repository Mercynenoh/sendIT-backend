import { Request, RequestHandler, Response } from 'express'
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from '../Config/Config'
import Connection from "../DatabaseHelpers/database";
const db = new Connection()
interface ExtendedRequest extends Request{
  body:{
    id:number
    Adress:string,
     Senderemail:string,
     RecepientEmail:string,
      parcelname:string,
      weight:string,
      Date:string,
      lat:number,
      lng:number,
      TruckNo:string,
      TrackingNo:string,
      Price:number

  }
}


export const addParcel = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id,Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price } = req.body 
    db.exec('insertUpdateParcel',{id,Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price})
    res.json({ message: 'Parcel Inserted Successfully' })
  } catch (error) {
    res.json({ error })
    console.log(error);
    
  }
}
export const editParcel = async (req: ExtendedRequest, res: Response) => {
  try {
    const {id, Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price } = req.body 
    db.exec('insertUpdateParcel',{id,Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price})
    res.json({ message: 'Parcel Inserted Successfully' })
  } catch (error) {
    res.json({ error })
    console.log(error);
    
  }
}

export const getParcel: RequestHandler<{ id: number }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('getOneParcel',{id})
    if (!recordset[0]) {
      res.json({ message: 'Parcel Not Found' })
    } else {
      res.json(recordset)
    }
  } catch (error) {
    res.json({ error })
  }
}



export const updateDelivered: RequestHandler<{ id: number }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('updateParcel',{id})
return res.json({message:'Updated...'})
  } catch (error) {
    res.json({ error })
  }
}



export const deleteParcel: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('deleteParcel',{id})
    return res.json({message:'deleted successfully'})
  } catch (error) {
    if(error instanceof RequestError){
      res.json({message:error.message})
    }
  }
}

export const updatesent: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('updateSent',{id})
return res.json({message:'Updated...'})
  } catch (error) {
    res.json({ error })
  }
}

export const getAllParcels = async (req:Request, res:Response) => {
  try {
    const {recordset} =await db.exec('getallParcels')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}
export const getsentParcels = async (req:Request, res:Response) => {
  try {
    const {recordset} =await db.exec('getsentParcels')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}
export const getrecievedParcels = async (req:Request, res:Response) => {
  try {
    const {recordset} =await db.exec('getReceivedParcels')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
}