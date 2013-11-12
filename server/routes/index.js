exports.index = function(req, res){
    if (req.isAuthenticated()){
        res.render('index');
    } else {
        res.redirect('/login');
    }
};

exports.signup = function(req, res){
    res.render('signup', { title: 'NRJWorker' });
};


exports.login = function(req, res){
    res.render('login', { title: 'NRJWorker' });
};