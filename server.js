const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + req.method + req.url;
  fs.appendFile("server.log", log + '\n', (err) => {
    if(err){
      console.log("error");
    }
  });
  console.log(log);
  next();
});


// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
  //res.send("<h1>Hello express!</h1>");
  res.render('home.hbs', {
    pageTitle: "Home page",
    //currentYear: new Date().getFullYear(),
    welcomeMessage: "Welcome to our website!!!!!!!!!"
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: "About page"//,
    //currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Projects"
  });
});



app.listen(port);
