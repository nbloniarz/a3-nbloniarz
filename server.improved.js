const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      express = require('express'),
      passport = require('passport'),
      local = require('passport-local').Strategy,
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      path = require('path'),
      dir  = 'public/',
      port = 3000,
      app = express(),
      bodyparser = require('body-parser'),
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}
    

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var user = db.get('users').find({id: id}).value() 
  if(!user){
    done({message: "INVALID CREDENTIALS"}, null)
  }
  else{
    done(null, {id: user.id, username: user.username})
  }
  
})  

passport.use(new local(function(username, password, done) {
  console.log("IN AUTHENTICATION") 
  var user = db.get('users').find({username: username}).value()
  if(!user){
    console.log("NOT A USER")
    return done(null, false, {message: "INVALID USERNAME & PASSWORD"})
  }
  else{
    if(user.password === password){
      console.log("VALID")
      return done(null, user)
    }
    else{
      console.log("INVALID")
      return done(null, false, {message: "INVALID USERNAME & PASSWORD"})
    }
  }
  
  
}))


//LOCAL DATA TO BE REMOVED
var appdata = [
  { 'fName': 'Bob', 'lName': 'Smith', 'month':'August', 'day': 23, 'sign':"Leo"},
  { 'fName': 'Suzy', 'lName': 'Ng', 'month':'September','day': 30 , 'sign':"Libra"},
  { 'fName': 'Jim', 'lName': 'Hopper', 'month': 'July','day': 14, 'sign':"Cancer"} 
]

const horoscopes = [
  {'horoscope': "You will have a 258 star day today. You will have a impertinent situation with your syringe. Your junkyard will tell you how knotted and stuckup you are and this will hurt your meatballs. Breathe and let it go. Take care of yourself today, Take time for yourself. Go staining or advancing. Take a bath with restless greenly seagulls. Relax. Your lucky number is 334. Today is a knotted day to use this number by betting on canteens."},
  {'horoscope': "You will have a 111 star day today. You will have a huge situation with your robot. Your tummy will tell you how thrifty and indescribable you are and this will hurt your cowbells. Breathe and let it go.Take care of yourself today, Take time for yourself. Go calming or inspecting. Take a bath with Turkish sloppily ballerinas. Relax.Your lucky number is 1097. Today is a charismatic day to use this number by betting on sodas."},
  {'horoscope': "You will have a 14 star day today. You will have a vascular situation with your belt. Your fig will tell you how chipper and radiant you are and this will hurt your inhalers. Breathe and let it go. Take care of yourself today, Take time for yourself. Go zipping or romancing. Take a bath with important prematurely puppies. Relax. Your lucky number is 377. Today is a vascular day to use this number by betting on globs."}
]

//CONFIGURATION FOR EXPRESS MIDDLEWARE (1-5)
app.use(express.static('public')) //Serves static pages
app.use(bodyparser.json())//Parses HTTP request body into JSON
//app.use(downcase)//Forces downcasing of entire url after /
app.use(passport.initialize())
app.use(passport.session())
//app.use('/', router)

//WORK ON COOKIE INTEGRATION

//EXPRESS SERVER FUNCTIONS
//GET REQUESTS
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/loadLoginPage', function(request, response){
  response.redirect("/login")
})

app.get('/admin', function(request, response){
  response.redirect('/admin')
})

//POST REQUESTS

app.post('/doLogin', passport.authenticate('local', {successRedirect: '/admin', failureRedirect: "/index"}), function(req, res){
  console.log("SUCCESS?")
  res.end("SUCCESS")
})

app.listen( process.env.PORT || port )


