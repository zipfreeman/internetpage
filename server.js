const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var dir = __dirname + '/public'
var app = express();
    app.set('view engine', 'hbs');

    // app.use((req, res, next) => {
    //   res.render('maintainence.hbs', {
    //     currentYear: new Date().getFullYear(),
    //   });
    // });
    app.use(express.static(dir));
    app.use((req, res, next) => {
      var test = {
        ip: req.ip,
      }
      var written = '\n\n' + Date() + ': \n' + JSON.stringify(test, null, 2);
      fs.appendFile('request.json', written, 'utf8', (err) => {
        if(err){
          console.log('fuck')
        }
      })
      next()//without this the whole app gets stuck...
    })
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('makeTonsOfBR', (num) => {
  var space = '';
  for(let i = num; i > 0; i--){
    space += '<br>';
  }
  // return new hbs.handlebars.SafeString(space);//also can do {{{ helperName }}} in the html
  return space;
})
console.log('dirname', dir);

/*app.get('/', (req, res) => {
  //Content-Type; text/html; charset utf-8
  res.send('public:', dir)
})*/
app.get('/', (req, res) => {
  res.render('home.hbs', {//render this file from 'views' dir
    pageTitle: 'Home page',
    // q1: ['What is this page about?', 'This page is about nothing'],//can't access the array
    imagePath: '../images/battlestar.jpg',
    currentYear: new Date().getFullYear(),
  })
})

app.get('/about', (req, res) => {
  // res.send('<h1>about page</h1>')//sends static data out
  res.render('about.hbs', {
    pageTitle: 'E V E R Y T H I N G',
    q1: 'What is this page about?',
    a1: 'This page is about nothing',
    imagePath: '../images/kramer.jpg',
    currentYear: new Date().getFullYear(),
  })
})

app.get('/secret', (req, res) => {
  res.render('secret.hbs', {//render this file from 'views' dir
    pageTitle: 'eScetr gaPe',
    currentYear: new Date().getFullYear(),
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'oops'
  })

})



app.listen('3000', () => {
  console.log('server do')
});
