import Joi from 'joi'

export const parcelSchema= Joi.object({
     Adress:Joi.string().required(),
     Senderemail:Joi.string().required().email(),
     RecepientEmail:Joi.string().required().email(),
     parcelname:Joi.string().required(),
     Date:Joi.string().required(),
     weight:Joi.number().required(),
     lat:Joi.number().required(),
     lng:Joi.number().required(),
     TruckNo:Joi.string().required(),
     TrackingNo:Joi.string().required(),
     Price:Joi.number().required(),
})