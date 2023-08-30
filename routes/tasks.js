const express = require('express')
const { deleteOne, findById, findByIdAndRemove } = require('../models/task')
const router = express.Router()

const Task = require('../models/task')

// CORS middleware
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your allowed origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/get', async(req, res) => {
  // res.send('Get request')
  try{
    const tasks = await Task.find()
    res.json(tasks)
  }catch(err){
    res.send('Error ' + err)
  }
})
// for one perticular alien
router.get('/:id', async(req, res) => {
  //res.send('Get request')
  try{
    const task = await Task.findById(req.params.id)
    res.json(task)
  }catch(err){
    res.send('Error ' + err)
  }
})

// how to write post request so that we can recieve data from user and save it in our database
router.post('/post', async(req, res) => {
  console.log("see");
  const task = new Task({
    task: req.body.task,
    time: req.body.date,
    catagory: {
      URGIMP: req.body.URGIMP,
      NOTURGIMP: req.body.NOTURGIMP,
      URGNOTIMP: req.body.URGNOTIMP,
      NOTURGNOTIMP: req.body.NOTURGNOTIMP
    }
  })
  console.log("Data Recieved.....")
  try{
    // to save data in database 
    const a1 = await task.save()
    // to tell user that data is saved i have saved data in a1 and will show 
    res.json(a1)
  }catch(err){
    res.send("Error 555")
  }
  console.log("Data Saved.....")
})

router.patch('/delete/:id', async(req, res) => {
  try{
    await Task.findByIdAndUpdate(req.params.id, {"task": req.body.task, "time": req.body.time, "catagory": {
      "URGIMP": req.body.URGIMP,
      "NOTURGIMP": req.body.NOTURGIMP,
      "URGNOTIMP": req.body.URGNOTIMP,
      "NOTURGNOTIMP": req.body.NOTURGNOTIMP
    }})
    const st = await Task.findById(req.params.id)
    res.send(st)
  }catch(err){
    res.send('Error', err)
  }
})

router.put('/put/:id', async(req, res) => {
  try{
    await Task.findByIdAndUpdate(req.params.id, {"task": req.body.task, "time": req.body.date, "catagory": {
      "URGIMP": req.body.URGIMP,
      "NOTURGIMP": req.body.NOTURGIMP,
      "URGNOTIMP": req.body.URGNOTIMP,
      "NOTURGNOTIMP": req.body.NOTURGNOTIMP
    }})
    const st = await Task.findById(req.params.id)
    res.send(st)
  }catch(err){
    res.send('Error', err)
  }
})

router.delete('/delete/:id', async(req, res) => {
  try{
    const st = await Task.findByIdAndDelete(req.params.id)
    res.send(st)
  }catch(err){
    res.status(200)
  }
})

// To delete all the documents
// router.delete('/', async(req, res) => {
//   try{
//     const st = await Task.findByIdAndDelete(req.params.id)
//     res.send(st)
//   }catch(err){
//     res.status(200)
//   }
// })

module.exports = router