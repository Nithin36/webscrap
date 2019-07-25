var express = require('express')
var app = express()
var request=require('request');
var cheerio=require('cheerio');


app.post('/webscrap', function(req, res, next){	
	req.assert('url', 'Url is required').notEmpty()           //Validate name
	
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!

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
      $("img").each(function(i, image) {

//         // 6. resolve absolute URL and add to our results array
         results.push($(image).attr('src'));
     });
 res.json({ title: title,description:metaDescription,images:results })
     }
     else
     res.json({error:error});	
 });


	}
	else {   //Display errors to user
		// var error_msg = ''
		// errors.forEach(function(error) {
		// 	error_msg += error.msg + '<br>'
		// })				
		//req.flash('error', error_msg)		
		res.json(errors);

		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
     
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
