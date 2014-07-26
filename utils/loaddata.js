
var personService = require('../services/person');
var projectService = require('../services/project');

function load(filename) {
    if (!filename)
        filename = '../data.json';
        
    var data = require(filename);
    
    data.persons.forEach(function (person) {
        var id = personService.addPerson(person);
    });

    data.projects.forEach(function (projectdata) {
        var team = projectdata.team;
        var periods = projectdata.periods;
        
        var projid = projectService.addProject(project);
    });
}