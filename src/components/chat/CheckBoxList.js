import React, { Component } from "react";
import { Checkbox, Button } from 'antd';
import styles from "./index.css";
const CheckboxGroup = Checkbox.Group;

export default class CheckBoxList extends Component {
  constructor(props) {
    super(props);
    this.CheckedList = [];
  }

  handleOk = (e) => {
      let element = e.target;
      let arrId = [];
      let arrText = [];
      this.CheckedList.forEach(option => {
          arrId.push(option.element_id);
          arrText.push(option.text);
      });

      let data = {
          "parent_id": this.props.parent.element_id,
          "elements": arrId,
          "messages": arrText,
          "content_type": "multiple_choice",
          "timestamp": new Date()
      };

      if (arrText.length > 0) {
        this.props.submitUserSaid(data);
      }
  };

  handleCheck = (checkedValues) => {
      this.CheckedList = checkedValues
  };


  render() {
      let ops = [];
      this.props.parent.possible_elements.forEach(element => {
          ops = ops.concat({ label: element.value, value: { element_id: element.element_id, text: element.value } });
      });
      return (
        <div className={styles.optionBox}>
          <CheckboxGroup className={styles.checkboxGroup} options={ops} onChange={this.handleCheck} />
          <Button onClick={this.handleOk} style={{margin: '0 10px'}}>OK</Button>
        </div>
      )
  }
}
