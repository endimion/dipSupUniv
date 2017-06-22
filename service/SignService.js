/*jslint es6 */
/*jslint node: true */
'use strict';
let crypto = require('crypto');
let fs = require('fs');
let path = require('path');

exports.signHash = (hash) =>{
  let keyPath = path.join(__dirname, '..', 'resources',  'diplomaSupplementkey.pem');
  let pem = fs.readFileSync(keyPath);
  let key = pem.toString('ascii');

  let sign = crypto.createSign('RSA-SHA256');
  sign.update(hash);  // data from your file would go here
  return sign.sign({'key':key, 'passphrase': "panathinaikos"}, 'hex');

};
