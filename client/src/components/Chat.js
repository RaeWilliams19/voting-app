import React, { Component } from 'react'

export default class Chat extends Component {
    state = {
        name: '',
        message: '',
        alert: false
    }

    messagesEndRef = React.createRef()

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    componentDidMount = () => {
        this.scrollToBottom()
    }

    componentDidUpdate = () => {
        this.scrollToBottom()
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        this.setState({ name: value, alert: false })
    }

    handleTextareaChange = (event) => {
        const value = event.target.value;
        this.setState({ message: value })
    }

    handleKeyDown = (event) => {
        const { socket } = this.props

        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            //emit to server input
            socket.emit('input', { ...this.state, date: new Date().toLocaleString() });
            event.target.value = ''
            this.setState({ message: event.target.value })
        }
    }

    handleBlur = (event) => {
        if(event.target.value === ''){
            this.setState({alert: true})
        } else {
            this.setState({alert: false})
        }
    }

    render() {
        const { messages } = this.props
        return (
            <div id="chat">
                <input type="text" id="username" className="form-control" placeholder="Enter name..."
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur} />
                <div className="alert alert-info alert-dismissible fade show" role="alert" style={this.state.alert ? {display: "block"} : {display: "none"}}>
                     Whoops! Seems like you forgot to enter a name.
                </div>
                <br />
                <div className="card">
                    <div id="messages" className="card-block" style={{ height: 300, overflow: "auto", padding: 10}}>
                        {messages.length ? (
                            messages.map((item, index) => <div className="chat-message"  style= {{ display: 'flex', justifyContent: 'space-between'}} key={`id_${index}`}><p>{`${item.name}: ${item.message}`}</p><p>{item.date}</p></div>)
                        ) :
                            null
                        }
                        <div ref={this.messagesEndRef} />
                    </div>
                </div>
                <br />
                <textarea id="textarea" className="form-control" placeholder="Enter message..." onChange={this.handleTextareaChange} onKeyDown={this.handleKeyDown}></textarea>
            </div>
        )
    }
}
