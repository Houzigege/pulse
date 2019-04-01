import React, { Component } from "react";
import styles from './index.css';
import BannersView from "../../components/Banners/BannersView";

export default class BannersWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <BannersView />
      </div>
    )
  }
}
