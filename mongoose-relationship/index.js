const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const connect = () =>{
    return mongoose.connect(
        "mongodb://127.0.0.1:27017/library"
    )
}

const sectionSchema = new mongoose.Schema({
    
    sectionName :{type: String},

},

  {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
  }
  );

const section = mongoose.model("sections",sectionSchema);

app.post("/sections",async(req,res) => {

    try {
      console.log(req.body);
        const Section = await section.create(req.body);
    
        return res.status(201).send(Section);
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
});

const authorSchema = new mongoose.Schema(
  {
    name : {type:String, required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const authors = mongoose.model("authors",authorSchema);

app.post("/authors",async (req,res) => {
  try {
    const author = await authors.create(req.body);
    return res.send(author); 
  } catch (error) {
    res.send({message : error.message});
  }
})

const bookSchema = new mongoose.Schema(
  {
    name : {type : String, required : true},
    body: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sections",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const books = mongoose.model("books",bookSchema);
app.post("/books",async(req,res) =>{
  try {
    const book = await books.create(req.body);

    return res.status(201).send(book);
    
  } catch (error) {
    return res.send({message :error.message});
  }
});

app.get("/sections", async(req,res) => {
  try {
    const sections = await section.find().lean().exec();
    res.send({sections : sections});
  } catch (error) {
    res.send({message : error.message});
  }

});

app.get("/books/:id", async (req,res) =>{
  try {
    const Books = await books.find({"authorId" : req.params.id}).populate("authors").lean().exec();
    res.send({Books : Books});
  } catch (error) {
    res.send({sections : sections});
  }
})

app.listen(5000, async () => {
    try {
      await connect();
    } catch (err) {
      console.log(err);
    }
  
    console.log("listening on port 5000");
  });
