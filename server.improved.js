const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      ///LOWDB consts
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      //EXPRESS consts
      express = require('express'),      
      downcase = require('express-uncapitalize'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      router = express.Router(),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      app = express(),
      bodyparser = require('body-parser'),
      path = require('path'),
      //GENERAL consts
      dir  = 'public/',
      port = 3000,
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}

//////////////////////////////////////////////////////////////////
////////////     LowDB     /////////////////////////////////
///////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////
////////////     APP CONFIG     /////////////////////////////////
///////////////////////////////////////////////////////////////

app.use(express.static('public')) //Serves static pages
app.use(cookieParser())//needed to read cookies for auth
app.use(bodyparser.json())//can use json to parse req
app.use(downcase())//forces http requests to downcase
app.use(session({secret: 'kittens', saveUnitialized: true, resave: true}))//sets session secret
app.use(passport.initialize())//required for passport
app.use(passport.session())//persistant login session
//////////////////////////////////////////////////////////////////
////////////     PASSPORT     /////////////////////////////////
///////////////////////////////////////////////////////////////
passport.use(new LocalStrategy({
  usernameField: 'user',
  passwordField: 'pass'
  }, 
  function(username, password, done){
    var user = {username: username, password: password}
    if(user.username === 'foo' && user.password === 'bar'){
      done(null, user)
    }
    else{
      done(null, false)
    }
} 
))

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  done(null, user)
})

///////////////////////////////////////////////////////////////
////////     GET/POST     /////////////////////////////////////
////////////////////////////////////////////////////////////////
app.post('/login', function(req, res){
  let userObj = req.body
  console.log(userObj)
})

app.post('/addUser', function(req, res){
  
})


app.listen( process.env.PORT || port )