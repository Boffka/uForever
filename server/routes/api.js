
/*
 * GET home page.
 */

var forever = require('forever');
var testObj = {'name':'test123'};
var moment = require('moment');
var fs = require('fs');
var Store = require('jfs')
    ,uDb = new Store(process.cwd()+'/server/db/users.json')
    ,iDb = new Store(process.cwd()+'/server/db/units.json')

exports.restartall = function(req, res){
    console.log(forever);
    //forever.restartAll();
    //res.render('index', { title: 'Express' });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(testObj));
    res.end()
};



exports.restartUnit = function(req,res){
    if(req.params.uid){
        var uid = req.params.uid;
        forever.restart(uid);
        res.json({'restarted': uid});
    } else {

    }
}

exports.stopUnit = function(req,res){
    if(req.params.uid){
        var uid = req.params.uid;
        forever.stop(uid);
        res.json({'stoped': uid});
    } else {
        res.json({'error': 'No UID'});
    }
}


exports.getUnitsFromDB = function(req, res){
    models.Unit.find({},function(err, data){
        console.log('Длинна!!!', data.length);


        data.forEach(function(instance){
            forever.startDaemon(instance.filename, {'sourceDir': instance.sourceDir, 'watch': instance.watch, 'cwd': instance.cwd, 'uid':instance.unitname})
                /*.on('error',function(a,b,c){
                 console.log('forever Error A :::', a);
                 console.log('forever Error B :::', b);
                 console.log('forever Error C :::', c);
                 })*/;
        });
        res.json(data);
    })
}

exports.clearLogFile = function(req,res){
    if(req.body.fname){
        var fname = req.body.fname;
        fs.writeFile(fname, '', function (err) {
            if (err) throw err;
        });
        res.json({'logFileErased': true});
    } else {
        res.json({'error': 'No filename'});
    }
}


exports.createUnit = function(req,res){
    if(req.body){
        var data = {}
        data.unitname = (req.body.unitname)? req.body.unitname : 'No name';
        data.description = (req.body.description)? req.body.description : 'No description';
        data.filename = (req.body.filename)? req.body.filename : '';
        data.sourceDir = (req.body.sourceDir)? req.body.sourceDir : '';
        data.cwd = (req.body.cwd)? req.body.cwd : '';
        data.env = req.body.env;
        data.logFile = (req.body.logFile)? req.body.logFile : '';
        data.spinSleepTime = (req.body.spinSleepTime)? req.body.spinSleepTime : '1000';
        data.minUptime = (req.body.minUptime)? req.body.minUptime : '2000';
        data.watch = (req.body.watch)? true : false;
        data.active = (req.body.active)? true : false;
        data.port = (req.body.port)? req.body.port : '';
        iDb.save(data.sourceDir+data.filename, data, function(err){
            if(err){
                console.log('Error unit create ::',err);
            }
        });
        /*models.Unit.findOne({ 'sourceDir':data.sourceDir,'filename': data.filename}, function(err, data){
            if(!err || !data){
                models.Unit(data).save();
            }
        });*/
        res.redirect('/');
    } else {
        res.json({'error': 'Error'});
    }
}



exports.getInstances = function(req, res){
    if (req.params.uid){

        var uid = req.params.uid;
        switch (uid){
            case "instances":
                forever.list("", function(err,proc){
                    var i = 0;

                    if(proc){
                        proc.forEach(function(){
                            var iDate = moment.duration(moment()-proc[i].ctime);
                            proc[i].uptime = iDate._data;
                            i++;
                        })
                        res.json(proc);
                    }
                    else {
                        res.json({'error':'No Unuts'});
                    }


                });
                break;
            default :
                forever.list("", function(err, proc) {
                    var i=-1;
                    while (proc[++i]) {
                        if (proc[i].uid === uid){
                            var iResp = proc[i];
                            var logfile = fs.readFile(iResp.logFile, 'utf-8', function (err, data) {
                                iResp.logContent = data.split('\n');
                                //console.log(iResp)
                                res.json(iResp);


                            });

                        }
                    };
                });
                break;
        }


    }


}


exports.getUnit = function(req, res){
    if (req.params.uid){
        var uid = req.params.uid;
        switch (uid){
            case "units":
                iDb.all(function(err, units){
                    if(!err){
                        if(units != undefined){
                            res.json(units)
                        } else {
                            res.json({'error':'No units!'});
                        }
                    } else {
                        res.json({'error':'No units!'});
                    }
                });
                break;
            default :
                forever.list("", function(err, proc) {
                    var i=-1;
                    while (proc[++i]) {
                        if (proc[i].uid === uid){
                            var iResp = proc[i];
                            var logfile = fs.readFile(iResp.logFile, 'utf-8', function (err, data) {
                                iResp.logContent = data.split('\n');
                                //console.log(iResp)
                                res.json(iResp);
                            });
                        }
                    };
                });
                break;
        }
    }
}






exports.signup = function(req, res){
    if(req.body){
        models.User.findOne({ username: req.body.username },function(err, usercheck){
            if(!usercheck){
                var signup = [];
                signup.username = (req.body.username) ? req.body.username : '';
                signup.email = (req.body.email) ? req.body.email : '';
                signup.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                signup.password = (req.body.password) ? req.body.password : '';
                //signup.created = moment().format();


                if (signup.password != ''){
                    /*signup.password = generateSha1(signup.password);*/
                }

                //signup.token = generateSha1(signup.ip + signup.username)

                function generateSha1(data){
                    var crypto = require('crypto');
                    var shasum = crypto.createHash('sha1');
                    shasum.update(data);
                    return shasum.digest('hex');
                }
                var user = new models.User({
                    username: signup.username,
                    email: signup.email,
                    ip: signup.ip,
                    //token: signup.token,
                    password : signup.password
                });
                user.save();
                res.redirect('/');
                //res.end();
            }
            else {
                res.redirect('/');
                //res .end();
                console.log('unregistered')
            }
        })
    }
};

exports.startDbUnit = function(req,res){
    console.log(req.body.post);
}

exports.login = function(){
    console.log('login')
}