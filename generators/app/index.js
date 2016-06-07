'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var process = require('process');

module.exports = yeoman.Base.extend({
    prompting: function () {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the splendid ' + chalk.red('generator-web-app-generator') + ' generator!'
            ));

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'your application name',
                default: "webApp"
            }
        ];

        return this.prompt(prompts).then(function (props) {
            // To access props later use this.props.someAnswer;
            this.props = props;
        }.bind(this));
    },

    writing: function () {
        var _this = this;

        var initialAppName = 'Step001';
        var initialFolderName = 'webSite';

        var folders = [
            "webSite/configuration",
            "webSite/Properties",
            "webSite/scripts",
            "webSite/typings",
        ]

        folders.forEach(function (folder) {
            var _appName = _this.props.appName;
            var _folder = folder.replace(initialFolderName, _appName);
            _this.bulkDirectory(folder, _folder, {
                appName: _appName
            });
        });

        var files = [
            "Step001.sln",
            "webSite/bower.json",
            "webSite/Gulpfile.js",
            "webSite/Index.html",
            "webSite/package.json",
            "webSite/packages.config",
            "webSite/Global.asax",
            "webSite/Global.asax.cs",
            "webSite/Step001.csproj",
            "webSite/tsd.json",
            "webSite/Web.config",
            "webSite/Properties/AssemblyInfo.cs",
            "webSite/controllers/IndexController.cs"
        ]


        var copyTpl = function (_this, file) {
            var _appName = _this.props.appName;
            var _file = file.replace(initialAppName, _appName).replace(initialFolderName, _appName);
            _this.fs.copyTpl(
                _this.templatePath(file),
                _this.destinationPath(_file), {
                    appName: _appName
                }
                );
        }

        files.forEach(function (file) {
            copyTpl(_this, file);
        });

        console.log("test log");
    },

    install: function () {
        this.log('Running npm.bower,tsd if fails run it your self')
          var _this = this;
          var _appName = _this.props.appName;
        this.on('end', function () {
            this.spawnCommand("npm", ["install"], { cwd: _appName})
            this.spawnCommand("bower", ["install"], { cwd: _appName})
            this.spawnCommand("tsd", ["install"], { cwd: _appName})
            this.log('End Running npm.bower,tsd if fails run it your self')
        });
  
        //this.installDependencies();
    }
});
