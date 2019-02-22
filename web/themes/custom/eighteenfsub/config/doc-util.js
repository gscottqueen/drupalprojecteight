
var pkg         = require('../package.json');
var log         = require('fancy-log');
var c           = require('ansi-colors');
var notifier    = require('node-notifier');

var shellPrefix = '$';

function drawFlag () {

  // American Flag in ASCII
  //
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.blue('xxxxxxxxxxxxxxxxxxxxxxxxxxxx'),
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.white('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );
  log(
    c.red('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  );

}

function notify (title, message, wait) {
  notifier.notify({
    title: title,
    message: message,
    icon: 'assets/img/favicons/favicon-192.png',
    wait: wait,
  });
}

module.exports = {

  pkg: {

    name: pkg.name,
    version: pkg.version,

  },

  dirName: pkg.name + '-' + pkg.version,

  logIntroduction: function (message) {

    message = message || 'U.S. Web Design Standards Documentation';

    log(
      c.yellow('v' + pkg.version),
      message
    );
    drawFlag();

  },

  logCommand: function (name, message) {

    log(
      shellPrefix,
      c.cyan(name),
      c.magenta(message)
    );

  },

  logHelp: function (name, message) {

    log(
      shellPrefix,
      c.cyan(name),
      c.yellow(message)
    );

  },

  logData: function (name, message) {

    log(
      c.cyan(name),
      c.yellow(message)
    );

  },

  logError: function (name, message) {

    log(
      c.red(name),
      c.yellow(message)
    );
    notify(this.dirName + ' gulp ' + name, message, true);

  },

  logMessage: function (name, message) {

    log(
      c.cyan(name),
      c.green(message)
    );
    notify(this.dirName + ' gulp ' + name, message, false);

  },

};
