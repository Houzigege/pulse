import React, { Component } from "react";
import { Input, Button, Icon, message } from 'antd';
import styles from './index.css';
import leftIcon from '@/assets/icon/gengduo@3x.png';
import rightIcon from '@/assets/icon/send@3x.png';
import iconFontJs from '@/assets/icon/font_991737_8agjy4vjq1/iconfont';
import { sharemoment } from '@/services/api';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFontJs,
});


export default class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  };

  handleClick = (e) => {
    let {value} = this.state;
    this.sendInput(value);
  };

  handleOk = (e) => {
    this.sendInput(e.target.value)
  };

  sendInput(value) {
    let data = {
        // "parent_id": this.props.parent.element_id,
        // "elements": [],
        "message": value,
        // "content_type": "user_input",
        "timestamp": new Date()
    };
    if (value != null && value != "") {
      this.props.submitUserSaid(data);
    }
    this.setState({value: ''});
  }

  fIsMobile = () => {
    return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  handleFeedback = () => {
    console.log('Feedback')
  } ;

  handleEvaluation = () => {
    let {messages} = this.props;
    let data = {
      "userId": localStorage.getItem('userId'),
      "usefuls": []
    };
    messages.map(item => {
      let _item = {
        "elementId": item.elementId || null,
        "value": item.value,
      };
      data.usefuls.push(_item);
    });
    sharemoment(data).then((res) => {
      if (res.code == 200) {
        message.success(res.message);
      } else {
        message.error(res.message || "Server error.");
      }
    }).catch((error) => {
      message.error("Server error.");
    });
  } ;

  adjustLayout = () => {
    let {adjustLayout} = this.props;
    setTimeout(adjustLayout, 300);
  };

  render() {
    let {setActonIcon, actionIcon} = this.props;
    let {value} = this.state;
      return (
        <div className={styles.contentBox}>
          <div className={styles.inputBox}>
            <div className={styles.leftContainer}>
              <Button onClick={() => setActonIcon(!actionIcon)} className={styles.buttonContainer}>
                <img src={leftIcon} alt=""/>
              </Button>
            </div>
            <div className={styles.inputContainer}>
              <Input placeholder="Please enter your question…"
                     size="large"
                     value={value}
                     onChange={this.handleChange}
                     autoFocus={!this.fIsMobile()}
                     onPressEnter={this.handleOk}
                     onBlur={this.adjustLayout}
              />
            </div>
            <div className={styles.rightContainer}>
              <Button onClick={this.handleClick} className={styles.buttonContainer}>
                <img src={rightIcon} alt=""/>
              </Button>
            </div>
          </div>
          {
            actionIcon && (
              <div className={styles.avatarBox}>
                <div className={styles.avatarContent} onClick={this.handleEvaluation}>
                  <IconFont type="icon-shoucang" />
                  <br />
                  <span>Evaluation</span>
                </div>
                <div className={styles.avatarContent} onClick={this.handleFeedback}>
                  <IconFont type="icon-feedback" />
                  <br />
                  <span>Feedback</span>
                </div>
              </div>
            )
          }
        </div>
      )
  }
}
