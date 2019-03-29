import React, { Component } from "react";
import styles from './index.css';
import InstagramView from "../../components/Instagram/InstagramView";

export default class InstagramPage extends Component {
  autoLayout = () => {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.refs.InstagramBox.setAttribute("style", `height: ${h}px`);
  };

  render() {
    return (
      <div className={styles.ageingPage} ref='InstagramBox'>
        <InstagramView autoLayout={this.autoLayout}/>
      </div>
    )
  }
}
