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
//app.use(downcase())//forces http requests to downcase
app.use(compression()) //Minimizes headers
app.use(favicon("public/favicon.png"))
app.use(session({secret: 'kittens', saveUninitialized: false, resave: false}))//sets session secret
//////////////////////////////////////////////////////////////////
////////////     PASSPORT     /////////////////////////////////
///////////////////////////////////////////////////////////////
const myStrategy = function(username, password, done){
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
      console.log(child.val())
    })
    res.json(data)
  })
})

app.get('/allUsers', function(req, res){
  db.ref('/users/').once('value')
  .then(function(snapshot){
    const data = []
    snapshot.forEach(function(child){
      data.push(child.val())
      console.log(child.val())
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

app.post('/addUser', function(req, res){
  console.log(req.json().new)
})

app.post('/addData', function(req, res){
  db.ref('/data').push({
    fName: req.body.fName,
    lName: req.body.lName,
    month: req.body.month,
    day: req.body.day,
    sign: starSign(req.body),
    user: req.body.user
  }).then(function(response){
    console.log("added")
    res.json({})
  })
})

app.post('/removeUser', function(req, res){
  console.log(req.json().original)
})

app.post('/modifyUser', function(req, res){
  console.log(req.json().original)
  console.log(req.json().new)
})


app.post('/modifydata', function(req, res){
  db.ref('/data/').once('value')
  .then(function(snapshot){
    const data = []
    const keys = []
    snapshot.forEach(function(child){
      if(child.val().user === req.cookies.TestCookie){
        keys.push(child.key)
        data.push(child.val())
      }
    })
    //res.json(data)
    let original = findEqual(data, req.body.original)
    if(original.index >= 0){
      db.ref('data/' +  keys[original.index]).set({
        fName: req.body.new.fName,
        lName: req.body.new.lName,
        month: req.body.new.month,
        day:  req.body.new.day,
        sign: starSign(req.body.new),
        user: req.cookies.TestCookie
      })
    }
    res.json(req.body.new)
  })
})

app.post('/deletedata', function(req, res){
  db.ref('/data/').once('value')
  .then(function(snapshot){
    const data = []
    const keys = []
    snapshot.forEach(function(child){
      if(child.val().user === req.cookies.TestCookie){
        keys.push(child.key)
        data.push(child.val())
      }
    })
    //res.json(data)
    let original = findEqual(data, req.body)
    if(original.index >= 0){
      db.ref('data/' +  keys[original.index]).remove()
    }
    res.json(req.body)
  })
})


//////////////////////////////////////////////////////////////////
//////////////         UTILITY       ////////////////////////////
/////////////////////////////////////////////////////////////////

//Calculates star sign for given information
function starSign(personalInfo){
  switch(personalInfo.month){
    case "January":
      if(personalInfo.day < 21){
        return "Capricorn"
      }
      else{
        return "Aquarius"
      }
      break;
    case "February":
      if(personalInfo.day < 19){
        return "Aquarius"
      }
      else{
        return "Pisces"
      }
      break;
    case "March":
      if(personalInfo.day < 21){
        return "Pisces"
      }
      else{
        return "Aries"
      }
      break;
    case "April":
      if(personalInfo.day < 21){
        return "Aries"
      }
      else{
        return "Tarus"
      }
      break;
    case "May":
      if(personalInfo.day < 22){
        return "Tarus"
      }
      else{
        return "Gemini"
      }
      break;
    case "June":
      if(personalInfo.day < 22){
        return "Gemini"
      }
      else{
        return "Cancer"
      }
      break;
    case "July":
      if(personalInfo.day < 23){
        return "Cancer"
      }
      else{
        return "Leo"
      }
      break;
    case "August":
      if(personalInfo.day < 24){
        return "Leo"
      }
      else{
        return "Virgo"
      }
      break;
    case "September":
      if(personalInfo.day < 23){
        return "Virgo"
      }
      else{
        return "Libra"
      }
      break;
    case "October":
      if(personalInfo.day < 24){
        return "Libra"
      }
      else{
        return "Scorpio"
      }
      break;
    case "November":
      if(personalInfo.day < 24){
        return "Scorpio"
      }
      else{
        return "Sagatarius"
      }
      break;
    case "December":
      if(personalInfo.day < 22){
        return "Sagittarius"
      }
      else{
        return "Capricorn"
      }
      break;
    default:
      return "Error"
  }
}

function findEqual(dataArray, original){
  var returnVal = {original: null, index: -1}
  dataArray.forEach(function(item, i){
    if(item.fName === original.fName){
      if(item.lName === original.lName){
        if(item.month === original.month){
          if(item.day === original.day){
            if(item.sign === original.sign){
              if(item.user === original.user){
                returnVal = {original: original, index: i}
              }
            }
          }
        }
      }
    }
  })
  return returnVal
}

app.listen( process.env.PORT || port )