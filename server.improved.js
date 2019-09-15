const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      express = require('express'),
      passport = require('passport'),
      flash = require('connect-flash'),
      local = require('passport-local').Strategy,
      cookieParser = require('cookie-parser'),
      session = require('express-session'),
      path = require('path'),
      dir  = 'public/',
      port = 3000,
      validator = require('express-validator'),
      app = express(),
      bodyparser = require('body-parser'),
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}
    


//CONFIGURATION FOR EXPRESS MIDDLEWARE (1-5)
app.use(bodyparser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({secret: 'kitty', resave: false, saveUninitialized: true,}))
app.use(validator())
app.use(flash())

app.use(function(req, res, next){
  res.locals.success_message = req.flash('success_message')
  res.locals.error
})

//app.use(express.static('public')) //Serves static pages
//app.use(downcase)//Forces downcasing of entire url after /



//WORK ON COOKIE INTEGRATION

//EXPRESS SERVER FUNCTIONS
//GET REQUESTS
/*app.get('/', function(request, response){
  response.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/loadLoginPage', function(request, response){
  response.redirect("/login")
})

app.get('/admin', function(request, response){
  response.redirect('/admin')
})

//POST REQUESTS

app.post('/doLogin', passport.authenticate('local', { failureRedirect: "/index"}), function(req, res){
  res.redirect('/admin')
})*/

app.listen( process.env.PORT || port )


