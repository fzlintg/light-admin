export enum MODE {
  JSON = 'application/json',
  CSS = 'css',
  JAVASCRIPT = 'javascript',
  XML = 'xml',
  SQL = 'sql',
  JSX = 'jsx',
  YAML = 'yaml',
  VUE = 'vue',
  HTMLEMBEDDED = 'htmlembedded',
  HTMLMIXED = 'htmlmixed',
  POWERSHELL = 'powershell',
}
/**
 * @description: DynamicImport codemirror
 */
export function parserDynamicImport(str: MODE): () => Promise<any> {
  const dynamicArray = {
    // adapt before demo
    'application/json': async () => await import('codemirror/mode/javascript/javascript'),
    apl: async () => await import('codemirror/mode/apl/apl'),
    asciiarmor: async () => await import('codemirror/mode/asciiarmor/asciiarmor'),
    asterisk: async () => await import('codemirror/mode/asterisk/asterisk'),
    brainfuck: async () => await import('codemirror/mode/brainfuck/brainfuck'),
    clike: async () => await import('codemirror/mode/clike/clike'),
    clojure: async () => await import('codemirror/mode/clojure/clojure'),
    cmake: async () => await import('codemirror/mode/cmake/cmake'),
    cobol: async () => await import('codemirror/mode/cobol/cobol'),
    coffeescript: async () => await import('codemirror/mode/coffeescript/coffeescript'),
    commonlisp: async () => await import('codemirror/mode/commonlisp/commonlisp'),
    crystal: async () => await import('codemirror/mode/crystal/crystal'),
    css: async () => await import('codemirror/mode/css/css'),
    cypher: async () => await import('codemirror/mode/cypher/cypher'),
    d: async () => await import('codemirror/mode/d/d'),
    dart: async () => await import('codemirror/mode/dart/dart'),
    diff: async () => await import('codemirror/mode/diff/diff'),
    django: async () => await import('codemirror/mode/django/django'),
    dockerfile: async () => await import('codemirror/mode/dockerfile/dockerfile'),
    dtd: async () => await import('codemirror/mode/dtd/dtd'),
    dylan: async () => await import('codemirror/mode/dylan/dylan'),
    ebnf: async () => await import('codemirror/mode/ebnf/ebnf'),
    ecl: async () => await import('codemirror/mode/ecl/ecl'),
    eiffel: async () => await import('codemirror/mode/eiffel/eiffel'),
    elm: async () => await import('codemirror/mode/elm/elm'),
    erlang: async () => await import('codemirror/mode/erlang/erlang'),
    factor: async () => await import('codemirror/mode/factor/factor'),
    fcl: async () => await import('codemirror/mode/fcl/fcl'),
    forth: async () => await import('codemirror/mode/forth/forth'),
    fortran: async () => await import('codemirror/mode/fortran/fortran'),
    gas: async () => await import('codemirror/mode/gas/gas'),
    gfm: async () => await import('codemirror/mode/gfm/gfm'),
    gherkin: async () => await import('codemirror/mode/gherkin/gherkin'),
    go: async () => await import('codemirror/mode/go/go'),
    groovy: async () => await import('codemirror/mode/groovy/groovy'),
    haml: async () => await import('codemirror/mode/haml/haml'),
    handlebars: async () => await import('codemirror/mode/handlebars/handlebars'),
    haskell: async () => await import('codemirror/mode/haskell/haskell'),
    haxe: async () => await import('codemirror/mode/haxe/haxe'),
    htmlembedded: async () => await import('codemirror/mode/htmlembedded/htmlembedded'),
    htmlmixed: async () => await import('codemirror/mode/htmlmixed/htmlmixed'),
    http: async () => await import('codemirror/mode/http/http'),
    idl: async () => await import('codemirror/mode/idl/idl'),
    javascript: async () => await import('codemirror/mode/javascript/javascript'),
    jinja2: async () => await import('codemirror/mode/jinja2/jinja2'),
    jsx: async () => await import('codemirror/mode/jsx/jsx'),
    julia: async () => await import('codemirror/mode/julia/julia'),
    livescript: async () => await import('codemirror/mode/livescript/livescript'),
    lua: async () => await import('codemirror/mode/lua/lua'),
    markdown: async () => await import('codemirror/mode/markdown/markdown'),
    mathematica: async () => await import('codemirror/mode/mathematica/mathematica'),
    mbox: async () => await import('codemirror/mode/mbox/mbox'),
    mirc: async () => await import('codemirror/mode/mirc/mirc'),
    mllike: async () => await import('codemirror/mode/mllike/mllike'),
    modelica: async () => await import('codemirror/mode/modelica/modelica'),
    mscgen: async () => await import('codemirror/mode/mscgen/mscgen'),
    mumps: async () => await import('codemirror/mode/mumps/mumps'),
    nginx: async () => await import('codemirror/mode/nginx/nginx'),
    nsis: async () => await import('codemirror/mode/nsis/nsis'),
    ntriples: async () => await import('codemirror/mode/ntriples/ntriples'),
    octave: async () => await import('codemirror/mode/octave/octave'),
    oz: async () => await import('codemirror/mode/oz/oz'),
    pascal: async () => await import('codemirror/mode/pascal/pascal'),
    pegjs: async () => await import('codemirror/mode/pegjs/pegjs'),
    perl: async () => await import('codemirror/mode/perl/perl'),
    php: async () => await import('codemirror/mode/php/php'),
    pig: async () => await import('codemirror/mode/pig/pig'),
    powershell: async () => await import('codemirror/mode/powershell/powershell'),
    properties: async () => await import('codemirror/mode/properties/properties'),
    protobuf: async () => await import('codemirror/mode/protobuf/protobuf'),
    pug: async () => await import('codemirror/mode/pug/pug'),
    puppet: async () => await import('codemirror/mode/puppet/puppet'),
    python: async () => await import('codemirror/mode/python/python'),
    q: async () => await import('codemirror/mode/q/q'),
    r: async () => await import('codemirror/mode/r/r'),
    rpm: async () => await import('codemirror/mode/rpm/rpm'),
    rst: async () => await import('codemirror/mode/rst/rst'),
    ruby: async () => await import('codemirror/mode/ruby/ruby'),
    rust: async () => await import('codemirror/mode/rust/rust'),
    sas: async () => await import('codemirror/mode/sas/sas'),
    sass: async () => await import('codemirror/mode/sass/sass'),
    scheme: async () => await import('codemirror/mode/scheme/scheme'),
    shell: async () => await import('codemirror/mode/shell/shell'),
    sieve: async () => await import('codemirror/mode/sieve/sieve'),
    slim: async () => await import('codemirror/mode/slim/slim'),
    smalltalk: async () => await import('codemirror/mode/smalltalk/smalltalk'),
    smarty: async () => await import('codemirror/mode/smarty/smarty'),
    solr: async () => await import('codemirror/mode/solr/solr'),
    soy: async () => await import('codemirror/mode/soy/soy'),
    sparql: async () => await import('codemirror/mode/sparql/sparql'),
    spreadsheet: async () => await import('codemirror/mode/spreadsheet/spreadsheet'),
    sql: async () => await import('codemirror/mode/sql/sql'),
    stex: async () => await import('codemirror/mode/stex/stex'),
    stylus: async () => await import('codemirror/mode/stylus/stylus'),
    swift: async () => await import('codemirror/mode/swift/swift'),
    tcl: async () => await import('codemirror/mode/tcl/tcl'),
    textile: async () => await import('codemirror/mode/textile/textile'),
    tiddlywiki: async () => await import('codemirror/mode/tiddlywiki/tiddlywiki'),
    tiki: async () => await import('codemirror/mode/tiki/tiki'),
    toml: async () => await import('codemirror/mode/toml/toml'),
    tornado: async () => await import('codemirror/mode/tornado/tornado'),
    troff: async () => await import('codemirror/mode/troff/troff'),
    ttcn: async () => await import('codemirror/mode/ttcn/ttcn'),
    turtle: async () => await import('codemirror/mode/turtle/turtle'),
    twig: async () => await import('codemirror/mode/twig/twig'),
    vb: async () => await import('codemirror/mode/vb/vb'),
    vbscript: async () => await import('codemirror/mode/vbscript/vbscript'),
    velocity: async () => await import('codemirror/mode/velocity/velocity'),
    verilog: async () => await import('codemirror/mode/verilog/verilog'),
    vhdl: async () => await import('codemirror/mode/vhdl/vhdl'),
    vue: async () => await import('codemirror/mode/vue/vue'),
    wast: async () => await import('codemirror/mode/wast/wast'),
    webidl: async () => await import('codemirror/mode/webidl/webidl'),
    xml: async () => await import('codemirror/mode/xml/xml'),
    xquery: async () => await import('codemirror/mode/xquery/xquery'),
    yacas: async () => await import('codemirror/mode/yacas/yacas'),
    yaml: async () => await import('codemirror/mode/yaml/yaml'),
    z80: async () => await import('codemirror/mode/z80/z80'),
  };
  return dynamicArray[str];
}
