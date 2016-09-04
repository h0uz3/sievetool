/* eslint-disable no-console, newline-per-chained-call, no-lonely-if, dot-location */

'use strict';

const dav = require('dav');
const fs = require('fs');
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

const generateSieverule = addresses => new Promise(resolve => {
  let sieverule = `# rule:[lowprio]\nelsif anyof (`;

  for (const i in addresses) {
    if (i < addresses.length - 1) {
      sieverule += `not address :contains "From" "${addresses[i]}",\n    `;
    } else {
      sieverule += `not address :contains "From" "${addresses[i]}")\n`;
    }
  }

  sieverule += `{\n    fileinto "${config.targetmailbox}"\n}`;

  resolve(sieverule);
});

const writeRule = sieverule => new Promise((resolve, reject) => {
  fs.writeFile(config.sievefile, sieverule, err => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

connect()
  .then(extractAddresses)
  .then(generateSieverule)
  .then(writeRule)
  .catch(console.log);
