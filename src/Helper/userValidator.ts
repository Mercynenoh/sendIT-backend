
import Joi from 'joi'

export const UserSchema= Joi.object({
    Firstname:Joi.string().required(),
    Lastname:Joi.string().required(),
    Senderemail:Joi.string().required().email(),
    Password:Joi.string().required()
})

export const UserSchemas= Joi.object({
    Senderemail:Joi.string().required().email(),
    Password:Joi.string().required()
})


