import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Chat from './Chat';

export default class ChatContainer extends Component {
    state = {
        socket: socketIOClient('http://127.0.0.1:4000'),
        status: '',
        output: ''
    }

    componentDidMount() {
        const {socket} = this.state;

        //check for conection
        if (socket !== undefined) {
            console.log('Connected to socket...')

            socket.on('output', (data) => {
                this.setState({ output: data })
            })
        }

        /* //handle input
        document.getElementById('textarea').addEventListener('keydown', (event) => {
            if (event.which === 13 && event.shiftKey === false) {
                //emit to server input
                socket.emit('input', {
                    name: document.getElementById('username').value,
                    message: document.getElementById('textarea').value
                });

                event.preventDefault();
            }
        }) */
    }

    getStatus = () => {
        //get status from server
        const {socket} = this.state;

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

    render() {
        const { output, socket } = this.state

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-12">
                        <h1 style={{ textAlign: "center" }}>MongoChat
                        <button className="btn btn-danger" id="clear">Clear</button>
                        </h1>
                        <div id="status">{this.state.status}</div>
                       <Chat messages={output} socket={socket}/>
                    </div>
                </div>
            </div>
        )
    }
}
