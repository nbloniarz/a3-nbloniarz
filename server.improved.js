const http = require( 'http' ),
      fs   = require( 'fs' ),
      mime = require( 'mime' ),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      express = require('express'),      
      downcase = require('express-uncapitalize'),
      passport = require('passport'),
      local = require('passport-local').Strategy,
      path = require('path'),
      dir  = 'public/',
      port = 3000,
      app = express(),
      bodyparser = require('body-parser'),
      mimeExp = {'Content-Type': 'application/json'},
      mimeMes = {'Content-Type': 'text/plain'}
//////////////////////////////////////////////////////////////////
app.use(express.static('public')) //Serves static pages
app.use(bodyparser.json())//can use json to parse req
app.use(downcase())
//////////////////////////////////////////////////////////////////

app.post('/login', bodyparser.json(), function(req, res){
  console.log(req.body)
})


app.listen( process.env.PORT || port )