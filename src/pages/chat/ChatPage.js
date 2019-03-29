import React, { Component } from "react";
import styles from './index.css';
import ChatView from "../../components/chat/ChatView";

export default class ChatPage extends Component {

  autoLayout = () => {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.refs.chatBox.setAttribute("style", `height: ${h}px`);
  };

  render() {
    return (
      <div className={styles.chatPage} ref='chatBox'>
        <ChatView autoLayout={this.autoLayout}/>
      </div>
    )
  }
}
