var localDatabase = require('../database/codes.json');

exports.findAll = function(req, res) {
    console.log('Find All Codes');
    res.send(localDatabase);
};

exports.findByMajor = function(req, res) {
    console.log('Find Codes mapped to ' + req.params.major);
    res.send(getCodeByMajor(req.params.major));
};

exports.findByMajorMinor = function(req, res) {
    console.log('Find Codes mapped to ' + req.params.major + '.' + req.params.minor);
    res.send(getCodeByMajorMinor(req.params.major, req.params.minor));
};

function getCodeByMajor(major) {
    for (var i = 0; i < localDatabase.length; i++) {
        if (major === localDatabase[i].major) {
            return localDatabase[i];
        }
    }
    return {'major':major, 'value':[{'minor:':'*', 'description':'Unknown'}]};
}

function getCodeByMajorMinor(major, minor) {
    var returnVal = {'major':major, 'value':[{'minor:':minor, 'description':'Unknown'}]};
    for (var i = 0; i < localDatabase.length; i++) {
        if (major === localDatabase[i].major) {
            for (var j = 0; j < localDatabase[i].value.length; j++) {
                if (minor === localDatabase[i].value[j].minor) {
                    returnVal.value[0] = localDatabase[i].value[j];
                    return returnVal;
                }
            }
        }
    }
    return returnVal;
}