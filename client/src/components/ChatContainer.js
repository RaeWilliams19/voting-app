import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

import Chat from './Chat';

export default class ChatContainer extends Component {
    state = {
        socket: socketIOClient('http://127.0.0.1:4000'),
        status: '',
        output: ''
    }

    async componentWillMount() {
        const { socket } = this.state;

        //check for conection
        if (socket !== undefined) {
            console.log('Connected to socket...')

            await socket.on('output', (data) => {
                this.setState({ output: [...this.state.output, ...data] })
            })
        }
    }

    getStatus = () => {
        //get status from server
        const { socket } = this.state;

        socket.on('status', (data) => {
            this.setStatus((typeof data === 'object') ? data.message : data)

            if (data.clear) {
                document.getElementById('textarea').value = '';
            }
        })
    }

    setStatus = (s) => {
        this.setState({ status: s })

        if (s !== '') {
            setTimeout(() => {
                this.setStatus('');
            }, 4000);
        }
    }

    handleClick = () => {
        const { socket } = this.state;
        socket.emit('clear')
        this.setState({ output: '' })
    }

    render() {
        const { output, socket } = this.state

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-12">
                        <div id="status">{this.state.status}</div>
                        <Chat messages={output} socket={socket} />
                        <br />
                        <button className="btn btn-danger" id="clear" onClick={this.handleClick}>Clear chat</button>
                    </div>
                </div>
            </div>
        )
    }
}
