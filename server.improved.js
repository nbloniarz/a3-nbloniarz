const mime = require( 'mime' ),
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

const appdata = [
  {horoscope: "Leo", user: "admin"},
  {horoscope: "Capricorn", user: "test"}
]

const users = [
  {username: 'admin', password: 'admin'},
  {username: 'test', password: 'test'}
]

db.defaults({post: appdata, users: users}).write()



//////////////////////////////////////////////////////////////////
////////////     APP CONFIG     /////////////////////////////////
///////////////////////////////////////////////////////////////

app.use(express.static(dir)) //Serves static pages
app.use(cookieParser())//needed to read cookies for auth
app.use(bodyparser.json())//can use json to parse req
//app.use(downcase())//forces http requests to downcase
app.use(session({secret: 'kittens', saveUninitialized: false, resave: false}))//sets session secret
//////////////////////////////////////////////////////////////////
////////////     PASSPORT     /////////////////////////////////
///////////////////////////////////////////////////////////////
const myStrategy = function(username, password, done){
    const user = db.get('users').value().find(__user => __user.username === username)
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

passport.use(new LocalStrategy(myStrategy))

app.use(passport.initialize())//required for passport
app.use(passport.session())//persistant login session

passport.serializeUser( (user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  const user = db.get('users').value().find(u => u.username === username)
  console.log('deserializing: ', name)
  if(user !== undefined){
    done(null, user)
  }
  else{
    done(null, false, {message: 'user not found; session not restored'})
  }
})


///////////////////////////////////////////////////////////////
////////     GET/POST     /////////////////////////////////////
////////////////////////////////////////////////////////////////
app.get('/allData', function(req, res){
  let data = db.get('users').value()
  res.body = data
  res.end()
})

app.get('/userData', function(req, res){
  
})

app.post('/login', passport.authenticate( 'local'),
         function(req, res){
         res.json({status: true})
  })

app.post('/test', function(req, res){
  console.log('auth with cookie', req.user)
  res.json({status:'success'})
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