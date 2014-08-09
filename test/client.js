
var client = require('../public/scripts/client.js');

exports['get my projects'] = function (test) {
    var result = client.getMyProjects();
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
}

exports['get first project'] = function (test) {
    var result = client.getProject(1);
    test.ok(result);
    test.ok(result.id);
    test.ok(result.name);
    test.equal(result.id, 1);
}

exports['get periods from first project'] = function (test) {
    var result = client.getPeriods(1);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
}

exports['get periods from second project'] = function (test) {
    var result = client.getPeriods(2);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
}

exports['get shareholders from first project'] = function (test) {
    var result = client.getShareholders(1);
    test.ok(result);
    test.ok(Array.isArray(result));
    test.ok(result.length);
}

