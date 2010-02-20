#!/usr/bin/env narwhal

var fs = require("file"),
    assert = require("assert"),
    interpreter = require("../lib/lambda");

exports["test parse"] = function () {
    var exps = "^x.x|^x.x ^y.y|^x.^x.x|λx.x|^x.\nx|^x.(^y.x)|^g.(^x.x ^y.y)".split("|");
    for (var i=0;i<exps.length;i++) {
        assert.ok(interpreter.parse(exps[i]), exps[i]+" should parse ok");
    }
};

if (require.main === module)
    require("os").exit(require("test").run(exports)); 
