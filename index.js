import express from "express";
import axios  from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

const api_key = "203d9645d4d5d2bd792f66f0aef99227";

app.get("/",(req,res)=> {
   res.render("index.ejs",{content:'<h3>Image will appear here</h3>',
    contained:'<h3>Your gender will apppear here.</h3>'
   });
});

app.post("/dogger", async (req,res) => {
  console.log(req.body);

     try{
     const dogName = req.body.dog;
     const response = await axios.get(`https://dog.ceo/api/breed/${dogName}/images`);
    const actual = response.data.message;
    const result = actual[Math.floor(Math.random() * actual.length)];
    console.log(result);
    res.render("index.ejs",{content:`<img src="${result}" class="stick">`});
   }catch(error) {
       res.render("index.ejs",{content: "dog not found"});
     }
});



app.post("/namer", async (req,res)=>{
    console.log(req.body);

    try{
     const name = req.body.name;   
     const response = await axios.get(`https://api.genderize.io?name=${name}&apikey=${api_key}`);
     const actual = response.data.gender;
     res.render("index.ejs",{contained: `<h3>${actual}</h3>`});
    }
    catch(error) {

    }
});

app.listen(port,()=> {
    console.log(`server running on port ${port}`);
})