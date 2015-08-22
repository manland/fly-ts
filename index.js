const ts = require("typescript");

function transpile(input, compilerOptions) {
    var options = compilerOptions || {};
    options.isolatedModules = true;
    options.allowNonTsExtensions = true;
    options.noLib = true;
    options.noResolve = true;

    var inputFileName = options.filename ? options.filename : 'module.ts';
    var sourceFile = ts.createSourceFile(inputFileName, input, options.target);
    var outputText;
    var compilerHost = {
        getSourceFile: function (fileName, target) { return fileName === inputFileName ? sourceFile : undefined; },
        writeFile: function (name, text, writeByteOrderMark, onError) {
            outputText = text;
        },
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ''; },
        getNewLine: function () { return ts.getNewLineCharacter(options); }
    };
    var program = ts.createProgram([inputFileName], options, compilerHost);
    var res = program.emit();
    ts.Debug.assert(outputText !== undefined, "Output generation failed");
    return {code: outputText, map: options.sourceMap ? res.sourceMaps : ''};
}

module.exports = function() {
    this.filter("ts", function(data, options) {
        const res = transpile(data.toString(), options);
        return {code: res.code, map: res.map, ext: ".js"};
    });
};