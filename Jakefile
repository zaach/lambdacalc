#!/usr/bin/env narwhal
 
var FILE = require("file"),
    ENV = require("system").env,
    OS = require("os"),
    jake = require("jake"),
    bundler = require("cjs-bundler");

var cwd = FILE.path(FILE.cwd());

jake.task("build", ["build:commonjs"]);

jake.task("build:commonjs", function () {
    OS.system(['jison', 'src/lambdacalc.jison', 'src/lambdacalc.jisonlex']);
    OS.system(['mv', 'lambdacalc.js', 'lib/lambdacalc/parser.js']);
});

jake.task("test", function () {
    OS.system(['narwhal', 'tests/all-tests.js']);
});

var path = FILE.path(FILE.cwd());

jake.task("build:web", function() {
    var script = bundler.bundle([
        { id : "lambdacalc", path : path.join("lib", "lambdacalc.js") },
        { id : "lambdacalc/parser", path : path.join("lib", "lambdacalc", "parser.js") }
    ]);
    
    FILE.write("web/lambdacalc.js", "var require = (function() {\n" + script + ";\nreturn require;\n})();");
});
