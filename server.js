const express = require('express');
const fs = require('fs'); //gives access to our computer's file system
const request = require('request');
const cheerio = require('cheerio');//JQuery for node.js. makes iteasy to select, edit and view dom elements.
const timestamp = require('time-stamp');
const app = express();

app.get('/scrape', function(req, res){

url = 'https://www.publicdomainpictures.net/en/browse-author.php?a=15960';

request(url, function(error,response,html){
  
  if(!error) {

    // utilize the cheerio library on the returned html which will 
    //essentially give us jQuery functionality
     var $ = cheerio.load(html);
     
     //define the variables we want to capture

     var downloads, picnumber, time;
     var json = { downloads : "", picnumber : "", time: ""};

      $('.tab').filter(function(){
        
        var data = $(this);

        downloads = data.children().eq(1).text();
    
        json.downloads = downloads;

        picnumber = data.children().eq(3).text();

        json.picnumber = picnumber;

        })
       
       var time = timestamp('YYYY/MM/DD:mm:ss');//add timestamp
       json.time = time;

      }

     fs.writeFile('output.json', JSON.stringify(json, null,4), function(err){
      console.log('File successfully written! Check the output.json file');
     })

     res.send('The latest scrape is:')

  })//end of scrape request

})//end of get request

app.listen('8088')

console.log('Listening port 8088');

exports = module.exports = app;
