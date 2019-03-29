import React, { Component } from "react";
import { Avatar, Icon, message } from "antd";
import moment from "moment";
import styles from './index.css';
import userAvatar from '@/assets/2copy2@3x.png';
import botAvatar from '@/assets/timg-12@3x.png';
import iconFontJs from '@/assets/icon/font_991737_8agjy4vjq1/iconfont';
import { likemoment } from '@/services/api';
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconFontJs,
});

export default class DisplayMessage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        show: false,
        like: null
      }
  }

  // componentDidMount() {
  //     this.state.timer1 = setTimeout(() => {
  //         this.setState({
  //             show: true
  //         }, () => {
  //             if (this.props.isLast)
  //                 this.props.setLastBotSaid(this.props.message)
  //         })
  //     }, this.props.message.element_id ? this.props.delay : 0);
  // }
  //
  // componentDidUpdate() {
  //     if (this.state.timer1 != null)
  //         clearTimeout(this.state.timer1);
  // }

  handleLike = (type, item) => {
    let {like} = this.state;
    if(like == type) {
      like = null;
    } else {
      like = type;
    }
    let data = {
      "userId": localStorage.getItem('userId'),
      "parentId": item.parentId ? item.parentId : item.elementId,
      "usefuls": [{
        "elementId": item.elementId,
        "value": item.possibleValue ? JSON.stringify({[item.value]: item.possibleValue}) : item.value,
        "useful": like == 1 ? true : like == 2 ? false : null
      }]
    };
    likemoment(data).then((res) => {
      if (res.code == 200) {
        console.log(res.message);
        this.setState({like});
      } else {
        message.error(res.message || "Server error.");
      }
    }).catch((error) => {
      message.error("Server error.");
    });
  };

  handleSendInput(value) {
    let data = {
      "message": value,
      "timestamp": new Date()
    };
    if (value != null && value != "") {
      this.props.submitUserSaid(data);
    }
  }

  render() {
    const {like} = this.state;
    const {messages, theLastTime, isFirst, isFirstUserMsg} = this.props;
    const Dom = [];
    const reg =  /(.*?\b[\:\?]|.*?\B[\:\?])|(.*?\B[^\:\?]$|.*?\b[^\:\?]$)/g;
    if (messages) {
      const time = new Date(messages.timestamp);
      const firstTime = typeof theLastTime == 'object' ? theLastTime : new Date(theLastTime);
      // console.log(time - firstTime, isFirst);
      if((time - firstTime > 1800000 && !isFirst) || isFirstUserMsg) {
        const timeBox = (
          <div key="timeBox" className={styles.timeBox}>{moment(messages.timestamp).format('HH:mm')}</div>
        );
        Dom.push(timeBox);
      }
      if (messages.elementId) {
        const botLineBox = (
          <div className={styles.botLine} key="botLineBox">
            <Avatar className={styles.avatarLeft} src={botAvatar} />
            <div className={styles.botSaid} style={{width: messages.displayType == 'useful' ? 'initial' : 'initial'}}>
              <div className={styles.botSaidTop}>
                {
                  messages.value && messages.possibleValue ? (
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{`Response ${messages.index + 1}:`}</div>
                      <div className={styles.botSaidSummary} style={{paddingTop: '6px'}}>
                        <span>Q: </span>
                        <span>{messages.value}</span>
                      </div>
                    </div>
                  ) : messages.value.match(reg) ? messages.value.match(reg).map((item, index) => (
                    <div key={`user_${index}`}>{item}</div>
                  )) : messages.value
                }
              </div>
              {
                // messages.possibleElement && messages.possibleElement.length > 0 && (
                //   <div className={styles.botSaidSummary}>
                //     {
                //       messages.possibleElement.map((item, index) => (
                //         <a href="javascript:void(0);" key={`summary-${index}`} onClick={() => this.handleSendInput(item)}>
                //           <span>{`${index + 1}．`}</span>
                //           <span>{item}</span>
                //         </a>
                //       ))
                //     }
                //   </div>
                // )
                messages.possibleValue && (
                  <div className={styles.botSaidSummary}>
                    <a href="javascript:void(0);">
                      <span>A: </span>
                      <span>{messages.possibleValue}</span>
                    </a>
                  </div>
                )
              }
              {
                messages.displayType == 'useful' && (
                  <div className={styles.FabulousBox}>
                    <div className={styles.FabulousLike} onClick={() => this.handleLike(1, messages)}>
                      <IconFont type="icon-zan" style={{color: like == 1 ? '#6742d9' :  '#ccc'}} /> Useful
                    </div>
                    <div className={styles.FabulousDislike} onClick={() => this.handleLike(2, messages)}>
                      <IconFont type="icon-cai" style={{color: like == 2 ? '#6742d9' : '#ccc'}} /> Useless
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        );
        Dom.push(botLineBox);
      } else {
        const userLineBox = (
          <div className={styles.userLine} key="userLineBox">
            <Avatar className={styles.avatarRight} src={userAvatar} />
            <div className={styles.userSaid}>
              {
                messages.value && messages.value.match(reg) ? messages.value.match(reg).map((item, index) => (
                  <div key={`user_${index}`}>{item}</div>
                )) : messages.value
              }
            </div>
          </div>
        );
        Dom.push(userLineBox);
      }
    }
    return (
      <div>
        { Dom }
      </div>
    );
  }
}
