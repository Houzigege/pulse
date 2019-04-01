import React, { Component } from "react";
import styles from './index.css';
import ForgetPasswordView from "../../components/ForgetPassword/ForgetPasswordView";

export default class ForgetPasswordWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <ForgetPasswordView />
      </div>
    )
  }
}
