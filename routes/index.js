var express = require('express')
var app = express()
var request=require('request');
var cheerio=require('cheerio');
/**
 * Cheerio is for parseing HTML elements
 * Request is for makeing  http calls
 */ 

app.post('/webscrap', function(req, res, next)
{	
    //Validate post element url
    req.assert('url', 'Url is required').notEmpty()           
	
    var errors = req.validationErrors()
    
    if( !errors ) 
    {   //No errors were found.  Passed Validation!

	var title = "";
        var metaDescription = "";
        var results = [];
        var url=req.sanitize('url').trim();
 	request(url,function(error,response,html)
       {
     
            if(!error)
              {
     	        var $=cheerio.load(html);
                title = $("title").text();
                metaDescription =  $('meta[name=description]').attr("content");
                $("img").each(function(i, image) 
                {
         // resolve absolute image URL and add to our results array
                   results.push($(image).attr('src'));
                });
                //Showing the result in json format
                res.json({ title: title,description:metaDescription,images:results })
              }
              else
                  //Showing error in json format
                res.json({error:error});	
        });


    }
    else 
    {   
        // Showing validation errors
	res.json(errors);

		
    }
})
/** 
 * We assign app object to module.exports
 * 
 * module.exports exposes the app object as a module
 * 
 * module.exports should be used to return the object 
 * when this file is required in another module like app.js
 */ 
module.exports = app;
