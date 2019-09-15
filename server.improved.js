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
      passport = require('passport'),
      local = require('passport-local').Strategy,
      app = express(),
      bodyparser = require('body-parser'),
      path = require('path'),
      //GENERAL consts
      dir  = 'public/',
      port = 3000,
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}
//////////////////////////////////////////////////////////////////
app.use(express.static('public')) //Serves static pages
app.use(cookieParser())//needed to read cookies for auth
app.use(bodyparser.json())//can use json to parse req
app.use(downcase())//forces http requests to downcase
app.use(session({secret: 'kittens'}))//sets session secret
app.use(passport.initialize())//required for passport
app.use(passport.session())//persistant login session
//////////////////////////////////////////////////////////////////

app.post('/login', bodyparser.json(), function(req, res){
  let userObj = req.body
})


app.listen( process.env.PORT || port )