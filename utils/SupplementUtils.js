'use strict';

let n = require('nonce')();
let hash = require('hash.js');

module.exports.generateSupplementHash = generateSupplementHash;
module.exports.generateHashString = generateHashString;


function generateSupplementHash(employerEmail, supId, userName){
      // console.log("the nonce is " + n());
      return hash.sha256().update(n()+employerEmail+supId+userName).digest('hex');
}


function generateHashString(inputString){
    return hash.sha256().update(inputString).digest('hex');
}
