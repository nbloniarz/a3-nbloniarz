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

app.post('/addUser', function(req, res){
  console.log(req.json().new)
})

app.post('/addData', function(req, res){
  console.log(req.json().new)
})

app.post('/removeUser', function(req, res){
  console.log(req.json().original)
})

app.post('/modifyUser', function(req, res){
  console.log(req.json().original)
  console.log(req.json().new)
})

app.post('/modifyData', function(req, res){
  db.ref('/data/').once('value')
  .then(function(snapshot){
    const data = []
    const keys = []
    snapshot.forEach(function(child){
      if(child.val().user === req.cookies.TestCookie){
        data.push(child.key())
        data.push(child.val())
      }
    })
    let original = findEqual(data, req.body.original)
    db.ref('data/' + )
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
  dataArray.forEach(function(item, i){
    if(item.fName === original.fName && item.lName === original.lName
       && item.month === original.month && item.day === original.day
      && item.sign === original.sign && item.user === original.user){
      return {original: dataArray[i], index: i}
    }
  })
}

/*


function removeGiven(original){
  console.log(original)
  var index = -1
  for(let i = 0; i< Object.keys(appdata).length; i++){
    if((original.fName === appdata[i].fName) && (original.lName === appdata[i].lName)){
      if((original.day === appdata[i].day) && (original.month === appdata[i].month)){
        index = i
        console.log("Match")
      }
    }
  }
  if(index > -1){
    appdata.splice(index, 1)
  }
  console.log(appdata)
}

function modData(toChange){
  let original = toChange.originalArr
  let replace = toChange.newInput
  for(let i = 0; i < appdata.length; i++){
    if((original[0] === appdata[i].fName) && (original[1] === appdata[i].lName) && (original[2] === appdata[i].month) && (original[3] === appdata[i].day)){
      appdata[i].fName = replace[0];
      appdata[i].lName = replace[1];
      appdata[i].month = replace[2];
      appdata[i].day = replace[3];
      appdata[i].sign = starSign(appdata[i])
    }
  }
}



*/

app.listen( process.env.PORT || port )