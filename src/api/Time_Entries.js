const base = require('../mixins/Base.js');
const pick = require('lodash/pick.js');
const Request = require('../Request');
function TimeEntries(options) {
  this.name = 'time_entries';
  this.baseUri = 'https://api.harvestapp.com/v2/' + this.name;
  this.options = options;
}

Object.assign(TimeEntries.prototype, pick(base, ['retrieve', 'create', 'update', 'delete']));

TimeEntries.prototype.list = function list(params, cb) {
  const listParams = ['user_id', 'client_id', 'project_id', 'is_billed', 'is_running', 'updated_since', 'from', 'to', 'page', 'per_page'];

  let link = '?';

  for (const datax in params) {
    if (listParams.indexOf(datax) !== -1) {
      link = link + datax + '=' + params[datax] + '&';
    }
  }

  this.options.url = this.baseUri + '/' + link.slice(0, -1);

  new Request(this.options, cb);
};

TimeEntries.prototype.listAll = function listAll(cb) {
  this.options.url = this.baseUri;

  new Request(this.options, cb);
};

TimeEntries.prototype.restart = function restart(timeEntryID, cb) {
  this.options.url = this.baseUri + '/' + timeEntryID + '/restart';
  this.options.method = 'PATCH';

  new Request(this.options, cb);
};

TimeEntries.prototype.stop = function stop(timeEntryID, cb) {
  this.options.url = this.baseUri + '/' + timeEntryID + '/stop';
  this.options.method = 'PATCH';

  new Request(this.options, cb);
};

module.exports = TimeEntries;
