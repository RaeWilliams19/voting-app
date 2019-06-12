import React, { Component } from "react";
import Header from "./components/Header";
import Chat from "./components/Chat";

export default class App extends Component {

  render() {
    return (
        <div>
          <Header />
          <Chat />
        </div>
    );
  }
}
