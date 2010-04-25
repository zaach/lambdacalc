var require = (function() {
var require = (function () {
    var modules = {};
    var factories = {};
    var r = function (id) {if (!modules[id]) {modules[id] = {};factories[id](r, modules[id], {id: id});}return modules[id];};
    r.def = function (id, params) {factories[id] = params.factory;};
    return r;
})()
require.def("lambdacalc",{factory:function(require,exports,module){
// Evaluates lambda calculus expressions
// (using call-by-value stategy)

// e ::= x | ^x.e | e e

var parser = require("lambdacalc/parser");

function evaluate (exp) {
    return step(exp);
}

// alpha-reductions
function sub (exp, name, value) {
    switch(exp[0]) {
        case 'VarExpr':
            return name === exp[1] ? value : exp;
        case 'LambdaExpr':
            // only reduce if var is not bound by fun's param name
            return name === exp[1] ? exp : ["LambdaExpr", exp[1], sub(exp[2], name, value)];
        case 'ApplyExpr':
            // reduce recursively
            return ["ApplyExpr", sub(exp[1], name, value), sub(exp[2], name, value)];
    }
}

// dynamic semantics (expression transitions)
// call-by-value
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
                                    step(exp[2]))); // param (evaluated)
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
            return '^'+ast[1]+'.'+prettyPrint(ast[2]);
        case 'ApplyExpr':
            return '('+prettyPrint(ast[1])+') '+prettyPrint(ast[2])+'';
    }
}

exports.prettyPrint = prettyPrint;

// evluates and returns string representation of result
exports.eval = function eval (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    return prettyPrint(evaluate(parser.parse(str)));
};

// returns AST
exports.parse = function (str) {
    str = str.replace(/^\s+|\s+$/g, '');
    return parser.parse(str);
};

//*/
},requires:["lambdacalc/parser"]});

require.def("lambdacalc/parser",{factory:function(require,exports,module){
/* Jison generated parser */
var lambda = (function(){
var parser = {trace: function trace() {
},
yy: {},
symbols_: {"file":2,"expr":3,"EOF":4,"LAMBDA":5,"var_list":6,".":7,"SEP":8,"var":9,"(":10,")":11,"VAR":12,"$accept":0,"$end":1},
terminals_: {"4":"EOF","5":"LAMBDA","7":".","8":"SEP","10":"(","11":")","12":"VAR"},
productions_: [0,[2,2],[3,4],[3,3],[3,1],[3,3],[6,2],[6,1],[9,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy) {
    var $$ = arguments[5], $0 = arguments[5].length;
    switch (arguments[4]) {
      case 1:
        return $$[$0 - 2 + 1 - 1];
        break;
      case 2:
        var temp = ["LambdaExpr", $$[$0 - 4 + 2 - 1].shift(), $$[$0 - 4 + 4 - 1]];
        $$[$0 - 4 + 2 - 1].forEach(function (v) {temp = ["LambdaExpr", v, temp];});
        this.$ = temp;
        break;
      case 3:
        this.$ = ["ApplyExpr", $$[$0 - 3 + 1 - 1], $$[$0 - 3 + 3 - 1]];
        break;
      case 4:
        this.$ = ["VarExpr", $$[$0 - 1 + 1 - 1]];
        break;
      case 5:
        this.$ = $$[$0 - 3 + 2 - 1];
        break;
      case 6:
        this.$ = $$[$0 - 2 + 1 - 1];
        this.$.unshift($$[$0 - 2 + 2 - 1]);
        break;
      case 7:
        this.$ = [$$[$0 - 1 + 1 - 1]];
        break;
      case 8:
        this.$ = yytext;
        break;
      default:;
    }
},
table: [{"2":1,"3":2,"5":[1,3],"9":4,"10":[1,5],"12":[1,6]},{"1":[3]},{"4":[1,7],"8":[1,8]},{"6":9,"9":10,"12":[1,6]},{"4":[2,4],"8":[2,4],"11":[2,4]},{"3":11,"5":[1,3],"9":4,"10":[1,5],"12":[1,6]},{"8":[2,8],"4":[2,8],"12":[2,8],"7":[2,8],"11":[2,8]},{"1":[2,1]},{"3":12,"5":[1,3],"9":4,"10":[1,5],"12":[1,6]},{"7":[1,13],"9":14,"12":[1,6]},{"7":[2,7],"12":[2,7]},{"11":[1,15],"8":[1,8]},{"8":[2,3],"4":[2,3],"11":[2,3]},{"3":16,"5":[1,3],"9":4,"10":[1,5],"12":[1,6]},{"7":[2,6],"12":[2,6]},{"4":[2,5],"8":[2,5],"11":[2,5]},{"8":[1,8],"4":[2,2],"11":[2,2]}],
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], table = this.table, yytext = "", yylineno = 0, yyleng = 0, shifts = 0, reductions = 0;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    var parseError = this.yy.parseError = this.yy.parseError || this.parseError;

    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token];
        }
        return token;
    }

    var symbol, state, action, a, r, yyval = {}, p, len, ip = 0, newState, expected;
    symbol = lex();
    while (true) {
        state = stack[stack.length - 1];
        action = table[state] && table[state][symbol];
        if (typeof action === "undefined" || !action.length || !action[0]) {
            expected = [];
            for (p in table[state]) {
                if (this.terminals_[p] && p != 1) {
                    expected.push("'" + this.terminals_[p] + "'");
                }
            }
            if (this.lexer.showPosition) {
                parseError("Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", "), {text: this.lexer.match, token: this.terminals_[symbol], line: this.lexer.yylineno, expected: expected});
            } else {
                parseError("Parse error on line " + (yylineno + 1) + ": Unexpected '" + this.terminals_[symbol] + "'", {text: this.lexer.match, token: this.terminals_[symbol], line: this.lexer.yylineno, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        a = action;
        switch (a[0]) {
          case 1:
            shifts++;
            stack.push(symbol);
            ++ip;
            yyleng = this.lexer.yyleng;
            yytext = this.lexer.yytext;
            yylineno = this.lexer.yylineno;
            symbol = lex();
            vstack.push(null);
            stack.push(a[1]);
            break;
          case 2:
            reductions++;
            len = this.productions_[a[1]][1];
            yyval.$ = vstack[vstack.length - len];
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, a[1], vstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[a[1]][0]);
            vstack.push(yyval.$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            this.reductionCount = reductions;
            this.shiftCount = shifts;
            return true;
          default:;
        }
    }
    return true;
}};/* Jison generated lexer */
var lexer = (function(){var lexer = ({EOF:"",
parseError:function parseError(str, hash) {
    if (this.yy.parseError) {
        this.yy.parseError(str, hash);
    } else {
        throw new Error(str);
    }
},
setInput:function (input) {
    this._input = input;
    this._more = this._less = this.done = false;
    this.yylineno = this.yyleng = 0;
    this.yytext = this.matched = this.match = "";
    return this;
},
input:function () {
    var ch = this._input[0];
    this.yytext += ch;
    this.yyleng++;
    this.match += ch;
    this.matched += ch;
    var lines = ch.match(/\n/);
    if (lines) {
        this.yylineno++;
    }
    this._input = this._input.slice(1);
    return ch;
},
unput:function (ch) {
    this._input = ch + this._input;
    return this;
},
more:function () {
    this._more = true;
    return this;
},
pastInput:function () {
    var past = this.matched.substr(0, this.matched.length - this.match.length);
    return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
},
upcomingInput:function () {
    var next = this.match;
    if (next.length < 20) {
        next += this._input.substr(0, 20 - next.length);
    }
    return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
},
showPosition:function () {
    var pre = this.pastInput();
    var c = (new Array(pre.length + 1)).join("-");
    return pre + this.upcomingInput() + "\n" + c + "^";
},
next:function () {
    if (this.done) {
        return this.EOF;
    }
    if (!this._input) {
        this.done = true;
    }
    var token, match, lines;
    if (!this._more) {
        this.yytext = "";
        this.match = "";
    }
    for (var i = 0; i < this.rules.length; i++) {
        match = this._input.match(this.rules[i]);
        if (match) {
            lines = match[0].match(/\n/g);
            if (lines) {
                this.yylineno += lines.length;
            }
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, i);
            if (token) {
                return token;
            } else {
                return;
            }
        }
    }
    if (this._input == this.EOF) {
        return this.EOF;
    } else {
        this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text: "", token: null, line: this.yylineno});
    }
},
lex:function () {
    var r = this.next();
    if (typeof r !== "undefined") {
        return r;
    } else {
        return this.lex();
    }
}});
lexer.performAction = function anonymous(yy, yy_) {
    switch (arguments[2]) {
      case 0:
        break;
      case 1:
        return 10;
        break;
      case 2:
        return 11;
        break;
      case 3:
        return 5;
        break;
      case 4:
        return 7;
        break;
      case 5:
        return 12;
        break;
      case 6:
        return 8;
        break;
      case 7:
        return 4;
        break;
      default:;
    }
};
lexer.rules = [/^\s*\n\s*/,/^\(/,/^\)/,/^\^|λ/,/^\.\s?/,/^[a-zA-Z]/,/^\s+/,/^$/];return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined') {
exports.parser = lambda;
exports.parse = function () { return lambda.parse.apply(lambda, arguments); }
exports.main = function commonjsMain(args) {
    var cwd = require("file").path(require("file").cwd());
    if (!args[1]) {
        throw new Error("Usage: " + args[0] + " FILE");
    }
    var source = cwd.join(args[1]).read({charset: "utf-8"});
    this.parse(source);
}
if (require.main === module) {
	exports.main(require("system").args);
}
}

//*/
},requires:["file","file","system"]});;
return require;
})();