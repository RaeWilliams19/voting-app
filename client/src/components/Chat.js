import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

export default class Chat extends Component {
    state = {
        status: '',
        output: ''
    }

    componentDidMount() {
        const socket = socketIOClient('http://127.0.0.1:4000');

        //check for conection
        if (socket !== undefined) {
            console.log('Connected to socket...')

            socket.on('output', (data) => {
                this.setState({ output: data })
            })
        }

        //get status from server
        socket.on('status', (data) => {
            this.setStatus((typeof data === 'object') ? data.message : data)

            if (data.clear) {
                this.getElement('textarea').value = '';
            }
        })

        //handle input
        this.getElement('textarea').addEventListener('keydown', (event) => {
            if (event.which === 13 && event.shiftKey === false) {
                //emit to server input
                socket.emit('input', {
                    name: this.getElement('username').value,
                    message: this.getElement('textarea').value
                });

                event.preventDefault();
            }
        })
    }

    getElement = (id) => {
        return document.getElementById(id);
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
        const { output } = this.state

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-sm-12">
                        <h1 style={{ textAlign: "center" }}>MongoChat
                        <button className="btn btn-danger" id="clear">Clear</button>
                        </h1>
                        <div id="status">{this.state.status}</div>
                        <div id="chat">
                            <input type="text" id="username" className="form-control" placeholder="Enter name..." />
                            <br />
                            <div className="card">
                                <div id="messages" className="card-block" style={{ height: "300px" }}>
                                    {output.length ? (
                                        output.map((item, index) => <div className="chat-message" key={`id_${index}`}>{item.name + ": " + item.message}</div>)
                                    ) :
                                        null
                                    }
                                </div>
                            </div>
                            <br />
                            <textarea id="textarea" className="form-control" placeholder="Enter message..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
