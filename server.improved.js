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
app.use(session({secret: 'kittens', saveUninitialized: true, resave: true}))//sets session secret
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
    const user = db.get('users').__find(__user => __user.username === username)
    if(user === undefined){
      //not in database
      return(null, false, {message: 'user not found'})
    }
    else if(user.password === password){
      //found and correct
      return(null, {username, password}) 
    }
    else{
      return done(null, false, {message: 'incorrect password'})
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
app.get('/allData', function(req, res){
  
})

app.get('/userData', function(req, res){
  
})

app.post('/login', function(req, res){

})

app.post('/addUser', function(req, res){
  //NO PASSPOR NEEDED ALL LOWDB
})

app.post('/removeUser', function(req, res){
    //NO PASSPOR NEEDED ALL LOWDB
})

app.post('/modifyUser', function(req, res){
    //NO PASSPOR NEEDED ALL LOWDB
})


app.listen( process.env.PORT || port )