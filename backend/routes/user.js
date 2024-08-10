const express = require("express");
const router = express.Router();
const zod = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { User } = require("../db/index");
const authMiddleWare = require("../middlewares");
const { Account } = require("../db/index");
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email().min(12).max(30),
})
router.post('/newUrl',(req,res)=>{

    res.json({
        msg:req.body,
        header:req.headers.authorization
    })
})
router.get('/me',authMiddleWare,(req,res)=>{
    res.json({
        msg:"user is good to go"
    })
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
router.post('/signup', async (req, res) => {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "invalid email"
        })
    }
    const existing_user = await User.findOne({
        email: req.body.email
    });
    if (existing_user) {
        return res.status(402).json({
            msg: "user already exists with this email"
        })
    }
    const dbuser = new User(req.body);
    const user = await dbuser.save();
    const userid = user._id;
    await Account.create({
        userId:userid,
        balance:Math.random()*10000 +1
    });

    const token1 = jwt.sign({
        userid: user._id
    }, JWT_SECRET);
    const token = "Bearer "+token1;
    res.json({
        msg: "user created successfully",
        token
    })
})
const updateBody = zod.object({
    username: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})
router.put("/email", authMiddleWare, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
       try{
        const filter = {_id:req.userId};
        const update = {email:req.body.email};
        await User.findOneAndUpdate(filter,update);
        res.json({
            msg:"user updated successfully"
        })
       }
       catch(err){
        res.status(500).json({
            err
        })
} 
});
router.put("/firstName", authMiddleWare, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
       try{
        const filter = {_id:req.userId};
        const update = {firstName:req.body.firstName};
        await User.findOneAndUpdate(filter,update);
        res.json({
            msg:"user updated successfully"
        })
       }
       catch(err){
        res.status(500).json({
            err
        })
} 
});
router.put("/lastName", authMiddleWare, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }
       try{
        const filter = {_id:req.userId};
        const update = {lastName:req.body.lastName};
        await User.findOneAndUpdate(filter,update);
        res.json({
            msg:"user updated successfully"
        })
       }
       catch(err){
        res.status(500).json({
            err
        })
} 
});

const signInBody = zod.object({
    email:zod.string().email(),
    password:zod.string()
})
router.post('/signin',async (req,res)=>{
        const {success} = signInBody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                msg:"Invalid email"
            })
        }
        const user = await User.findOne({
            password:req.body.password,
            email:req.body.email
        })
        if(!user){
            return res.status(403).json({
                msg:"user not found"
            })
        }
        const token1 = jwt.sign({
            userId:user._id
        },JWT_SECRET);
        const token = "Bearer "+token1;
        res.json({
            userId:user._id,
            token
        });
});

module.exports = router