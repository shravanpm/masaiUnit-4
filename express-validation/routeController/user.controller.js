const express = require("express");
// const mongoose = require("mongoose")
const {body,validationResult} = require("express-validator");
const router = express.Router();
// console.log(router)
const User = require("../models/user.schema");

router.post(
    "/",
    body("first_name")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("First Name cannot be empty"),
    body("gender")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("select gender")
        .custom(async (val) => {
            if(val != "male" && val != "female" && val != "other"){
            throw new Error("enter gender")
             }
        return true;
    }),
    body("last_name")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("Second name required"),
    body("pincode")
        .trim()
        .not()
        .isEmpty()
        .bail()
        .withMessage("enter pincode").custom( function (val) {
            val = +val;
            if(val <0 || val >999999){
            throw new Error("Incorrect pincode provided");
            }
            return true;
     
        }),
    body("age")
        .trim()
        .custom( (val) => {
           val = +val;
          
            if(val<6 || val>100){
                throw new Error("Age must be between 6 and 100");
            }
            return true;
        }),
    body("email")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("email required")
    .isEmail()
    .bail()
    .withMessage("enter valid email")
    .custom(async (value) => {
        const user = await User.findOne({ email: value });
  
        if (user) {
          throw new Error("Email is already taken");
        }
        return true;
      }),
 async (req,res) => {
    try {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
          return res.status(400).send({ errors: errors.array() });
        }
        const user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        
    } }
)

// router.post("/:id",async (req,res) => {
// try {
//     const user = await User.create(req.body);
//     res.send(user);
// } catch (error) {
    
// }
// })

module.exports = router;
 

