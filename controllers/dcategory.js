'use strict';

var service = require('../services/dcategory');
var async = require('simpleasync');

function index(req, res) {
    var projectid = req.params.projectid;
    
    service.getCategoriesByProject(projectid, function (err, items) {
        if (err)
            throw err;
            
        res.render('dcategorylist', { title: 'Decision Categories', items: items });
    });
}

module.exports = {
    index: index
};
