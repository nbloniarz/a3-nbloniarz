const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      firebase = require('firebase'),
      express = require('express'),
      passport = require('passport'),
      local = require('passport-local').Strategy,
      path = require('path'),
      router = express.Router(),
      dir  = 'public/',
      port = 3000,
      app = express(),
      bodyparser = require('body-parser'),
      downcase = require('express-uncapitalize'),
      cookieSession = require('cookie-session'),
      cookieParser = require('cookie-parser'),
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'},
      //FIREBASE CONFIG
      firebaseConfig = {
        apiKey: "AIzaSyAuOGEGSNJLe2fxv0iHQwigSY8nIj2pb30",
        authDomain: "a2-nbloniarz.firebaseapp.com",
        databaseURL: "https://a2-nbloniarz.firebaseio.com",
        projectId: "a2-nbloniarz",
        storageBucket: "a2-nbloniarz.appspot.com",
        messagingSenderId: "337634055490",
        appId: "1:337634055490:web:821a136e7f93eff009e4db"
      }

    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database()

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
app.use(cookieSession({ //Creates a cookie for the session
  name: 'session',
  secret: 'Sauce'
}))
app.use(cookieParser('Sauce'))//Parses the cookie for the session
app.engine('html', require('ejs').renderFile);


//app.use(passport.initialize())
//app.use('/', router)

//WORK ON COOKIE INTEGRATION

//EXPRESS SERVER FUNCTIONS
//GET REQUESTS
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/getData', function(request, response){
  var temp = []
  db.ref('/').once('value', function(snapShot){
    snapShot.forEach(function(child){
      temp.push(child.val())
    })  
  }).then(function(){
    response.writeHead(200, "OK", mimeExp)
    response.end(JSON.stringify(temp))
  })
})

app.get('/loadLoginPage', function(request, response){
  console.log("IN LOGIN")
  //response.render("login")
  //response.set(mimeMes)
  response.redirect(301, "/login")
})


//POST REQUESTS
app.post('/submit', bodyparser.json(), function(request, response){
  var temp = []
  temp.push(request.body)
  response.writeHead(200, "OK", mimeExp)
  response.end(JSON.stringify(temp))
  
  
})

app.post('/modify', bodyparser.json(), function(request, response){
  response.writeHead(200, "OK", mimeExp)
  response.end(JSON.stringify(db.ref()))
})

app.post('/delete', bodyparser.json(), function(request, response){
  response.writeHead(200, "OK", mimeExp)
  response.end(JSON.stringify(appdata))
})



app.listen( process.env.PORT || port )


/* NO EXPRESS OLD ASSIGNMENT 2


const handleGet = function( request, response ) {
  else if(request.url === '/getHoro'){
    response.writeHeader(200, "OK", {'Content-Type': 'plain/text'})
    response.write(JSON.stringify(horoscopes))
    response.end()
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  request.on( 'data', function( data ) {
      dataString += data 
  })

  request.on( 'end', function() {
    const reqURL = request.url.slice(1)
    switch(reqURL){
      /*Submit Case*/
/*      case "submit":
        const convertedData = JSON.parse(dataString)
        convertedData.sign = starSign(convertedData)
        if(noDuplicates(convertedData)){
          appdata.push(convertedData)
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write(json)
          response.end()
        }
        else{
          let json = JSON.stringify(appdata)
          response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
          response.write("Duplicate Information, Not Added!")
          response.end()
        }       
        break
        /*Modify  Case MAXIMUM EFFICENCY*/
/*      case "modify":
        const Data = JSON.parse(dataString)
        modData(Data)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(appdata))
        response.end()
        break
      case "delete":
        const removalData = JSON.parse(dataString)
        removeGiven(removalData)
        response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
        response.write(JSON.stringify(appdata))
        response.end()
        break
      default:
        console.log(reqURL)
    }
    
    
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )

//Checks if given input os already in database
function noDuplicates(dataToAdd){
  for(let i = 0; i< Object.keys(appdata).length; i++){
    if((dataToAdd.fName === appdata[i].fName) && (dataToAdd.lName === appdata[i].lName)){
      if((dataToAdd.day === appdata[i].day) && (dataToAdd.month === appdata[i].month)){
        return false;
      }
    }
  }
  return true;
}

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