// Evaluates lambda calculus expressions
// (using call-by-value stategy)

// e ::= x | ^x.e | e e

var parser = require("./lambda/parser");

function evaluate (exp) {
    return step(exp);
}

// alpha-reductions
function sub (exp, name, value) {
    switch(exp[0]) {
        case 'VarExpr':
            return name === exp[1] ? value : exp;
        case 'LambdaExpr':
            // only reduce if var is not bound by fun's param
            return name === exp[1] ? exp : ["LambdaExpr", exp[1], sub(exp[2], name, value)];
        case 'ApplyExpr':
            // reduce recursively
            return ["ApplyExpr", sub(exp[1], name, value), sub(exp[2], name, value)];
    }
}

// dynamic semantics (expression transitions)
// left to right, call-by-value
function step (exp) {
    switch(exp[0]) {
        case 'LambdaExpr':
            return exp;
        case 'ApplyExpr':
            switch (exp[1][0]) {
                case 'LambdaExpr':
                    // beta-reduction
                    return step(sub(exp[1][2], // fun body
                                    exp[1][1], // param name
                                    step(exp[2]))); // param value
                default:
                    // find value of first expression
                    return step(["ApplyExpr", step(exp[1]), exp[2]]);
            }
        case 'VarExpr':
            throw "Undefined variable: "+exp[1];
        default:
            throw "Invalid expression.";
    }
}

function prettyPrint (ast) {
    switch (ast[0]) {
        case 'VarExpr':
            return ast[1];
        case 'LambdaExpr':
            return 'λ'+ast[1]+'.'+prettyPrint(ast[2]);
        case 'ApplyExpr':
            return '('+prettyPrint(ast[1])+') ('+prettyPrint(ast[2])+')';
    }
}

exports.prettyPrint = prettyPrint;

exports.eval = function eval (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    return prettyPrint(evaluate(parser.parse(str)));
};

// returns AST
exports.parse = function (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    return parser.parse(str);
};
