const path = require("path");

const express = require("express");

const transporter = require("../configs/mailer");

const Student = require("../models/student.model");

const router = express.Router();



router.get("/", async (req, res) => {
  try {  


    const page = req.query.page || 1;
    const pagesize = req.query.pagesize || 10; // 30

    // if page = 1 then data should be from 1 to 30
    // if page = 2 then data should be from 31 to 60

    const skip = (page - 1) * pagesize; // 1 - 1 = 0 0 * anything  = 0
    // page = 2 then 2 - 1 = 1 and 1 * pagesize = 30

    const student = await Student.find()
      .skip(skip) // 30
      .limit(pagesize) // 31 - 60
      .lean()
      .exec();

    const totalPages = Math.ceil(
      (await Student.find().countDocuments()) / pagesize
    );
    return res.status(200).send({ student,totalPages });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

 


router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);

    transporter.sendMail({
      from: '"Amazon admin" <admin@amazon.com>', // sender address
      to: student.email, // list of receivers
      subject: `Welcome to ABC system ${student.firstname} ${student.lastName}`, // Subject line
      text: `Hi ${student.firstname} Please confirm your email `, // plain text body
        html: `<b>Welcome to ABC system ${student.firstname} ${student.lastName}</b>`, // html body
   
    });

    return res.status(201).send({student:student, message: "Registration successfully done" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
