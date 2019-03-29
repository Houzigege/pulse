import React, { Component } from "react";
import { Button } from 'antd';
import styles from './index.css';

export default class CheckBoxList extends Component {

  handleClick = (e) => {
      let element = e.target;
      let data = {
          "parent_id": element.getAttribute('parent_id'),
          "elements": [element.getAttribute('element_id')],
          "messages": [element.getAttribute('message')],
          "content_type": element.getAttribute('content_type'),
          "timestamp": new Date()
      };
      this.props.submitUserSaid(data);
  };

  render() {
      return (
        <div className={styles.optionBox} style={{paddingTop: 0}}>
          {
            this.props.parent.possible_elements.map((option, i) => {
              return (
                <Button className={styles.optionButton}
                        key={i}
                        parent_id={this.props.parent.element_id}
                        element_id={option.element_id}
                        message={option.value}
                        onClick={this.handleClick}
                        content_type='selected_elements'
                >
                  {option.value}
                </Button>
              )
            })
          }
        </div>
      );
  }
}
