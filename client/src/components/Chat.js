import React, { Component } from 'react'

export default class Chat extends Component {
    state = {
        name: '',
        messaage: '',
    }

    handleInputChange = (event) => {
        const value = event.target.value; 
        this.setState({ name: value })
    }

    //FIX 
    handleTextareaChange = (event) => {
        const { socket } = this.props;
        const value = event.target.value; 

        this.setState({ message: value})

            if (event.which === 13 && event.shiftKey === false) {
                //emit to server input
                socket.emit('input', {...this.state});

                event.preventDefault();
            }
    }

    render() {

        const { messages } = this.props

        return (
            <div id="chat">
                <p>{this.state.name}</p>
                <input type="text" id="username" className="form-control" placeholder="Enter name..." value={this.state.name} onChange={this.handleInputChange} />
                <br />
                <div className="card">
                    <div id="messages" className="card-block" style={{ height: "300px" }}>
                        {messages.length ? (
                            messages.map((item, index) => <div className="chat-message" key={`id_${index}`}>{item.name + ": " + item.message}</div>)
                        ) :
                            null
                        }
                    </div>
                </div>
                <br />
                <textarea id="textarea" className="form-control" placeholder="Enter message..." onChange={this.handleChange}></textarea>
            </div>
        )
    }
}
