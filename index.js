const { response, request } = require('express');
const res = require('express/lib/response');
const bodyparser = require("body-parser");
require('dotenv/config')
const express = require('express');
const app = express();
const todoModel = require('./models/todo_model');
const mongoose  = require('mongoose');
const { add } = require('nodemon/lib/rules');

app.use(bodyparser.json());

app.get('/',(request,response)=>{
    response.send("second API");
});
app.post('/todo', async (req, res)=> {
    const todo =todoModel.create({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        endDate: req.body.endDate,
    });
    try {
       const savetodo = await  todo.save();
       res.json({
           data: savetodo,
           message: "Saved"
       })
    } catch (error) {
        res.json({
                    message: error

        });
    }
});
app.get('/todos',(req,res)=>
{try {
    const getData = todoModel.find();
    res.json({
        data: getData,
        message: "success"
    })
} catch (error) {
    res.json({
        message:error
    })
    
}});
app.get('/todos/:todoId', async(req,res)=>
{try {
    const getData = await todoModel.findById({_id: req.body.todoId});
    res.json({
        data: getData,
        message: "success"
    })
} catch (error) {
    res.json({
        message:error
    })
    
}});
app.delete('/todos/:todoID', async (req,res)=>{
    try {
       const deleToDo = await todoModel.findOneAndDelete({_id: req.params.todo});
       res.json({
           data: deleToDo,
           message: "Todo Deleted Successfully"
       })
    } catch (error) {
        res.json({
            message: error 

        })
    }
});
app.patch('/todos/:todoID', async (req, res)=>{
    try {
        const awaitResult = await todoModel.findOneAndUpdate({_id: req.params.todoID}, {$set:{
            title: req.body.title,
            status: req.body.status,
            body: req.body.body,
            

         } });
         res.json({
             data: awaitResult,
             message: "updated"
         })
         
    } 
    catch (error) {
        res.json({
            message: error 
            
        })
}})
// app.post('/',(req,res)=>{
//     console.log(req,res);
// });

mongoose.connect(process.env.db_url, ()=>console.log('Connected Successfully'));



app.listen(1990);
