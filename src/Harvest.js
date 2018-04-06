

const HeaderAuth = require('./authentication/HeaderAuth');
const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');

module.exports = class Harvest {
  constructor(config) {
    this.headerAuth = new HeaderAuth(config);

    this.options = {
      url: '',
      method: '',
      headers: this.headerAuth.header(),
      body: ''
    };

    fs.readdirSync(path.join(__dirname, 'api')).forEach(name => {
      const prop = camelCase(name.slice(0, -3));
      const Resource = require(`./api/${name}`);

      this[prop] = new(Resource)(this.options);
      //console.log(prop);
    });
  }
};
