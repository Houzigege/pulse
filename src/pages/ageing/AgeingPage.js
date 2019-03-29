import React, { Component } from "react";
import styles from './index.css';
import AgeingView from "../../components/ageing/AgeingView";

export default class AgeingPage extends Component {
  autoLayout = () => {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.refs.ageingBox.setAttribute("style", `height: ${h}px`);
  };

  render() {
    return (
      <div className={styles.ageingPage} ref='ageingBox'>
        <AgeingView autoLayout={this.autoLayout}/>
      </div>
    )
  }
}
