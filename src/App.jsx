import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = (event) => {
      console.log(event);
      const newMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(newMessage);
      this.setState({messages: newMessages});
    }
  }

  _addMessage = message => {
    this.socket.send(JSON.stringify(message))
  };

    // this.setState(prevState => ({
      //   ...prevState,
      //   messages: [...prevState.messages, message]
      // }));


  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <ChatBar user={this.state.currentUser} addMessage={this._addMessage}/>
        <MessageList messages={this.state.messages}/>
      </div>

    );
  }

}

export default App;
