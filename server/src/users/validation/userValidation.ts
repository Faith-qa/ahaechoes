import Joi from "joi"


export const registerValidation = (data: any) =>{
    const schemaValidation = Joi.object({
        firstname: Joi.string().required().min(3).max(256),
        lastname: Joi.string().required().min(3).max(256),
        preferredname: Joi.string().min(3).max(256),
        avatar: Joi.string().min(3).max(256).uri(),
        email: Joi.string().required().min(6).max(256).email(),
        password: Joi.string().required().min(6).max(1024),


    })
    return schemaValidation.validate(data);

}

export const loginValidation = (data: any)=>{
    const schemaValidation = Joi.object({
        email: Joi.string().required().min(6).max(256).email(),
        password: Joi.string().required().min(6).max(1024).email(),
    })
    return schemaValidation.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;