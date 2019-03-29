import React, { Component } from "react";
import { Icon, message, Spin } from 'antd';
import DisplayMessage from "./DisplayMessage";
import InputBox from "./InputBox";
// import CheckboxList from "./CheckBoxList";
// import ButtonList from "./ButtonList";
// import DateInput from "./DateInput";
import styles from './index.css';
import titleBg from '@/assets/bg_01@1x.png';
import { openchat, sendmessage } from '@/services/api';
import iconFontJs from '@/assets/icon/font_991737_8agjy4vjq1/iconfont';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFontJs,
});


export default class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: "blank",
      lastElement: null,
      messages: [],
      actionIcon: false,
      visible: false,
      sideType: false
    };
    this. elements = [];
  }

  setLastBotSaid = (lastElement) => {
    this.setState({ lastElement: lastElement });
  };

  componentDidMount() {
    this.adjustLayout();
    this.openChat();
  }

  openChat() {
    openchat({ userId: "" }).then((res) => {
        if (res.code == 200) {
          localStorage.setItem('userId', "");
          // localStorage.setItem('ConversationId', res.data.conversation_id);
          this.elements = [...res.data];
          this.setState({
            messages: [...res.data]
          });
        } else {
          message.error(res.message || "Server error.");
        }
      }).catch((error) => {
        message.error("Server error.");
      });
  }

  submitUserSaid = (data) => {
    data.userId = localStorage.getItem('userId');
    // data.conversation_id = localStorage.getItem('ConversationId');
    this.sendMessage(data);
    let item = JSON.parse(JSON.stringify(data));
    item.value = data.message;
    delete item.message;
    let eles = this.elements.concat([item]);
    this.setState({
      messages: eles
    });
    this.elements = eles;
  };

  sendMessage(data) {
    sendmessage(data).then((res) => {
        if (res.code == 200) {
          let data = res.data;
          data.map(item => {
            if(item.possibleElement && item.possibleElement.length > 0) {
              item.possibleElement.map((_item, _index) => {
                for(let key in _item) {
                  for(let _key in _item[key]) {
                    let _data = {
                      "index": _index,
                      "displayType": item.displayType,
                      "possibleValue": _item[key][_key],
                      "elementId": key,
                      "parentId": item.elementId,
                      "value": _key,
                      "timeStamp": item.timeStamp
                    };
                    this.elements.push(_data);
                  }
                }
              });
            } else {
              this.elements.push(item);
            }
          });
          // this.elements = this.elements.concat(res.data);
          this.setState({
            messages: this.elements
          });
        } else {
          message.error(res.message || "Server error.");
        }
      }).catch((error) => {
        message.error("Server error.");
      });
  }

  componentDidUpdate() {
    this.adjustLayout();
  }

  adjustLayout = () => {
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let hInput = this.refs.inputbox.clientHeight;
    let hTitle = this.refs.title.clientHeight;
    this.refs.box.setAttribute("style", `height: ${h - (hInput + hTitle)}px; margin-top: ${hTitle}px`);
    this.refs.leftBox && this.refs.leftBox.setAttribute("style", `height: ${h - hTitle}px; top: ${hTitle}px`);
    this.refs.box.scrollTop = this.refs.box.scrollHeight;
    setTimeout(this.props.autoLayout, 0);
  };

  setActonIcon = (value) => {
    this.setState({actionIcon: value})
  };

  handleClick = (type) => {
    const {visible, sideType} = this.state;
    if(type === 1) {
      this.setState({sideType: false});
      setTimeout(() => {
        this.setState({visible: false});
      }, 600)
    } else {
      if(sideType) {
        this.setState({sideType: !sideType});
        setTimeout(() => {
          this.setState({visible: !visible});
        }, 600)
      } else {
        this.setState({visible: !visible});
        setTimeout(() => {
          this.setState({sideType: !sideType});
        }, 200)
      }
    }
  };

  // GetUserInput = () => {
  //   if (this.state.lastElement != null) {
  //     let element = this.state.lastElement;
  //     let { actionIcon } = this.state;
  //     if (element.element_id != null) {
  //       switch (element.expected_input[0]) {
  //         case "user_input":
  //           return (
  //             <InputBox
  //               actionIcon={actionIcon}
  //               setActonIcon={this.setActonIcon}
  //               parent={this.state.lastElement}
  //               submitUserSaid={this.submitUserSaid}
  //             />
  //           );
  //         case "date_selection":
  //           return (
  //             <DateInput parent={element} submitUserSaid={this.submitUserSaid} />
  //           );
  //         case "selected_elements":
  //           return (
  //             <ButtonList parent={element} submitUserSaid={this.submitUserSaid} />
  //           );
  //         case "multiple_choice":
  //           return (
  //             <CheckboxList parent={element} submitUserSaid={this.submitUserSaid} />
  //           );
  //
  //       }
  //     }
  //   }
  //   return (
  //     <div className={styles.optionBox}>
  //       <Spin />
  //     </div>
  //   )
  // };

  render() {
    let { actionIcon, messages, visible, sideType } = this.state;
    return (
      <div>
        <div className={styles.title} style={{background: `url(${titleBg}) no-repeat top/auto #6742d9`,  backgroundSize: '100% 100%'}} ref='title'>
          <IconFont className={styles.titleIcon} type="icon-zhankai" onClick={this.handleClick} />
          <h1>HR Chatbot</h1>
        </div>
        {
          visible ? (
            <div className={styles.leftBox} ref='leftBox'>
              <div className={styles.layer} onClick={() => this.handleClick(1)} />
              <ul style={{width: sideType ? '200px' : 0}}>
                <li><a href="https://facialanalytics.azurewebsites.net">BMI Estimator</a></li>
                <li><a href="https://wrinkledetector.azurewebsites.net">Wrinkle Detector</a></li>
                <li><a href="https://doctorbotdemo.azurewebsites.net">Medical Diagnosis</a></li>
                <li style={{display: 'none'}}><a href="javascript:void(0);" style={{color: '#6742D9', borderRight: '2px solid #6742D9'}}>HR Chatbot</a></li>
              </ul>
            </div>
          ) : null
        }
        <div className={styles.messagePanel} ref='box'>
          {
            messages && messages.map((msg, i) => {
              return (
                <DisplayMessage
                  key={i}
                  isLast={i == messages.length - 1}
                  isFirst={i == 0}
                  isFirstUserMsg={msg == messages.filter(item => !item.elementId)[0]}
                  setLastBotSaid={this.setLastBotSaid}
                  messages={msg}
                  theLastTime={i != 0 ? messages[i - 1].timestamp : '2019-01-04T03:12:46.333251+00:00'}
                  submitUserSaid={this.submitUserSaid}
                />
              )
            })
          }
        </div>
        <div className={styles.inputPanel} ref='inputbox'>
          {/*{ this.GetUserInput() }*/}
          <InputBox
            actionIcon={actionIcon}
            setActonIcon={this.setActonIcon}
            adjustLayout={this.adjustLayout}
            /* parent={this.state.lastElement}*/
            submitUserSaid={this.submitUserSaid}
            messages={messages}
          />
        </div>
      </div>
    )
  }
}
