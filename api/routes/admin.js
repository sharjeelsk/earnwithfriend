const express = require("express");
const mongoose = require("mongoose");
const router =express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/user");
const { has } = require("lodash");
const { type } = require("jquery");
const Admin = require("../models/admin");

function currentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
  
    return today;
  }

  router.use(function (req, res, next) {


    res.Header('Access-Control-Allow-Origin', '*');

    res.Header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.Header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');

    res.Header('Access-Control-Allow-Credentials', true);
    res.Header("preflightContinue", false)
  res.Header("optionsSuccessStatus",204)
    next();
  })


router.get("/userstopay",(req,res)=>{
    Admin.find({},{pay:1})
    .then(resp=>res.status(200).send(resp[0].pay))
    .catch(err=>console.log(err))
    
})
//   Get all users who have requested for withdraw
router.post("/payrequests", async(req,res)=>{
    const users = await User.find({payReq: true});
    if(users){
        res.status(200).json(users)
    } else {
        res.status(400).json("Error")
    }
});

// delete users by ID
router.post("/remove", async(req,res)=>{
    console.log(req.body)
    let user = await Admin.updateMany({},{ $pull: { pay: {"email": req.body.email} } },
     {multi: true}
    );
console.log(user);
    if(user){ 
        let flag = await User.updateOne({email:req.body.email}, {$set: {payReq: false}})
        res.status(200).json("Removed")
    } else {
        res.status(400).json("Error")
    }
});
// :userId
// {$pull: {pay: {user: {_id:req.params.userId}}}}


router.post("/login", (req, res, next) => {
    
    Admin.find({email: req.body.email})
    .exec()
    .then( user => {
        if(user.length < 1) {
            next()
        }
        else{
            bcrypt.compare(req.body.Password, user[0].password, (err, result) => {
                console.log(result)
                if(err) {
                    res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if(result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, "secret",
                    {
                        expiresIn: "24h"
                    });
                    
                    res.status(200).json({
                        message: "Auth Success Admin",
                        token: token
                    });
                } else {
                    res.status(401).json({
                        message: "Incorrect Password"
                    });
                }
                
            })
        }
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.post("/signup", async (req, res, next) => {

    Admin.find({email: req.body.email})
        .exec()
        .then(async user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: "User Already Exists"
                })
            } else{
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log(err);
                    if(err){
                        return res.status(500).json({
                            error: err 
                        
                        });
                        
                    } else {

                        //--------this is current users referral id the one who's signinup ------------------//
                        // let previousreferralid = await User.find({}).sort({referralId:-1}) //you will get array in descending of referral id
                        // previousreferralid = previousreferralid[0].referralId //assigned the latest referral id to var
                        // ; //incremented it
                        // let id = Number(previousreferralid.slice(2));
                        // // let id = Number(previousreferralid);
                        // id= id+1;
                        // id = "EF"+ id;
                        // console.log(id);
                        //--------this is current users referral id the one who's signinup ------------------//

                        const admin = new Admin({
                            name: req.body.firstName,
                            mobileNo: req.body.number,
                            address: req.body.address,
                            age: req.body.age,
                            email: req.body.email,
                            state: req.body.state,
                            city: req.body.city,
                            password: hash,
                            joined: currentDate()
                        })
                        admin.save()
                        .then(async result => {

                            // console.log(result)
                            // console.log(req.body.referralId)
                            //  let refid = result._id

                            // //     //---------this is the referral id of user who's id was entered in the form -------------//
                            //     // let referralidofuser = await User.findOne({referralId:req.body.referralId})
                            //     // console.log(referralidofuser)
                            //     // if(referralidofuser){
                            //         let pushreferredlist = await User.updateOne({referralId:req.body.referralId},{$push:{referredList:{refid}}})
                            //         let user = await User.findOne({referralId:req.body.referralId})
                                
                            //         if(user.referredList.length%5 ===0){
                            //         let wallet = await User.updateOne({referralId:req.body.referralId},{$inc:{wallet:1000}})
                            //         let commission = await User.updateOne({referralId:req.body.referralId},{$inc:{commission:500}})
                            //         console.log(wallet)
                            //         }
                            //         else{
                            //             let wallet = await User.updateOne({referralId:req.body.referralId},{$inc:{wallet:500}})
                            //             let bonus = await User.updateOne({referralId:req.body.referralId},{$inc:{bonus:500}})
                            //             console.log(wallet) 
                            //         }
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



module.exports = router