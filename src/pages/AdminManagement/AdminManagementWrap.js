import React, { Component } from "react";
import styles from './index.css';
import AdminManagementView from "../../components/AdminManagement/AdminManagementView";

export default class PagesWrap extends Component {
  render() {
    return (
      <div className={styles.ageingPage}>
        <AdminManagementView />
      </div>
    )
  }
}
