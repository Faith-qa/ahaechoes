import * as jwt from 'jsonwebtoken';

export function auth(req: any,res: any,next: any){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({message: "access denied"})
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    }catch(err){
        return res.status(401).send({message: "invalid token"})
    }
}