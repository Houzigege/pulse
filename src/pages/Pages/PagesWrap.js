import React, { Component } from "react";
import styles from './index.css';
import PagesView from "../../components/Pages/PagesView";

export default class PagesWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <PagesView />
      </div>
    )
  }
}
