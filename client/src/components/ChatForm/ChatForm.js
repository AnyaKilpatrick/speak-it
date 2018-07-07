import React, {Component} from "react";

class ChatForm extends Component {

    handleSubmit = event => {
        event.preventDefault();

    }

    render(){
        retunr(
            <form className="chatForm">
                <input type="text" name="author" ref="author" placeholder="Name" required />
                <textarea name="text" ref="text" placeholder="Chat" required></textarea><br/>
                <button type="submit" onClick={this.handleSubmit}>Send</button>
            </form>
        )
    }
}

export default ChatForm;