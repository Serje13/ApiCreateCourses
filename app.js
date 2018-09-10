var express = require ('express');
var bodyParser = require('body-parser')
var courses = require('./data/courses.json')
var app = express();

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));


app.get('/', function (req, res) {
  res.render('index', {title: 'API'});
});

app.get('/api/courses', function (req, res) {
  res.render('courses', {
    title: 'Api Курсы',
    courses: courses
  });
});

app.get('/api/courses/add', function (req, res) {
  res.render('add');
});

app.post('/api/courses/add', function (req, res) {
  var course = {
    name: req.body.name,
    id: Date.now()
  };
  //console.log(course);
  courses.push(course); 

  res.redirect('/api/courses/');
});

app.get('/api/courses/edit/:id', function (req, res) {
var course = courses.find(function(course) {
  return course.id === parseInt(req.params.id);
  });
  
  if (!course) {
    res.sendStatus(404);
    return;
  }

  res.render('edit', {course: course});
});

app.post('/api/courses/edit/:id', function (req, res) {
  var course = courses.find(function(course) {
    return course.id === parseInt(req.params.id);
  });
  if (!course) {
    res.sendStatus(404);
    return;
  }
  course.name = req.body.name;
  res.redirect('/api/courses');
});

app.get('/api/courses/delete/:id', function (req, res) {
    course = courses.filter(function(course) {
    return course.id !== parseInt(req.params.id);
  });

res.redirect('/api/courses');
});

app.listen(3000, function () {
  console.log('Example app listenimg on port 3000!');
});