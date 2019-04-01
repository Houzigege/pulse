import React, { Component } from "react";
import styles from './index.css';
import ChangePasswordView from "../../components/ChangePassword/ChangePasswordView";

export default class ChangePasswordWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <ChangePasswordView />
      </div>
    )
  }
}
