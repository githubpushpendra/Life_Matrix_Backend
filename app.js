const express = require('express')
const mongoose = require('mongoose');
const { taskSchema } = require('./models/task');

const app = express() // to start the express framework

// URL of cloud database /////////////////////////////////

// const urlDB = 'mongodb+srv://Pushpendra:Krishna123@cluster0.psvm31p.mongodb.net/NewDB'
// mongodb+srv://Pushpendra:<password>@cluster0.psvm31p.mongodb.net/
const urlDB = 'mongodb://0.0.0.0:27017/newDB'
///////////////////////////////

mongoose.connect(urlDB, {useNewUrlParser:true}); // {useNewUrlParser:true} it is used to avoid one warning
//mongoose.createConnection(urlDB);

const con = mongoose.connection // hold on the connection
//when con will get connetion then following function will be called and we come to know
con.addListener('open', () => { // it has three types open, close, error
  console.log('connected....') // on can be used instead of addListner
})

app.use(express.json())

const taskRouter = require('./routes/tasks')
app.use('/', taskRouter) // for all the requests for 'aliens' you have to send request for 'alienRouter'

// Defining User model
const userSchema = new mongoose.Schema({taskSchema}, {collection: 'Krsna'})
const User = mongoose.model('User', userSchema); 
User.createCollection().then(function(collection) {
  console.log('Collection is created!');
});

app.listen(3000, () => {
  console.log('server is running')
})