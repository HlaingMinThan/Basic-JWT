const jwt=require('jsonwebtoken');
const SECRET_KEY='secretkey';
const express=require('express');
const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:'hello'
    });
});
app.post('/api/posts',checkTokenExists,(req,res)=>{
    console.log('hit this line')
    jwt.verify(req.token,SECRET_KEY,(err,decodedPayload)=>{
        if(err){
            return res.status(403).json({
                'message':'invalid token'
            });
        }
        //create post and store in database in here
        res.json({
            message:'post created...',
            user:decodedPayload
        });
    });
});

app.post('/api/login',(req,res)=>{
    // authenticate user and get user 
    let user ={
        id:1,
        name : 'Hlaing Min Than',
        'email':'hlaingminthan92@gmail.com'
    };

    jwt.sign({user},SECRET_KEY,{expiresIn:'30s'},(err,token)=>{
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