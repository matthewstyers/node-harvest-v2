const _ = require('lodash');
const Request = require('../Request');

const base = {

  list(params, cb) {
    let callback = cb;
    this.options.url = this.baseUri;

    if (_.isFunction(params)) callback = params;
    else {
      const listParams = ['user_id', 'client_id', 'project_id', 'is_billed', 'is_running', 'updated_since', 'from', 'to', 'page', 'per_page'];

      let link = '?';

      for (const datax in params) {
        if (listParams.indexOf(datax) !== -1) {
          link = link + datax + '=' + params[datax] + '&';
        }
      }

      this.options.url = this.baseUri + '/' + link.slice(0, -1);
    }

    new Request(this.options, callback);
  },

  retrieve(id, cb) {
    this.options.url = this.baseUri + '/' + id;

    new Request(this.options, cb);
  },

  create(params, cb) {
    this.options.url = this.baseUri;
    this.options.method = 'POST';
    this.options.body = JSON.stringify(params);

    new Request(this.options, cb);
  },

  update(id, params, cb) {
    this.options.url = this.baseUri + '/' + id;
    this.options.method = 'PATCH';
    this.options.body = JSON.stringify(params);

    new Request(this.options, cb);
  },

  delete(id, cb) {
    this.options.url = this.baseUri + '/' + id;
    this.options.method = 'DELETE';

    new Request(this.options, cb);
  }
};

module.exports = base;
