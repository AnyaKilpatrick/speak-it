const db=require("./models");

module.exports = function(socket){

        socket.on("user is online", function(data){
            console.log(socket.id, "is a user under id", data.userId);
            if(data.userId){
                db.User.findOneAndUpdate({_id: data.userId},{online:true,socketId:socket.id})
                .then((dbUser)=>console.log("New client connected!!!!!!!!!!"))
                .catch(err=>console.log(err));
                // const userObj = {
                //     userId: data.userId,
                //     socketId: socket.id
                // }
                // db.OnlineUser.create(userObj)
                // .then(dbUser=>console.log(dbUser))
                // .catch(err=>console.error(err))
            }
        })
        socket.on("user is offline", function(){
            db.User.findOneAndUpdate({socketId: socket.id}, {online:false, socketId: null})
            .then((dbUser)=>console.log("user disconnected :( !!!"))
            .catch(err=>console.log(err));
            // db.OnlineUser.remove({socketId:socket.id})
            // .then((dbUser)=>console.log("user disconnected :( !!!"))
            // .catch(err=> console.log(err));
        })

        socket.on("disconnect", function(){
            db.User.findOneAndUpdate({socketId: socket.id}, {online:false, socketId: null})
            .then((dbUser)=>console.log("user disconnected :( !!!"))
            .catch(err=>console.log(err));
            // db.OnlineUser.remove({socketId:socket.id})
            // .then((dbUser)=>console.log("user disconnected :( !!!"))
            // .catch(err=> console.log(err));
            
        })

        socket.on("join room", function(data){
            if(data.chatId){
            console.log("Chatroom joined ", data.chatId);
            socket.join(data.chatId);
            }
        })

        socket.on("leave room", function(data){
            if(data.chatId){
                console.log("Left room");
                socket.leave(data.chatId);
            }
        })

        socket.on("send msg", function(data){
            if(data.chatId && data.message && data.name && data.myId) {
                console.log("passed message info to socket.js");
                const object = {
                    authorName: data.name,
                    authorId: data.myId,
                    text:data.message
                }
                console.log("MSG OBJECT", object);
                db.Chat.findOneAndUpdate({_id:data.chatId}, {$addToSet:{"messages":object}})
                .then((dbMessage)=>console.log("successfully added new message",dbMessage))
                .catch(err=> console.log(err));
                // {$addToSet:{"local.friend": req.user._id}}

                socket.broadcast.to(data.chatId).emit("receivedMsg", {msg: data.message});
                socket.emit("receivedMsg", {msg: data.message});
                // io.in(data.chatId).emit("receiveMsg", {msg:data.message});
            }
        })
  };