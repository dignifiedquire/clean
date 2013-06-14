
// Dependencies
var esprima = require('esprima');
var escodegen = require('escodegen');
var pull = require('pull-stream');

// Options for code parsing
var optionsEsprima = {
  comment: true,
  range: true,
  tokens: true
};

// Options for code generation
var optionsEscodegen = {
  format: {
    indent: {
      style: '    ',
      base: 0,
      adjustMultilineComment: true
    },
    json: false,
    renumber: false,
    hexadecimal: false,
    quotes: 'single',
    escapeless: false,
    compact: false,
    parentheses: true,
    semicolons: true
  },
  parse: null,
  comment: true,
  sourceMap: undefined
};

function clean() {
  return parse().pipe(generate());
}

function parse() {
  return pull.map(function (data) {
    data.content = esprima.parse(data.content, optionsEsprima);
    return data;
  });
}



function generate() {
  return pull.map(function (data) {
    var tree = data.content;
    tree = escodegen.attachComments(tree, tree.comments, tree.tokens);
    data.content = escodegen.generate(tree, optionsEscodegen);

    // Fix comments
    data.content = data.content.replace(/\s*\/\*\*/g, '\n$&');
    data.content = data.content.replace(/\*\*\*\//g, '***/\n');
    return data;
  });
}



module.exports = clean;