var express = require('express');
var app = express();
var superagent = require('superagent');
var cheerio = require('cheerio');

app.get('/', function(req, res){
  superagent.get('https://cnodejs.org/').end(function(err, result){
    console.log(result);
    var $ = cheerio.load(result.text);
    var items = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });

      res.send(items);
  });
});
app.listen(8080);
console.log('Server has started at 8080');
