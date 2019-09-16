const mime = require( 'mime' ),
      firebase = require('firebase'),
      //EXPRESS consts
      express = require('express'),  
      connect = require('connect'),
      favicon = require('serve-favicon'),
      downcase = require('express-uncapitalize'),
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      compression = require('compression'),
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
   apiKey: "AIzaSyAuOGEGSNJLe2fxv0iHQwigSY8nIj2pb30",
   authDomain: "a2-nbloniarz.firebaseapp.com",
   databaseURL: "https://a2-nbloniarz.firebaseio.com",
   projectId: "a2-nbloniarz",
   storageBucket: "a2-nbloniarz.appspot.com",
   messagingSenderId: "337634055490",
   appId: "1:337634055490:web:821a136e7f93eff009e4db"
}

firebase.initializeApp(firebaseConfig);
let db = firebase.database()


//////////////////////////////////////////////////////////////////
////////////     APP CONFIG     /////////////////////////////////
///////////////////////////////////////////////////////////////

app.use(express.static(dir)) //Serves static pages
app.use(cookieParser())//needed to read cookies for auth
app.use(bodyparser.json())//can use json to parse req
app.use(bodyparser.urlencoded({ extended: false }));
app.use(connect())
app.use(downcase())//forces http requests to downcase
app.use(compression()) //Minimizes headers
app.use(favicon("public/favicon.png"))
app.use(session({secret: 'kittens', saveUninitialized: false, resave: false}))//sets session secret
//////////////////////////////////////////////////////////////////
////////////     PASSPORT     /////////////////////////////////
///////////////////////////////////////////////////////////////
const myStrategy = function(username, password, done, other){
  console.log(other)
  db.ref('/users/').once('value')
  .then(function(snapshot){
    const users = []
    snapshot.forEach(function(child){
      users.push(child.val())
    })
    let user = users.find(__user => __user.username === username)
    if(user === undefined){
      console.log("NOT IN DB")//not in database
      return done(null, false, {message: 'user not found'})
    }
    else if(user.password === password){
      //found and correct
      return done(null, {username, password}) 
    }
    else{
      console.log("!PASSwORD")
      return done(null, false, {message: 'incorrect password'})
    }
  })    
}

passport.use(new LocalStrategy(myStrategy))
app.use(passport.initialize())//required for passport
app.use(passport.session())//persistant login session

passport.serializeUser( (user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  db.ref('/users/').once('value')
  .then(function(snapshot){
    const users = []
    snapshot.forEach(function(child){
      users.push(child.val())
    })
    const user = users.find(u => u.username === username)
    console.log('deserializing: ', username)
    if(user !== undefined){
      done(null, user)
    }
    else{
      done(null, false, {message: 'user not found; session not restored'})
    }
  })
  
})

///////////////////////////////////////////////////////////////
////////     GET/POST     /////////////////////////////////////
////////////////////////////////////////////////////////////////
app.get('/allData', function(req, res){
  db.ref('/data/').once('value')
  .then(function(snapshot){
    const data = []
    snapshot.forEach(function(child){
      data.push(child.val())
    })
    res.json(data)
  })
})

app.get('/allDataForUser', function(req, res){
  db.ref('/data/').once('value')
  .then(function(snapshot){
    const data = []
    snapshot.forEach(function(child){
      if(child.val().user === req.cookies.TestCookie){
        data.push(child.val())
      }
    })
    res.json(data)
  })
})

app.get('/admin', function(req, res){
  res.redirect('/admin')
})

app.get('/logout', function(req, res){
  req.logOut()
  res.status(200).clearCookie('TestCookie', {
    path: '/'
  })
  req.session.destroy(function(err){
    res.redirect('/')
  })
  
})

app.post('/login', passport.authenticate( 'local'),
         function(req, res){
          res.cookie("TestCookie", req.body.username)
          res.redirect('/admin.html')
           
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