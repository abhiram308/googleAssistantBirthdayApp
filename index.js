"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Birthday = require("./models/birthday");

const restService = express();
const mongoConnectionUrl = "mongodb://localhost:27017/birthdayApp";

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mongoose.connect(mongoConnectionUrl);

restService.use(bodyParser.json());

restService.post("/", function(request, response) {
  var speech, displayText, source;
  if(request.body.result.metadata.intentName === 'GetBirthdayIntent') {
    var givenName = request.body.result.parameters.givenName;
    Birthday.findOne({"name" : { $regex : new RegExp(givenName, "i") } }).then(function(data) {
      speech = givenName + '\'s birthday is on ' + data.birthDate;
      displayText = givenName + '\'s birthday is on ' + data.birthDate;
     
      return response.json({
        speech: speech,
        displayText: displayText,
        source: "webhook-echo-sample"
      });
    });
  }
  else if (request.body.result.metadata.intentName === 'SaveBirthdayIntent') {
    var givenName = request.body.result.parameters.givenName;
    var birthDate = request.body.result.parameters.birthDate;
    var person = new Birthday();
    person.name = givenName;
    person.birthDate = birthDate;
    Birthday.create(person).then(function() {
      speech = 'Okay, I got that';
      displayText = 'Okay, I got that';

      return response.json({
        speech: speech,
        displayText: displayText,
        source: "webhook-echo-sample"
        });
      });
  }

});

restService.listen(process.env.PORT || 8080, function() {
  console.log("Server up and listening on port");
});