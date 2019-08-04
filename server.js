'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')


// require and use "multer"...
//Require and using multer here.  We are using buffer storage per documentation.
//This is for assignment demonstration purposes so it suits our purposes.
var multer = require('multer');
var storage = multer.memoryStorage()
//This line denotes we will be using buffer storage.
var upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

//Our post request for /api/fileanalyse.  We're uploading a single file, 'upfile' per assignment declaration.
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  //Grab the file upload data here.
  const file = req.file
  //If there is no file data we're going to throw an error and return it to the user.
  if (!file) {
    const error = new Error("Please select a file to upload.")
    return next(error)
  }
  else {
    //We are returning in JSON like the example these three field types.
    //I am not worried about buffer memory as this is only a small assignment, but per research it appears that multer clears this buffer memory almost instantly anyway.
    res.json({name: file.originalname, type: file.mimetype, size: file.size})
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
