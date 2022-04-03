const app = require("./index")
const connect = require("./configs/db");
app.listen(5000,async()=>{
    try{
       await connect()
    }catch(err){
        return res.send(err)
    }
    console.log("listening on port 500");
})