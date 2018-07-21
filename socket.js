const db=require("./models"); //requiring db models

module.exports = function(socket){
        //when user logs in find a user in db by id and update it
        //storing current socket id and setting "online" to true
        socket.on("user is online", function(data){
            console.log(socket.id, "is a user under id", data.userId);
            if(data.userId){
                db.User.findOneAndUpdate({_id: data.userId},{online:true,socketId:socket.id})
                .then((dbUser)=>console.log("New client connected!!!!!!!!!!"))
                .catch(err=>console.log(err));
            }
        })
        //when user logs out, or when connection got lost by closing a page,  find a user in db by id and update it
        //removing socket id and setting "online" to false
        socket.on("user is offline", function(){
            db.User.findOneAndUpdate({socketId: socket.id}, {online:false, socketId: null})
            .then((dbUser)=>console.log("user disconnected :( !!!"))
            .catch(err=>console.log(err));
        })
        //when connection got lost by closing a page,  find a user in db by id and update it
        //removing socket id and setting "online" to false
        socket.on("disconnect", function(){
            db.User.findOneAndUpdate({socketId: socket.id}, {online:false, socketId: null})
            .then((dbUser)=>console.log("user disconnected :( !!!"))
            .catch(err=>console.log(err));  
        })
        //when user opens a chat, join a room under a name that matches this chat id
        socket.on("join room", function(data){
            if(data.chatId){
            console.log("Chatroom joined ", data.chatId);
            socket.join(data.chatId);
            }
        })
        //when user leaves direct chat, leave socket chat room
        socket.on("leave room", function(data){
            if(data.chatId){
                console.log("Left room");
                socket.leave(data.chatId);
            }
        })
        //when user sends a message, we grab message data passes as an argument, and saving message object in db
        //adding to an array of previous messages
        socket.on("send msg", function(data){
            if(data.chatId && data.message && data.name && data.myId && data.country) {
                console.log("passed message info to socket.js");
                const object = {
                    authorName: data.name,
                    authorId: data.myId,
                    authorCountry: data.country,
                    text:data.message
                }
                console.log("MSG OBJECT", object);
                db.Chat.findOneAndUpdate({_id:data.chatId}, {$addToSet:{"messages":object}})
                .then((dbMessage)=>console.log("successfully added new message",dbMessage))
                .catch(err=> console.log(err));

                //beside saving a message to db..
                //we pass a msg information to another client and back to user to display it in real time on screen of both users of this chat
                socket.broadcast.to(data.chatId).emit("receivedMsg", object);
                socket.emit("receivedMsg", object);
            }
        })
  };