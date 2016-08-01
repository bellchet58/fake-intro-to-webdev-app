var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var tweets = [
  {text: "Hai dude.", time: new Date().getTime() - 12300},
  {text: "This is cool.", time: new Date().getTime() - 1000},
  {text: "What's up?", time: new Date().getTime()},
];

app.use(express.static(__dirname + '/public'));

app.get('/ajax', (req, resp)=>{
    resp.type('json');
    resp.end(JSON.stringify({tweets: tweets}));
});

app.post('/ajax', (req, resp)=>{
    console.log(req.body.tweet);
    resp.type('json');
    var anotherTweet = {text: req.body.tweet, time: new Date().getTime()};
    tweets.push(anotherTweet);
    resp.end(JSON.stringify(anotherTweet));
});

app.listen(8082, ()=>{
    console.log("fake app is running on port 8082.");
});