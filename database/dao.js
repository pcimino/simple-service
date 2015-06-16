
    var localDatabase = require('./codes.json');
    
    exports.getAllDAO = function() {
        return localDatabase;
    }
    
    exports.getCodeByMajorDAO = function(major) {
        for (var i = 0; i < localDatabase.length; i++) {
            if (major.toLowerCase() === localDatabase[i].major.toLowerCase()) {
                return localDatabase[i];
            }
        }
        return {'major':major, 'value':[{'minor:':'*', 'description':'Unknown'}]};
    }
    
    exports.getCodeByMajorMinorDAO = function(major, minor) {
        var returnVal = {'major':major, 'value':[{'minor:':minor, 'description':'Unknown'}]};
        for (var i = 0; i < localDatabase.length; i++) {
            if (major.toLowerCase() === localDatabase[i].major.toLowerCase()) {
                for (var j = 0; j < localDatabase[i].value.length; j++) {
                    if (minor.toLowerCase() === localDatabase[i].value[j].minor.toLowerCase()) {
                        returnVal.value[0] = localDatabase[i].value[j];
                        return returnVal;
                    }
                }
            }
        }
        return returnVal;
    }
    exports.delCodeByMajorMinorDAO = function(major, minor) {
        for (var i = 0; i < localDatabase.length; i++) {
            if (major.toLowerCase() === localDatabase[i].major.toLowerCase()) {
                for (var j = 0; j < localDatabase[i].value.length; j++) {
                    if (minor.toLowerCase() === localDatabase[i].value[j].minor.toLowerCase()) {
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
    
    exports.upsertByMajorMinorDAO = function(major, minor, description) {
        var newCode = {'major':major, 'value':[{'minor:':minor, 'description':description}]};
        for (var i = 0; i < localDatabase.length; i++) {
            if (major.toLowerCase() === localDatabase[i].major.toLowerCase()) {
                for (var j = 0; j < localDatabase[i].value.length; j++) {
                    if (minor.toLowerCase() === localDatabase[i].value[j].minor.toLowerCase()) {
                        localDatabase[i].value[j].description = description;
                        return newCode;
                    }
                }
                // got here, no minor value found
                localDatabase[i].value.push({'minor':minor, 'description':description});
                return newCode;
            }
        }
        // got here, new Major code
        localDatabase.push(newCode);
        return newCode;
    }
    
