const express = require('express');
const app = express();
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname,'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render("start");
})
app.get("/test",(req,res)=>{
    res.render("index");
})
app.post('/news',(req,res)=>{
    var options = {
        url : "https://newsapi.org/v2/everything?apiKey=fbefc601f21e4742ab074cf42a8fb2a1",
        qs : {
            q : req.body.search
        }
    }
    request(options,(err,resp,body)=>{
    //console.log(resp.status);
    console.log(JSON.parse(body).articles.length);
    res.render('index', {articles : JSON.parse(body).articles});
})
})


app.listen(8080);