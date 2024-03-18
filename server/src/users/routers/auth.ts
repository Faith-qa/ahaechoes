import { User } from "../models/user";
import * as express from 'express';
import {registerValidation, loginValidation} from '../validation/userValidation'
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';


dotenv.config();
//set up a router
const router = express.Router();

router.post('/signup', async(req, res)=>{
    //check and validate input
    const {error} = registerValidation(req.body);

    if (error){
        return res.status(400).send({message: error['details'][0]['message']})
    }

    //validation 2 check if user exist in database

    const user = await User.findOne({email: req.body.email});

    if (user){
        return res.status(400).send({message:"user already exists"})
    }

    //hash the password

    const salt = await bcryptjs.genSalt(5);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    //send data to database

    const newUser = new User({
        fistname: req.body.firstname,
        lastname: req.body.lastname,
        preferredname: req.body.preferredname,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hashedPassword
    })

    try{
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    }catch(err){
        res.status(400).send({message: err})}

})

//log in

router.post('/login', async(req, res)=>{
    //check and validate input
    const {error} = registerValidation(req.body);

    if (error){
        return res.status(400).send({message: error['details'][0]['message']})
    }

    //validation 2 check if user exist in database

    const user = await User.findOne({email: req.body.email});

    if (!user){
        return res.status(400).send({message:"user not found"})
    }

    //validation 3: check password

    const passValidation = await bcryptjs.compare(req.body.password, user.password);
    if(!passValidation){
        return res.status(400).send({message: "invalid password"})

    }
    const tokenSecret = process.env.TOKEN_SECRET;
    if (!tokenSecret) {
        throw new Error('TOKEN_SECRET environment variable is not defined');
    }
    

    const token:string = jwt.sign({_id: user._id}, tokenSecret);
    
    return res.header('auth-token', token).send({"auth-token": token});


})