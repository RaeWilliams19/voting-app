import React, { Component } from 'react'

export default class Chat extends Component {
    state = {
        name: '',
        message: '',
    }

    handleInputChange = (event) => {
        const value = event.target.value; 
        this.setState({ name: value })
    }

    //FIX 
    handleTextareaChange = (event) => {
        const value = event.target.value; 

        this.setState({ message: value})

        console.log(this.state)
    }

    handleKeyDown = (event) => {
        const {socket} = this.props

        if(event.key === "Enter") {
            //emit to server input
            socket.emit('input', {...this.state});
            console.log("enter key pressed")
        }
    }

    render() {

        const { messages } = this.props

        return (
            <div id="chat">
                <input type="text" id="username" className="form-control" placeholder="Enter name..." value={this.state.name} onChange={this.handleInputChange} />
                <br />
                <div className="card">
                    <div id="messages" className="card-block" style={{ height: 300, overflow:"auto", padding: 10 }}>
                        {messages.length ? (
                            messages.map((item, index) => <div className="chat-message" key={`id_${index}`}>{item.name + ": " + item.message}</div>)
                        ) :
                            null
                        }
                    </div>
                </div>
                <br />
                <textarea id="textarea" className="form-control" placeholder="Enter message..." onChange={this.handleTextareaChange} onKeyDown={this.handleKeyDown}></textarea>
            </div>
        )
    }
}
