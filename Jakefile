#!/usr/bin/env narwhal
 
var FILE = require("file"),
    ENV = require("system").env,
    OS = require("os"),
    jake = require("jake");

var cwd = FILE.path(FILE.cwd());

jake.task("build", ["build_commonjs"]);

jake.task("build_commonjs", function () {
    OS.system(['jison', 'src/lambdacalc.jison', 'src/lambdacalc.jisonlex']);
    OS.system(['mv', 'lambdacalc.js', 'lib/lambdacalc/parser.js']);
});

jake.task("test", function () {
    OS.system(['narwhal', 'tests/all-tests.js']);
});
