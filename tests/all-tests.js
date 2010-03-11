#!/usr/bin/env narwhal

var fs = require("file"),
    assert = require("assert"),
    interpreter = require("../lib/lambdacalc");
    evl = interpreter.eval,
    parse = interpreter.parse;

exports["test parse"] = function () {
    var exps = "^x.x| ^g.g |^x.x ^y.y|^x.^x.x|λx.x|^x.\nx|^x.(^y.x)|^g.(^x.x ^y.y)".split("|");
    for (var i=0;i<exps.length;i++) {
        assert.ok(parse(exps[i]), exps[i]+" should parse ok");
    }
};

exports["test parse failures"] = function () {
    var exps = "^x|^|^x.|^x.()".split("|");
    for (var i=0;i<exps.length;i++) {
        assert["throws"](function() { parse(exps[i]) }, exps[i]+" should not parse");
    }
};

exports["test parse fun AST"] = function () {
    var expr = "^y.y";
    var expected = ["LambdaExpr", "y", ["VarExpr", "y"]];
    assert.deepEqual(parse(expr), expected, expr+" should parse ok");
};

exports["test parse apply AST"] = function () {
    var expr = "(^y.y) ^x.x";
    var expected = ["ApplyExpr", ["LambdaExpr", "y", ["VarExpr", "y"]], ["LambdaExpr", "x", ["VarExpr", "x"]]];
    assert.deepEqual(parse(expr), expected, expr+" should parse ok");
};

exports["test evaluate apply"] = function () {
    var expr = "(^y.y) ^x.x";
    var expected = ["LambdaExpr", "x", ["VarExpr", "x"]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test evaluate apply"] = function () {
    var expr = "(^y.y) ^x.x";
    var expected = ["LambdaExpr", "x", ["VarExpr", "x"]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test evaluate fun"] = function () {
    var expr = "^y.y";
    var expected = ["LambdaExpr", "y", ["VarExpr", "y"]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test evaluate fun with application"] = function () {
    var expr = "^y.y y";
    var expected = ["LambdaExpr", "y", ["ApplyExpr", ["VarExpr", "y"], ["VarExpr", "y"]]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test evaluate fun with application"] = function () {
    var expr = "^y.^x.x y";
    var expected = ["LambdaExpr", "y", ["LambdaExpr", "x", ["ApplyExpr", ["VarExpr", "x"], ["VarExpr", "y"]]]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test evaluate free variable should fail"] = function () {
    var expr = "y";
    assert["throws"](function () {evl(expr);}, expr+" should not eval");
};

exports["test concise lambdas"] = function () {
    var expr = "^xyz.x y z";
    var expected = ["LambdaExpr", "x",
                        ["LambdaExpr", "y",
                            ["LambdaExpr", "z",
                                ["ApplyExpr",
                                    ["ApplyExpr",
                                        ["VarExpr", "x"], ["VarExpr", "y"]], ["VarExpr", "z"]]]]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test concise lambdas"] = function () {
    var expr = "(((^xyz.y z) ^a.a) ^b.b) ^c.c";
    var expected = ["LambdaExpr", "c",["VarExpr", "c"]];
    assert.deepEqual(parse(evl(expr)), expected, expr+" should eval");
};

exports["test parse Alan Turing's call-by-value Y combinator"] = function () {
    var expr = "(^x. ^y. (y (^z. x x y z))) (^x. ^y. (y (^z. x x y z)))";
    assert.ok(parse(evl(expr)), expr+" should parse");
};

if (require.main === module) {
    require("os").exit(require("test").run(exports)); 
}
