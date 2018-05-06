var express = require('express');
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });

var app = express();

var Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//process.env 是环境变量
app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    res.locals.showTests = (app.get('env') !== 'production') && (req.query.test === '1');
    if (res.locals.showTests) {
        console.log('测试模式启动');
    } else {
        console.log('测试模式关闭');
    }
    next();
});

//状态码200为默认状态，不需要指定
app.get('/', function(req, res) {
    res.render('home')
});

app.get('/about', function(req, res) {
    var randomDay = Days[Math.floor(Math.random() * Days.length)];
    res.render('about', {
        day: randomDay,
        pageTestScript: '/qa/tests-about.js'
    });
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

// app.use为中间件，目前暂时理解为 前面路由如果都不匹配，则执行下面代码
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.use(function(req, res) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('App is running!');
});