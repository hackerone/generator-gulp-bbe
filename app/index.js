'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');


var GulpBbeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic GulpBbe generator.'));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  copyAll: function (files) {
    _(files).forEach(function (file) {
        this.copy(file, file);
      }, this);
  },

  app: function () {
    this.mkdir('app');
    
    this.mkdir('app/components');

    this.mkdir('app/routes');
    this.mkdir('app/views');
    this.mkdir('app/views/layouts');
    this.mkdir('app/views/site');

    this.copyAll([
      'server.coffee',
      'app/config.coffee',
      'app/components/layout.coffee',
      'app/routes/site.coffee',
      'app/views/layouts/index.hjs',
      'app/views/site/index.hjs'
    ]);

  },

  client: function () {
    this.mkdir('public');
    this.mkdir('public/coffee');
    this.mkdir('public/sass');
    
    this.copyAll([
      'public/coffee/main.coffee',
      'public/sass/common.scss'
    ]);
    
  },

  projectfiles: function () {
    this.copy('.bowerrc', '.bowerrc');
    this.copy('Procfile', 'Procfile');
    this.copy('bower.json', 'bower.json');
    this.copy('editorconfig', 'editorconfig');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('jshintrc', 'jshintrc');
    this.copy('package.json', 'package.json');
  }
});

module.exports = GulpBbeGenerator;