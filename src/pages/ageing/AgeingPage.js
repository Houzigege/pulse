import React, { Component } from "react";
import styles from './index.css';
import AgeingView from "../../components/ageing/AgeingView";

export default class AgeingPage extends Component {

  render() {
    return (
      <div className={styles.ageingPage} ref='ageingBox'>
        <AgeingView autoLayout={this.autoLayout}/>
      </div>
    )
  }
}
