import React, {Component} from "react";

class ChatList extends Component {
    render(){
        return(
			<div className="chat">
				<span className="author">{this.props.author}</span> :<br/>
				<div className="body">{this.props.text}</div>
			</div>
        )
    }
}
 export default ChatList;
// var ChatList = React.createClass({
// 	render: function () {
// 		var Chats = (<div>Loading chats...</div>);
// 		if (this.props.chats) {
// 			Chats = this.props.chats.map(function (chat) {
// 				return (<Chat chat={chat} />);
// 			});
// 		}
// 		return (
// 			<div className="chatList">
// 				{Chats}
// 			</div>
// 		);
// 	}
// });
