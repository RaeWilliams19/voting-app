import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>
                    <span role="img" aria-label="thumb up">👍🏽</span> Yay or Nay <span role="img" aria-label="thumb down">👎🏽</span>
                </h1>
            </div>
        )
    }
}
