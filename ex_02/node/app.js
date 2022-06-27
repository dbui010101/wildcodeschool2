const mongoose = require('mongoose');

require('mongoose-regexp')(mongoose);
const Bcrypt = require("bcryptjs");
const saltRounds = 10;
var express = require('express');
var cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
//npm start



mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true}) 
  const inscriptionSchema = new mongoose.Schema({
    login: { type: String,index: true, unique: true, minLength: 5, maxLength: 20 },
    email: { type: String,index: true, 
             unique: true, 
    },
    password: { type: String },
    admin: Boolean
  });
  const loginSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
  });

  const ins = mongoose.model('espacemembre', inscriptionSchema);
  const UserModel = mongoose.model("espacemembres", {
    login: String,
    password: String,
    
  });
  const CreateBilletModel = mongoose.model("billets", {
    user: String,
    titre: String,
    contenu: String,
    
  });
  //  app.get("/", function(req, res, next) {
  //    res.send("API is working properly");
  //  });
  app.post("/register", async function (request, response) {
    
     valeurlogin =  request.body.login; 
     valeuremail =  request.body.email; 
     valeurpassword =  request.body.password; 
     valeurpasswordConfirm =  request.body.passwordConfirm;
     console.log(request.body);
    if(valeurlogin && valeuremail && valeurpassword==valeurpasswordConfirm){
       
      const hash = Bcrypt.hashSync(valeurpassword, saltRounds);
      const people = new ins({ 
        login: valeurlogin,
        email: valeuremail,
        password: hash,
        admin: false
      });
      
      console.log(people) 
      // sur la base test sur espacemembres
      people.save(function (err, people) {
        if (!err) {
          return response.status(200).send(`Welcome ${valeurlogin}`)
        }
        return response.status(404).send('Not found');
      });
    }else{ 
        return response.status(404).send('Not found');
    }
    //return response.status(200).send('ça marche');
  });

  app.post("/login", async function (request, response) {
    
    
    valeurlogin =  request.body.login; 
    valeurpassword =  request.body.password;
    
    
    const user=await UserModel.findOne({login: valeurlogin}).exec();
    console.log( user.admin)
    if(!user) {
      return response.status(404).send('Not found');
    }
    if(await !Bcrypt.compareSync(request.body.password, user.password)) {
      return response.status(404).send('Not found');
    }else{
      console.log("connect reussit");
      response.status(200).send(`${user.login}`)
    }
    
  });


  app.get("/allUsers", async function (request, response) {
    const users= await UserModel.find().select('-password -email -_id -__v -admin');
    //response.status(200).json(users); 
    response.status(200).send(users)
  });


  app.post("/creebillet", async function (request, response) {
    
    valeuruser =  request.body.user; 
    valeurtitre =  request.body.titre; 
    valeurcontenu =  request.body.contenu; 
   if(valeurcontenu && valeurtitre  && valeuruser){
     const cree = new CreateBilletModel ({ 
       user: valeuruser,
       titre: valeurtitre,
       contenu: valeurcontenu,
     });
     
     
     cree.save(function (err, cree) {
       if (err) return response.status(404).send('Not found');
       response.status(200).send(`Billet cree`)
     });
   }else{ return response.status(404).send('Not found');}
 });



const PORT = process.env.PORT || 4242;
app.listen(PORT, console.log(`Server started on port ${PORT}`));





    
        
        
      


