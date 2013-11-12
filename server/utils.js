var crypto = require('crypto');

/*
exports.getMessage = function(msg){
        console.log(msg);
    }
*/


exports.comparePassword = function(candidatePassword , dbPassword) {
    return Utils.encryptPassword(candidatePassword) === dbPassword;
};


exports.encryptPassword = function(password) {
    return crypto.createHmac('sha256', app.get('secret')).update(password).digest('hex');
};

exports.generateRandomToken = function () {
    var chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        token = new Date().getTime() + '_';
    for ( var x = 0; x < 16; x++ ) {
        var i = Math.floor( Math.random() * 62 );
        token += chars.charAt( i );
    }
    return token;
};