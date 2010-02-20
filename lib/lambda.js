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
        case 'FunExpr':
            // only reduce if var is not bound by fun's param
            return name === exp[1] ? exp : ["FunExpr", exp[1], sub(exp[2], name, value)];
        case 'ApplyExpr':
            // reduce recursively
            return ["ApplyExpr", sub(exp[1], name, value), sub(exp[2], name, value)];
    }
}

// dynamic semantics (expression transitions)
function step (exp) {
    switch(exp[0]) {
        case 'FunExpr':
            return exp;
        case 'ApplyExpr':
            switch (exp[1][0]) {
                case 'FunExpr':
                    // beta-reduction
                    // Apply fun(p){body} v2 -> [p/v2]body
                    return step(sub(/*fun body*/ exp[1][2],
                                    /*param name*/ exp[1][1],
                                    /*param value*/ step(exp[2])));
                default:
                    // Apply e1 e2 -> Apply v1 e2
                    return step(["ApplyExpr", step(exp[1]), exp[2]]);
            }
        case 'VarExpr':
            throw "Undefined variable: "+exp[1];
        default:
            throw "Invalid expression.";
    }
}

exports.parse = function (inp) { return parser.parse(inp); };
