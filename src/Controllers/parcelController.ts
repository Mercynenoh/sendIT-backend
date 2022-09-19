import { Request, RequestHandler, Response } from 'express'
import mssql, { RequestError } from 'mssql'
import { sqlConfig } from '../Config/Config'
import Connection from "../DatabaseHelpers/database";
import { parcelSchema } from '../Helper/parcelvalidator';
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
    const {error , value}= parcelSchema.validate(req.body)
        if(error){
          if (error) {
            return res.status(400).json({ error: error.details[0].message });
          }
        }
    db.exec('insertUpdateParcel',{id,Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price})
    res.status(200).json({ message: 'Parcel Inserted Successfully' })
  } catch (error) {
    console.log(error);
    
             if(error instanceof RequestError){
          res.status(400).json({message:error.message})
        }
        }
}

export const editParcel: RequestHandler<{ id: number }> = async (req, res) => {
  try {
    const id = req.params.id
    const {Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price } = req.body as
  { Adress:string,
    Senderemail:string,
    RecepientEmail:string,
     parcelname:string,
     weight:string,
     Date:string,
     lat:number,
     lng:number,
     TruckNo:string,
     TrackingNo:string,
     Price:number}
     const { recordset } = await db.exec("getOneParcel", { id });
     if (!recordset[0]) {

      res.status(404).json({ message: "Parcel Not Found" });

    } else {
    db.exec('insertUpdateParcel',{id,Adress, Senderemail,RecepientEmail, parcelname,weight,Date,lat,lng,TruckNo,TrackingNo,Price})
    res.json({ message: 'Parcel updated Successfully' })
    }
  } catch (error) {
    res.status(400).json({ message: "Parcel Not Found" });
  }
}


export const getParcel: RequestHandler<{ id: number }> = async (req, res) => {
  try {
    const id = req.params.id
    const {recordset} =await db.exec('getOneParcel',{id})
    if (!recordset[0]) {
      res.status(400).json({ message: "No Parcels Found!" });
    } else {
      res.status(200).json(recordset);
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

export const updatesent: RequestHandler<{ id: number }> = async (req, res) => {
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
    res.status(200).json(recordset);
  } catch (error) {
    res.status(400).json({ message: "No Parcels Found!" });
  }
}
export const getsentParcels: RequestHandler<{  Senderemail: string }> = async (req, res) => {
  try {
    const  Senderemail = req.params. Senderemail
    const {recordset} =await db.exec('getsentParcels',{ Senderemail})
res.status(200).json(recordset);
  } catch (error) {
    res.status(400).json({ message: "No Parcels Found!" });
  }
}

export const getrecievedParcels: RequestHandler<{ RecepientEmail: string }> = async (req, res) => {
  try {
    const RecepientEmail = req.params.RecepientEmail
    const {recordset} =await db.exec('getReceivedParcels',{RecepientEmail})
 res.status(200).json(recordset);
  } catch (error) {
    res.status(400).json({ message: "No Parcels Found!" });
  }
}