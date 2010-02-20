%right LAMBDA
%left SEP

%%

file
  : exprs EOF
  ;

exprs
  : exprs expr
  | expr
  ;

expr
  : LAMBDA var '.' expr
  | expr SEP expr
  | var
  | '(' expr ')'
  ;

var
  : VAR
  ;
