require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const md5 = require('md5');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL+"MyCoffee", {useNewUrlParser:true,});

const userCoffeeSchema = new mongoose.Schema({
  userId: Number,
  remain: Number
});

// login collection
const userSchema = new mongoose.Schema({
  userId: Number,
  username:String,
  email:String,
  phone: Number,
  password:String
});

const User = new mongoose.model("User", userSchema);
const userCoffee = new mongoose.model("Coffee", userCoffeeSchema);

// ===========================================================
// Register
// ===========================================================

app.post("/register", function(req, res){

  User.find({}, function(err, all){
    if(err){
      console.log("get all error");
    }else{
      const newUser = new User({
        userId: (all.length)+1,
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:md5(req.body.password)
      });

      newUser.save(function(err){
        if(err){
          console.log("register error");
        }
        else{
          console.log("register success");
        }
      });
    }
  })
});

// ===========================================================
// Login
// ===========================================================

app.post("/login", function(req, res){
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({username: username}, function(err, foundUser){
    if(err){
      console.log("login error");
    }
    else{
        if(foundUser &&　foundUser.password === password){
          res.send({'userId':foundUser.userId});
          console.log("login success");
        }
        else{
          console.log("password not match");
        }
    }
  });

});

// ===========================================================
// Get user coffee
// ===========================================================

app.get("/coffee/:userid", (req, res) => {

  userCoffee.findOne({userId:req.params.userid}, (err, foundCoffee) => {
    if (err) {
      console.log("get coffee error");
      res.send(err);
    } else {
      console.log("get coffee sucess");
      if(foundCoffee){
        res.send({remain:foundCoffee.remain});
      }else{
        res.send({remain:500});
      }
    }
  });
});

// ===========================================================
// update user coffee
// ===========================================================

app.post("/coffee/:userid", function(req, res){
  const userId = req.params.userid;
  const remain = req.body.remain;

  userCoffee.updateOne(
    {userId: userId},
    {userId: userId, remain:remain},
    { upsert : true },
    (err) => {
      if(err){
        console.log("update error");
      }
      else{
        console.log("update sucess");
      }
    });
});

// ===========================================================
// Listen port
// ===========================================================

let port = process.env.PORT;
if(port == null || port == ""){
  port = 5000;
}
app.listen(port, function(){
  console.log("Server Start");
})
