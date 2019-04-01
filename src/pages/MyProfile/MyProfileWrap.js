import React, { Component } from "react";
import styles from './index.css';
import MyProfileView from "../../components/MyProfile/MyProfileView";

export default class MyProfileWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <MyProfileView />
      </div>
    )
  }
}
