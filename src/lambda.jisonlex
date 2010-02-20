%%
\s*\n\s*  {/* ignore */}
"("       { return '('; }
")"       { return ')'; }
"^"|"λ"   { return 'LAMBDA'; }
"."       { return '.'; }
[a-zA-Z]  { return 'VAR'; }
\s+       { return 'SEP'; }
<<EOF>>   { return 'EOF'; }
