const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

const adminSecret = process.env.ADMIN_SECRET;
const userSecret = process.env.USER_SECRET;

const authenticateJwt = (secret)=>(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,secret,(err,user)=>{
            if(err){
                res.sendStatus(403);
            }
            else{
                req.user=user;
                next();
            }
        })
    }
     else {
        res.sendStatus(401);
        console.log("Token doesn't exist");
    }
};

module.exports = {
    userSecret,
    adminSecret,
    authenticateAdminJwt: authenticateJwt(adminSecret)
};