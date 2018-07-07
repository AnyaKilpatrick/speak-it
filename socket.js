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
  };