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
    console.log('Find Code mapped to ' + req.params.major + '.' + req.params.minor);
    res.send(getCodeByMajorMinor(req.params.major, req.params.minor));
};

exports.addUpdateMajorMinor = function(req, res) {
    console.log('Add/Update code ' + req.params.major + '.' + req.params.minor + ' : ' + req.params.description);
    res.send(getCodeByMajorMinor(req.params.major, req.params.minor));
};

exports.deleteMajorMinor = function(req, res) {
    console.log('Delete code mapped to ' + req.params.major + '.' + req.params.minor);
    res.send(delCodeByMajorMinor(req.params.major, req.params.minor));
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
function delCodeByMajorMinor(major, minor) {
    for (var i = 0; i < localDatabase.length; i++) {
        if (major === localDatabase[i].major) {
            for (var j = 0; j < localDatabase[i].value.length; j++) {
                if (minor === localDatabase[i].value[j].minor) {
                    localDatabase[i].value.splice(j, 1); // remove element
                    if (localDatabase[i].value.length === 0) {
                        // no more minor, remove major
                        localDatabase.splice(i, 1); // remove element
                    }
                    return {'message':'Code ' + major + '.' + minor + ' deleted.'};
                }
            }
        }
    }
    return {'message':'Code ' + major + '.' + minor + ' not found.'};
}