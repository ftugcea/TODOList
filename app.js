const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Liste = require('./models/listElement');
const { response } = require('express');

const app = express();
const PORT = 3000;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/TODOdb',
{  
    useNewUrlParser: true, 
    useUnifiedTopology: true 
 }, err => {
    // console.log(err)
 })
 const db = mongoose.connection

 db.on('error', (err) => {
     console.log(err)
 })
 
 db.once('open',() => {
     console.log('Database connection is succesfully!')
 })


app.get('/', (req, res)=>{
    res.status(200);
    res.render("home", {list : list});
});

app.get('/List', (req, res)=>{
    Liste.find({}, (err, works) => {
        res.render("home", {list : works});
    })
    
});

app.post("/add", (req, res)=>{
    
    let newWork = new Liste({
        name: req.body.newWork
    })
    newWork.save()
    .then(response => {
        res.json({
            message: 'New work added succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })
    res.redirect("/List");
});


app.post("/delete", (req, res)=>{

    let name = req.body.name
    Liste.findOneAndRemove(name)
    .then(() => {
        res.json({
            message: 'Item deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
})

app.post("/edit", (req, res)=>{
    let _id = req.body._id
    let updatedData = {
        name: req.body.name
    }
    Liste.findByIdAndUpdate(workID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Item updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
})

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
