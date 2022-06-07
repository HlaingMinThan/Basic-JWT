const express=require('express');
const jwt=require('jsonwebtoken');

const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:'hello'
    });
});
app.post('/api/posts',(req,res)=>{
    //create post and store in database in here
    res.json({
        message:'post created...'
    });
});

app.listen('3000',()=>{
    console.log('app is running on 3000 port');
});