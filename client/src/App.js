import React, { Component } from "react";
import Header from "./components/Header";
import ChatContainer from "./components/ChatContainer";

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <ChatContainer />
      </div>
    );
  }
}
