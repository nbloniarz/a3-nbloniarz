const mime = require( 'mime' ),
      firebase = require('firebase'),
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
      //GENERAL consts
      dir  = 'public/',
      port = 3000,
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}

//////////////////////////////////////////////////////////////////
////////////     FIREBASE     /////////////////////////////////
///////////////////////////////////////////////////////////////


const firebaseConfig = {
  
}

firebase.initializeApp(firebaseConfig);
var adb = firebase.database()


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
      return done(null, false, {message: 'user not found'})
    }
    else if(user.password === password){
      //found and correct
      return done(null, {username, password}) 
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
  console.log('deserializing: ', username)
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
  res.json(data)
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