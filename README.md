[λ-calculus](http://en.wikipedia.org/wiki/Lambda_calculus)
==========
This script parses and evaluates (untyped) lambda calculus expressions. It uses a call-by-value reduction strategy (because that was the easiest.)

Usage
-----
It's a commonjs module, used like so:

    var lambdacalc = require("lambdacalc"); // assuming it's in your load path

    lambdacalc.eval("(^x.x) ^y.y"); // returns "^y.y"

REPL coming soon.

Enjoy your lambdas.

MIT X Licensed
