const express = require("express");

const User = require("../models/User");

const { uploadFiles } = require("../middlewares/uploads");
const upload = require("../middlew/uploads")

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
      console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.post("", upload.single("profilePic"), async (req, res) => {
  try {
    //   const user = await User.create(req.body)
    const user = await User.create({
      firstName: req.body.firstName,
      lastName:req.body.lastName,
      profilePic: req.file.path,
    });
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.patch("/:id",async (req,res)=>{
    try {
        const users = await User.findByIdAndUpdate(
          req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            profilePic: req.file.path,
          },
          { new: true }
        )
          .lean()
          .exec();

        return res.send(users)
    } catch (error) {
        return res.send(error.message);
    }
})

router.delete("/:id",async (req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    res.send(user)
})



module.exports = router;
