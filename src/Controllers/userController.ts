     import { Request, Response, RequestHandler } from "express";
import mssql, { RequestError } from 'mssql';
import { sqlConfig } from "../Config/Config";
import bcrypt from 'bcrypt'
import { UserSchema } from '../Helper/userValidator';
import { UserSchemas } from "../Helper/userValidator";
import {User} from '../Interface/user'
import jwt from 'jsonwebtoken'
import Connection from "../DatabaseHelpers/database";
const db = new Connection()

import dotenv from 'dotenv'
dotenv.config()

import {Data} from '../Interface/user'
import { LogError } from "concurrently";

interface Extended extends Request{
    info?:Data
}

interface ExtendedRequest extends Request{
    body:{
        Firstname:string
        Lastname:string
        Senderemail:string
        Password:string
        Profile:string
       

    }
}
export const addUser=async( req:ExtendedRequest, res:Response)=>{
    try {
        const pool=await mssql.connect(sqlConfig)
        const {Firstname,Lastname,Senderemail, Password}= req.body
        const {error , value}= UserSchema.validate(req.body)
        if(error){
            return res.json({error:error.details[0].message})
        }
        const hashedpassword = await bcrypt.hash(Password,10)
        await pool.request()
        . input('Firstname', mssql.VarChar, Firstname)
        . input('Lastname', mssql.VarChar, Lastname)
        . input('Senderemail', mssql.VarChar, Senderemail)
        . input('Profile', mssql.VarChar, Senderemail)
        . input('Password', mssql.VarChar, hashedpassword)
        .execute('addUser')

      
        res.json({message:'Registered...'})
    } catch (error) {

         if(error instanceof RequestError){
      res.json({message:error.message})
    }
    }

}


export const addProfile: RequestHandler<{ id: number }> = async (req, res) => {
  try {
    const id = req.params.id
    const {Profile}=req.body
    const {recordset} =await db.exec('addUserProfile',{id,Profile})
return res.json({message:'Updated...'})
  } catch (error) {
    res.json({ error })
  }
}

export const loginUser=async(req:ExtendedRequest, res:Response)=>{
  try {
     const {Senderemail, Password }= req.body
     const pool =await mssql.connect(sqlConfig)
        const {error , value}= UserSchemas.validate(req.body)
           if(error){
               return res.json({error:error.details[0].message})
           }
     const usersResult:User[]=await( await pool.request()
     .input('Senderemail', mssql.VarChar,Senderemail)
     .execute('getUser')).recordset

     const user = usersResult[0];

     if(!user){
       return res.json({message:'User Not Found'})
     }

     const validPassword = await bcrypt.compare(Password,user.Password)
     if(!validPassword){
       return res.json({message:'Invalid password'})

     }
     const{Password: _, ...rest} = user
     

       const token =jwt.sign(rest ,process.env.KEY as string,{expiresIn:'3600s'})
     res.json({
       message:'Logged in',
       user: rest,
       token
   })
   
  } catch (error) {
   res.json({error})
   console.log(error);
   
  }

}
export const getUsers: RequestHandler = async (req, res) => {
  try {
    const {recordset} =await db.exec('getUsers')
    res.json(recordset)
  } catch (error) {
    res.json({ error })
  }
  }
  export const getProfiles: RequestHandler = async (req, res) => {
    try {
      const pool = await mssql.connect(sqlConfig)
      const users = await pool.request().execute('seeProfile')
      const { recordset } = users
      res.json(recordset)
    } catch (error) {
      res.json({ error })
    }
  }


