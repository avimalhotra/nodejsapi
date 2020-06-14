var express=require("express");
var app=express();
var path=require('path');
const nunjucks=require("nunjucks");
const db=require('./dao');
const Pin=require('./models/pin');

app.use(express.static('src/public'));
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

var data=["sun","mon","tues","wed","thurs","fri","sat"];

app.get('/',(req,res)=>{
    res.render('index.html')
});

app.get('/api',(req,res)=>{
    res.header('Access-Control-Allow-Origin',"*");
    return res.send(data);
});

app.get('/pincode',(req,res)=>{
    var pin=req.query.pincode;
    Pin.find({pincode:pin}, (err, data) => {
        if (err) {
            res.render('error.html', { errorMessage: err.message });
        }
        else {
           
            res.render('pincode.html', { data: data });
        }
    });
   
});

app.listen(3000,()=>{
    console.log(`server running at http://127.0.0.1:3000`)
})