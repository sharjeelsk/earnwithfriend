const express = require("express");
const mongoose = require("mongoose");
const router =express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/user");
const { has } = require("lodash");
const { type } = require("jquery");
const Admin = require("../models/admin"); 
const adminroutes = require("./admin")
// date

function currentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
  
    return today;
  }

// date









router.post("/sendprofile",async(req,res)=>{
    const data = req.body
    console.log(data)
    const user = await User.updateOne({email:req.body.email},{$set:{bankaccountno:data.values.bankaccountnumber,
    bankifsc:data.values.bankifsc,
    bankname:data.values.banksname,
    mobileNo:data.values.number
    }})  
    res.status(200).send("successfully updated")
})





router.post("/sendbankdetails",async(req,res)=>{
    const user = await User.findOne({email:req.body.email});
    console.log(user)
    if(user.bankaccountno===0  || user.bankifsc==="" ||  user.bankname===""){ //if payreq == true check this cond
        res.status(201).json("please enter your details")
    } 
    else if (user.payReq===true){
        res.status(201).json("Already Requested")
    }
    else {

        let payRequest = await Admin.updateOne({}, {$push: {pay: user}});
        console.log(payRequest)
        if(payRequest){
            let flag = await User.updateOne({email:req.body.email}, {$set: {payReq: true}})
            console.log(flag)
            res.status(200).json("Send successfully")
        } else {
            res.status(400).json("Error")
        }
    }
});

// router.post("/sendbankdetails",async(req,res)=>{
//     const user = await User.findOne({email:req.body.email});
//     if(user.payReq === true){
//         res.status(201).json("Already Requested")
//     } else {

//         let payRequest = await Paylist.updateMany({}, {$push: user});
//         console.log(payRequest)
//         if(payRequest){
//             let flag = await User.updateOne({email:req.body.email}, {$set: {payReq: true}})
//             res.status(200).json("Send successfully")
//         } else {
//             res.status(400).json("Error")
//         }
//     }
// });

router.post("/postbankdetails",async (req,res)=>{
  const bankaccountno = req.body.bankaccountno;
  const bankifsc = req.body.bankifsc;
  const bankname = req.body.bankname;

  const user = await User.updateOne({email:req.body.email},
{
    $set:{bankaccountno,bankifsc,bankname}

});
  console.log(user)
})

router.post("/getreferreddata",async(req,res,next)=>{
    const {referredList} = await User.findOne({email:req.body.email})
    let array = []
    let ref;
    if(referredList.length>0){
        for(let i = 0; i<referredList.length;i++){
            ref = await User.find({_id:referredList[i].refid})
            array.push({sr:i+1,refname:ref[0].name})
             }
    }

   res.status(200).json(array)
})

router.post("/getlogindata",async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(400).json("error")
    }
})
router.post("/getreferredusers",async (req,res)=>{
   const user = await User.findOne({email:req.body.email})
   let array = []
   if(user){
    console.log(user.referredList)
    for(let i = 0;i<user.referredList.length;i++){
         const list = await User.find({_id:user.referredList[i].refid})
         if(list){
            array.push(list[0])
         }
     }
    //const list = await User.find({_id:user.referredList[0].refid})
    // console.log(list)
   }
})

router.post("/membershippayment",(req,res)=>{

})



router.post("/signup", async (req, res, next) => {

    User.find({email: req.body.email})
        .exec()
        .then(async user => {
            if(user.length >= 1){
                console.log(user)
                res.status(200).json({
                    message: "User Already Exists"
                })
            } else{
                bcrypt.hash(req.body.Password, 10, async (err, hash) => {
                    console.log(err);
                    if(err){
                        res.status(500).json({
                            error: err
                        
                        });
                        
                    } else {

                        //--------this is current users referral id the one who's signinup ------------------//
                        let previousreferralid = await User.find({}).sort({referralId:-1}) //you will get array in descending of referral id
                        previousreferralid = previousreferralid[0].referralId //assigned the latest referral id to var
                        ; //incremented it
                        let id = Number(previousreferralid.slice(2));
                        // let id = Number(previousreferralid);
                        id= id+1;
                        id = "EF"+ id;
                        console.log(id);
                        //--------this is current users referral id the one who's signinup ------------------//

                        const user = new User({
                            name: req.body.firstName,
                            mobileNo: req.body.number,
                            address: req.body.address,
                            age: req.body.age,
                            email: req.body.email,
                            // gender: req.body.gender,
                            state: req.body.state,
                            city: req.body.City,
                            password: hash,
                            referralId:id, //"EF1001" //id //req.body.referralId
                            joined: currentDate()
                        })
                        user.save()
                        .then(async result => {

                            // console.log(result)
                            console.log(req.body.referralId)
                             let refid = result._id

                            //     //---------this is the referral id of user who's id was entered in the form -------------//
                                // let referralidofuser = await User.findOne({referralId:req.body.referralId})
                                // console.log(referralidofuser)
                                // if(referralidofuser){
                                    let pushreferredlist = await User.updateOne({referralId:req.body.referralId},{$push:{referredList:{refid}}})
                                    let user = await User.findOne({referralId:req.body.referralId})
                                
                                    if(user.referredList.length%5 ===0){
                                    let wallet = await User.updateOne({referralId:req.body.referralId},{$inc:{wallet:1000}})
                                    let commission = await User.updateOne({referralId:req.body.referralId},{$inc:{commission:500}})
                                    console.log(wallet)
                                    }
                                    else{
                                        let wallet = await User.updateOne({referralId:req.body.referralId},{$inc:{wallet:500}})
                                        let bonus = await User.updateOne({referralId:req.body.referralId},{$inc:{bonus:500}})
                                        console.log(wallet) 
                                    }
                                //}
                            //     //---------this is the referral id of user who's id was entered in the form -------------//
                                res.status(201).json({
                                message: "user created",
                                result
                                });
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                });
            }
        })
});

router.post("/login",adminroutes, (req, res, next) => {
    console.log(req.body)
    User.find({email: req.body.email})
    .exec()
    .then( user => {
        if(user.length < 1) {
            res.status(202).json({
                message: "User Not Found"
            });
        }
        bcrypt.compare(req.body.Password, user[0].password, (err, result) => {
            console.log(result)
            if(err) {
                res.status(400).json({
                    message: "Auth Failed"
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.API_KEY,
                {
                    expiresIn: "24h"
                });
                
                res.status(200).json({
                    message: "Auth Success",
                    token: token
                });
            } else {
                res.status(201).json({
                    message: "Incorrect Password"
                });
            }
            
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})


router.delete("/:userId", (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(doc => {
            res.status(200).json({doc});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});


module.exports = router
