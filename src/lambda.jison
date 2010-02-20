%right LAMBDA
%left SEP

%%

file
  : expr EOF
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
