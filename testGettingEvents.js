"use strict";
process.env.GOPATH = __dirname;
/**
 * This example shows how to do the following in a web app.
 * 1) At initialization time, enroll the web app with the block chain.
 *    The identity must have already been registered.
 * 2) At run time, after a user has authenticated with the web app:
 *    a) register and enroll an identity for the user;
 *    b) use this identity to deploy, query, and invoke a chaincode.
 */

// To include the package from your hyperledger fabric directory:
//    var hfc = require("myFabricDir/sdk/node");
// To include the package from npm:
//      var hfc = require('hfc');
var hfc = require('hfc');
var util = require('util');
var fs = require('fs');
// Create a client chain.
// The name can be anything as it is only used internally.
var chain = hfc.newChain("targetChain");

// Configure the KeyValStore which is used to store sensitive keys
// as so it is important to secure this storage.
// The FileKeyValStore is a simple file-based KeyValStore, but you
// can easily implement your own to store whereever you want.
chain.setKeyValStore( hfc.newFileKeyValStore(__dirname+'/tmp/keyValStore') );

// Set the URL for member services
chain.setMemberServicesUrl("grpc://172.17.0.1:7054");

// Add a peer's URL
chain.addPeer("grpc://172.17.0.1:7051");
chain.eventHubConnect("grpc://172.17.0.1:7053");
process.on('exit', function() {
  chain.eventHubDisconnect();
});



let evntHub = chain.getEventHub();
let chaincodeID=  fs.readFileSync(__dirname + "/chaincodeIDLocalHost", 'utf8'),
evntHub.registerChaincodeEvent(chaincodeID, "evtPubReq", function(event) {
  console.log(util.format("Custom publication event : %j\n", event.payload.toString()));
});
