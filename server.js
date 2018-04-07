const express = require('express');
const fs = require('fs'); //gives access to our computer's file system
const request = require('request');
const cheerio = require('cheerio');//JQuery for node.js. makes iteasy to select, edit and view dom elements.
const timestamp = require('time-stamp');
const app = express();

app.get('/scrape', function(req, res){

url = 'https://www.publicdomainpictures.net/en/browse-author.php?a=15960';

request(url, function(error,response,html){
  
  if(!error && response.statusCode == 200) {

    // utilize the cheerio library on the returned html which will 
    //essentially give us jQuery functionality
     const $ = cheerio.load(html);
     
     //define the variables we want to capture

     var downloads, picnumber, date;
     var json = { downloads : "", picnumber : "", date: ""};

      $('.tab').filter(function(){
        
        var data = $(this);

        downloads = data.children().eq(1).text();
        json.downloads = downloads;

        picnumber = data.children().eq(3).text();
        json.picnumber = picnumber;

        })
       
       var date = timestamp('YYYY:MM:DD');//add timestamp
       json.date = date;


      }

     fs.writeFile('output.json', JSON.stringify(json, null,4), function(err){
      console.log('File successfully written! Check the output.json file');
     })

     res.send('The latest scrape is:')

  })//end of scrape request

})//end of get request

app.listen('8080')

console.log('Listening on port 8080');

exports = module.exports = app;
