'use strict';

var controller = require('../controllers/dcategory');

var loaddata = require('../utils/loaddata');
var db = require('../utils/db');
var async = require('simpleasync');

var projects;

var catid;

exports['clear and load data'] = function (test) {
    test.async();
    
    var projectService = require('../services/project');
    
    async()
    .then(function (data, next) { db.clear(next); })
    .then(function (data, next) { loaddata(next); })
    .then(function (data, next) { projectService.getProjects(next); })
    .then(function (data, next) {
        projects = data;
        test.ok(projects);
        test.ok(projects.length);
        test.done();
    })
    .run();
};

exports['get index'] = function (test) {
    test.async();
    
    var request = {
        params: {
            projectid: projects[0].id
        }
    };
    var response = {
        render: function (name, model) {
            test.ok(name);
            test.equal(name, 'dcategorylist');
            test.ok(model);
            test.equal(model.projectid, projects[0].id);
            test.equal(model.title, 'Decision Categories');
            test.ok(model.items);
            test.ok(Array.isArray(model.items));
            test.ok(model.items.length);
            test.ok(model.items[0].id);
            test.ok(model.items[0].name);
            test.done();
        }
    };
    
    controller.index(request, response);
};

exports['get new decision category'] = function (test) {
    test.async();
    
    var request = {
        params: {
            projectid: projects[0].id
        }
    };
    var response = {
        render: function (name, model) {
            test.ok(name);
            test.equal(name, 'dcategorynew');
            test.ok(model);
            test.equal(model.title, 'New Decision Category');
            test.equal(model.projectid, projects[0].id);
            test.done();
        }
    };
    
    controller.newCategory(request, response);
};

exports['add new decision category'] = function (test) {
    test.async();
    
    var formdata = {
        name: 'New Category'
    }
    
    var request = {
        params: {
            projectid: projects[0].id
        },
        param: function (name) {
            return formdata[name];
        }
    };

    var response = {
        render: function (name, model) {
            test.ok(name);
            test.equal(name, 'dcategoryview');
            test.ok(model);
            test.equal(model.title, 'Decision Category');
            test.ok(model.item);
            test.ok(model.item.id);
            test.ok(model.item.project);
            test.equal(model.item.project, projects[0].id);
            test.equal(model.item.name, 'New Category');
            
            catid = model.item.id;
            
            test.done();
        }
    };
    
    controller.addCategory(request, response);
};

exports['get view decision category'] = function (test) {
    test.async();
    
    var request = {
        params: {
            projectid: projects[0].id,
            id: catid
        }
    };

    var response = {
        render: function (name, model) {
            test.ok(name);
            test.equal(name, 'dcategoryview');
            test.ok(model);
            test.equal(model.title, 'Decision Category');
            test.equal(model.projectid, projects[0].id);
            test.ok(model.item);
            test.equal(model.item.id, catid);
            test.equal(model.item.name, 'New Category');
            test.ok(model.decisions);
            test.ok(Array.isArray(model.decisions));
            
            test.done();
        }
    };
    
    controller.view(request, response);
};
