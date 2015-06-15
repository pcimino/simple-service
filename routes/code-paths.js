var db = require('../database/dao.js');

exports.findAll = function(req, res) {
    console.log('Find All Codes');
    console.log(db);
    res.send(db.getAllDAO());
};

exports.findByMajor = function(req, res) {
    console.log('Find Codes mapped to ' + req.params.major);
    res.send(db.getCodeByMajorDAO(req.params.major));
};

exports.findByMajorMinor = function(req, res) {
    console.log('Find Code mapped to ' + req.params.major + '.' + req.params.minor);
    res.send(db.getCodeByMajorMinorDAO(req.params.major, req.params.minor));
};

exports.addUpdateMajorMinor = function(req, res) {
    console.log('Upsert code ' + req.params.major + '.' + req.params.minor + ' : ' + req.params.description);
    res.send(db.upsertByMajorMinorDAO(req.params.major, req.params.minor, req.params.description));
};

exports.deleteMajorMinor = function(req, res) {
    console.log('Delete code mapped to ' + req.params.major + '.' + req.params.minor);
    res.send(db.delCodeByMajorMinorDAO(req.params.major, req.params.minor));
};

