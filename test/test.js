'use strict';
var nodePath = require('path');
require('chai').config.includeStack = true;

var rmdirRecursive = require('./util').rmdirRecursive;
var buildDir = nodePath.join(__dirname, 'build');

var lasso = require('lasso');
var plugin = require('../');

describe('lasso/bundling' , function() {
    require('./autotest').scanDir(
        nodePath.join(__dirname, 'autotests'),
        function (dir, helpers, done) {

            var main = require(nodePath.join(dir, 'test.js'));
            var testName = nodePath.basename(dir);
            var pageName = testName;

            var lassoConfig = main.getLassoConfig && main.getLassoConfig(plugin);
            if (!lassoConfig) {
                lassoConfig = {
                    bundlingEnabled: false,
                    fingerprintsEnabled: false
                };
            }

            if (!lassoConfig.outputDir) {
                lassoConfig.outputDir = nodePath.join(buildDir, pageName);
            }

            rmdirRecursive(lassoConfig.outputDir);

            var myLasso = lasso.create(lassoConfig, dir);

            var inputs;

            let lassoOptions = main.getLassoOptions(dir) || {};
            let check = main.check;

            inputs = [
                {
                    lassoOptions,
                    check
                }
            ];

            var checkError = main.checkError;

            if (!lassoOptions.pageName) {
                lassoOptions.pageName = pageName;
            }

            if (!lassoOptions.from) {
                lassoOptions.from = dir;
            }

            myLasso.lassoPage(lassoOptions)
                .then((lassoPageResult) => {
                    if (checkError) {
                        return done('Error expected');
                    }
                    check(lassoPageResult, helpers);
                    lasso.flushAllCaches(done);
                })
                .catch((err) => {
                    if (checkError) {
                        checkError(err);
                        done();
                    } else {
                        throw err;
                    }
                })
                .catch(done);
        });
});