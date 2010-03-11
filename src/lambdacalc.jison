%right LAMBDA
%left SEP

%%

file
  : expr EOF
    { return $expr; }
  ;

expr
  : LAMBDA var_list '.' expr
    %{
      var temp = ["LambdaExpr", $var_list.shift(), $expr];
      $var_list.forEach(function (v) {
        temp = ["LambdaExpr", v, temp];
      });
      $$ = temp;
    %}
  | expr SEP expr
    { $$ = ["ApplyExpr", $expr1, $expr2]; }
  | var
    { $$ = ["VarExpr", $var]; }
  | '(' expr ')'
    { $$ = $expr; }
  ;

var_list
  : var_list var
    { $$ = $var_list; $$.unshift($var); }
  | var
    { $$ = [$var]; }
  ;

var
  : VAR
    { $$ = yytext; }
  ;
