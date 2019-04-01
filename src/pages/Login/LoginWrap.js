import React, { Component } from "react";
import styles from './index.css';
import LoginView from "../../components/Login/LoginView";

export default class LoginWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <LoginView />
      </div>
    )
  }
}
