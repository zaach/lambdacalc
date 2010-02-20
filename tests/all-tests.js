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

exports["test parse failures"] = function () {
    var exps = "^x|^|^x.|^x.()".split("|");
    for (var i=0;i<exps.length;i++) {
        assert["throws"](function() { interpreter.parse(exps[i])}, exps[i]+" should not parse");
    }
};

exports["test parse fun AST"] = function () {
    var expr = "^y.y";
    var expected = ["FunExpr", "y", ["VarExpr", "y"]];
    assert.deepEqual(interpreter.parse(expr), expected, expr+" should parse ok");
};

exports["test parse apply AST"] = function () {
    var expr = "(^y.y) ^x.x";
    var expected = ["ApplyExpr", ["FunExpr", "y", ["VarExpr", "y"]], ["FunExpr", "x", ["VarExpr", "x"]]];
    assert.deepEqual(interpreter.parse(expr), expected, expr+" should parse ok");
};

if (require.main === module)
    require("os").exit(require("test").run(exports)); 
