const ts = require("typescript");

function transpile(input, compilerOptions) {
    var options = compilerOptions;
    options.isolatedModules = true;
    options.allowNonTsExtensions = true;
    options.noLib = true;
    options.noResolve = true;

    var inputFileName = 'module.ts';
    var sourceFile = ts.createSourceFile(inputFileName, input, options.target);
    var outputText;
    var compilerHost = {
        getSourceFile: function (fileName, target) { return fileName === inputFileName ? sourceFile : undefined; },
        writeFile: function (name, text, writeByteOrderMark) {
            outputText = text;
        },
        getDefaultLibFileName: function () { return "lib.d.ts"; },
        useCaseSensitiveFileNames: function () { return false; },
        getCanonicalFileName: function (fileName) { return fileName; },
        getCurrentDirectory: function () { return ''; },
        getNewLine: function () { return ts.getNewLineCharacter(options); }
    };
    var program = ts.createProgram([inputFileName], options, compilerHost);
    // Emit
    program.emit();
    ts.Debug.assert(outputText !== undefined, "Output generation failed");
    return outputText;
}

module.exports = function() {
    this.filter("ts", function(data, options) {
        return transpile(data.toString(), options, options.fileName);
    }, { ext: ".js" });
};