var restify = require('restify');
var builder = require('botbuilder');

// Setup some https server options
var fs = require('fs');
var https_options = {
    ca:  fs.readFileSync('/home/bitnami/COMODO_DV_SHA-256_bundle.crt.zip'),
    key: fs.readFileSync('/home/bitnami/rickywck_mooo_com.key'),
    certificate: fs.readFileSync('/home/bitnami/rickywck_mooo_com.crt')
  };

// Setup Restify Server
var server = restify.createServer(https_options);
server.listen(443, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

require('dotenv').config({silent: true});
console.log("process.env.appID "+ process.env.appId); 
console.log("process.env.appPassword "+ process.env.appPassword); 

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.appId,
    appPassword: process.env.appPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});