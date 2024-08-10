const {JWT_SECRET} = require("./config");
const jwt = require('jsonwebtoken');
const authMiddleWare = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.json({
            msg:"Please signup/signin"
        });
    }
    try{
        const token1 = authHeader.split(' ');
        const token = token1[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        res.status(403).json({
            e
        })
    }
}
module.exports = authMiddleWare;