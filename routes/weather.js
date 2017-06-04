const express = require('express');
const querystring = require("querystring");
const unirest = require('unirest');
const http = require("http");
const router = express.Router();

router.post('/value',(req,res,next)=>{
    let vars;
    let jsonres;
    console.log(req.body);   

    var country = encodeURIComponent(req.body.country.trim());
    
    unirest.get("https://restcountries-v1.p.mashape.com/name/"+country)
    .header("X-Mashape-Key", "ErVWBXg7YZmshMduWiQRDz2zd8sQp170x4njsnoxoExN7XO8Ia")
    .header("Accept", "application/json")
    .end(function (result) {    
      var reqBody = {'currency':result.body[0].currencies[0]};
      console.log(reqBody);  
      res.json(reqBody);
    });
});

module.exports = router;