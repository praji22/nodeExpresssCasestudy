const express = require("express");
const app = new express();
const fs = require('fs');
app.use(express.json());
const data = require('./Hdata.json');
// GET Method
app.get('/hospital',(req,res)=>{
    res.send(data);
 })

// POST Method
app.post('/hospital',(req,res)=>{
    data.push(req.body);
    fs.writeFile('Hdata.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Data can not be written");
        }
        else{
            res.send("Data written Successfully!");
        }
    })

})

// PUT Method
app.put('/hospital/:name',(req,res)=>{
    let name = req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName==name){
            item.hospitalLocation = req.body.hospitalLocation;
            item.patientCount = req.body.patientCount;
        }
    })

fs.writeFile('Hdata.json',JSON.stringify(data),(err,resp)=>{
    if(err){
        res.send("Data could not be updated");
    }
    else{
        res.send("Data updated");
    }
})
})
// DELETE Method
app.delete('/hospital/:name',(req,res)=>{
    let name = req.params.name;
    let value = data.filter(item =>item.hospitalName!== name);
    fs.writeFile('Hdata.json',JSON.stringify(value),(err,resp)=>{
        if(err){
            res.send("Data can not be deleted");
        }
        else{
            res.send("Data deleted");
        }
    })

})
app.listen(3000);
console.log("server is listening");