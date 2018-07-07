import React, {Component} from "react";

class MessagePage extends Component {

    state = {
        author: "Anya",
        text:"",
        chats:[{name: "Anya", msg: "Hello there!"}]

    }
    // componentDidMount = () =>{
    // }

    handleSubmit = (event, callback) => {
        event.preventDefault();
        const chatObj = {
            name: this.state.author,
            msg: this.state.text
        }
        const array = this.state.chats;
        array.push(chatObj);
        this.setState({chats:array}, ()=>{
            console.log("chats "+JSON.stringify(this.state.chats));
        })
        // this.socket.emit("newChat", function (err){
        //     if(err) return console.log("New chat error: "+err)
        //     callback();
        // })

    }
    handleChange = event => {
        const text = event.target.value;
        this.setState({text}, ()=>{
            console.log(this.state.text);
        })
    }

    render(){
        return(
            <div>
                <h1>Messages</h1>
                <h3>Chat:</h3>
                {/* <div className="chatList">
                    {this.state.chats.map((chat)=>{
                        <div className="chat">
                            <h5>yaaay</h5>
                            <span className="author">{chat.name}</span> :<br/>
                            <div className="body">{chat.msg}</div>
                        </div>
                    })}
                </div> */}
                <form className="chatForm">
                    <textarea name="text" value = {this.state.text} onChange={this.handleChange} required></textarea><br/>
                    <button type="submit" onClick={this.handleSubmit}>Send</button>
                </form>
            </div>
        )
    }
}

export default MessagePage;