/* eslint-disable no-console, newline-per-chained-call, no-lonely-if */

'use strict';

const dav = require('dav');
const Vcard = require('vcard');

const config = require('./config.js');
const xhr = new dav.transport.Basic(
  new dav.Credentials({
    username: config.owncloud.username,
    password: config.owncloud.password
  })
);

const connect = () => dav.createAccount({
  server: config.owncloud.server,
  xhr,
  accountType: 'carddav',
  loadObjects: true
});

const extractAddresses = account => {
  const addresses = [];

  for (const entry of account.addressBooks[0].objects) {
    new Vcard().readData(entry.data.props.addressData, (err, json) => {
      if (err) {
        console.log(err);
      } else {
        if (json.EMAIL && json.EMAIL.value.indexOf('vCard') === -1) {
          addresses.push(json.EMAIL.value);
        }
      }
    });
  }

  return addresses;
};

const printAddresses = addresses => {
  console.log(addresses.join(','));
};

connect().then(extractAddresses).then(printAddresses).catch(console.log);

