const express = require('express');
const authMiddleWare = require('../middlewares');
const router = express.Router();
const  { Account } =  require('../db/index');
router.get('/balance',authMiddleWare,async (req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    })
    if(!account){
        return res.status(403).json({
            msg:"user not found"
        })
    }
    res.json({
        balance:account.balance
    })
})
router.post("/transfer", authMiddleWare, async (req, res) => {
    try{
    const amount = req.body.amount;
    const to = req.body.to;
    const account = await Account.findOne({ userId: req.userId });
    if (!account || account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to });
    if (!toAccount) {
        return res.status(403).json({
            message: "Invalid account"
        });
    }
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } },);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
       return res.json({
         message: "Transfer successful"
    });
    }
    catch(err){
        console.log(err);
    //    await session.abortTransaction();
        res.status(402).json({
            err
        })
    }
    
});

module.exports = router
