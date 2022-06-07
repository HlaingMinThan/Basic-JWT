const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:'hello'
    });
});
app.post('/api/posts',checkTokenExists,(req,res)=>{
    //create post and store in database in here
    res.json({
        message:'post created...'
    });
});

app.post('/api/login',(req,res)=>{
    // authenticate user and get user 
    let user ={
        id:1,
        name : 'Hlaing Min Than',
        'email':'hlaingminthan92@gmail.com'
    };

    jwt.sign({user},'secretkey',(err,token)=>{
        res.json({
            token
        });
    })
});

function checkTokenExists(req,res,next){
    let bearerToken=req.headers['authorization'];//Bearer <token>
    //check bearer authorization token included in request
    if(!bearerToken){
        return res.status(403).json({
            'message':'token is required'
        });
    }
    req.token=bearerToken.split(' ')[1]//<token>
    next()
}

app.listen('3000',()=>{
    console.log('app is running on 3000 port');
});