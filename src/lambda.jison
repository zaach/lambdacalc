%right LAMBDA
%left SEP

%%

file
  : expr EOF
    { return $expr; }
  ;

expr
  : LAMBDA var '.' expr
    { $$ = ["LambdaExpr", $var, $expr]; }
  | expr SEP expr
    { $$ = ["ApplyExpr", $expr1, $expr2]; }
  | var
    { $$ = ["VarExpr", $var]; }
  | '(' expr ')'
    { $$ = $expr; }
  ;

var
  : VAR
    { $$ = yytext; }
  ;
