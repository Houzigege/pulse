import React, { Component } from "react";
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from "./index.css";

export default class DateInput extends Component {

  onChange = (date, dateString) => {
      if (dateString != null && dateString != "") {
          let data = {
              "parent_id": this.props.parent.element_id,
              "elements": [],
              "messages": [dateString],
              "content_type": "date_selection",
              "timestamp": new Date()
          };
          this.props.submitUserSaid(data);
      }
  };

  render() {
      let dateFormat = 'YYYY-MM-DD';
      return (
        <div className={styles.optionBox}>
          <DatePicker
            onChange={this.onChange}
            defaultValue={moment('1990-01-01', dateFormat)}
            format={dateFormat}
          />
        </div>
      );
  }
}
