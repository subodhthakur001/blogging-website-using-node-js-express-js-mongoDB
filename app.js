//jshint eversion:6
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://root:root@cluster0.olfwxmd.mongodb.net/blogDB",{useNewUrlParser:true})

var homecontent = "This is our home page";
var aboutcontent = "Hi this is me Subodh kumar thakur welcome to our website!!";
var contactcontent = "contact us through our email";
const blogSchema = mongoose.Schema(
    {
        title:String,
        content:String
    }
)
const blog = mongoose.model("blog",blogSchema);
const app = express();
app.set("view engine",'ejs');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    blog.find(function(err,blog){
        if(err){
            console.log(err);
        }
        else{
            res.render("home",{content:homecontent,title:"home",posts:blog});
        }
    })
    
    
})

app.get("/about.ejs",function(req,res){
    res.render("about",{content:aboutcontent,title:"About Me"});
})

app.get("/contanct.ejs",function(req,res){
    res.render("contanct",{content:contactcontent,title:" Contact me"});
})

app.get("/home.ejs",function(req,res){
    res.redirect("/");
})

app.get("/compose.ejs",function(req,res){
    const b = 
    res.render("compose");
})
app.post("/",function(req,res){
      const data = new blog({
     title:req.body.postTitle,
     content:req.body.blog
      });
      data.save();
    res.redirect("/");
})
app.get("/posts/:name",function(req,res){
    console.log(req.params.name);
})












app.listen(3000,function(){
    console.log("server has started");
})
