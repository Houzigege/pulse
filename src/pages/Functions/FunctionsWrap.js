import React, { Component } from "react";
import styles from './index.css';
import FunctionsView from "../../components/Functions/FunctionsView";

export default class FunctionsWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <FunctionsView />
      </div>
    )
  }
}
