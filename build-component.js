var fs = require('fs');
var path = require('path');

var testsDir = path.resolve(__dirname, "lib/tests");

var pkg = require('./package.json');

var component = {
    name:pkg.name,
    version:pkg.version,
    scripts:['index.js'],
    dependencies:{
        "timoxley/assert":"*",
        "jamestalmage/sinon":"*"
    }
};


var testFileNames = fs.readdirSync(testsDir);

var s = '';
testFileNames.forEach(function (testFileName) {
    if (path.extname(testFileName) === ".js") {
        var testFilePath = './lib/tests/' + testFileName;
        component.scripts.push(testFilePath);
        s += 'require("' + testFilePath + '");\n';
    }
});
var helperFileNames = fs.readdirSync(path.resolve(testsDir,'helpers'));
helperFileNames.forEach(function (testFileName) {
    if (path.extname(testFileName) === ".js") {
        var testFilePath = './lib/tests/helpers/' + testFileName;
        component.scripts.push(testFilePath);
    }
});

fs.writeFileSync('index.js',s);
fs.writeFileSync('component.json',JSON.stringify(component,4,4));

module.exports= 'done';