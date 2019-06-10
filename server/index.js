const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongodb = require('mongodb').MongoClient;

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

server.listen(port, () => console.log(`Listening on port ${port}`));

//Connect to mongoDB
mongodb.connect('mongodb://127.0.0.1/mongochat', { useNewUrlParser: true }, function(err, db){
  if(err){
    throw err;
  }
  
  console.log('MongoDB connected...')
  
  //Connect to Socket.io
  io.on('connection', function () {
    let chat = db.collection('chats'); //Change to questions later

    //Create function to send status
    sendStatus = function(s){
      socket.emit('status', s);
    }

    //Get q's from mongoDB
    chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
      if(err){
        throw err
      }

      //Emit q's
      socket.emit('output', res);
    })

    //Handle input events
    socket.on('input', function(data){
      let name = data.name;
      let message = data.message;

      //Check for name and mssg
      if(name === '' || message === ''){
        //Send error status
        sendStatus('Please enter a name and message')
      } else {
        //Insert mssg
        chat.insert({name: name, message: message, function(){
          io.emit('output', [data])

          //Send status
          sendStatus({
            message: 'Message sent',
            clear: true
          })

        }})
      }
    });

    //Handle clear
    socket.on('clear', function(data){
      //Remove all chats from collection
      chat.remove({}, function(){
        //Emit cleared
        socket.emit('Cleared');
      })
    })

  });
});




