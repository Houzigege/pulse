import React, { Component } from "react";
import { message, Button, Input } from 'antd';
import styles from './index.css';
import bgIcon from '@/assets/bg.png';
import titleBgIcon from '@/assets/bg_03.png';
import sanjiaoIcon from '@/assets/sanjiao.png';
import logoIcon from '@/assets/logo_3.png';
import logo from '@/assets/logo.png';
import { lifestyle } from '@/services/api';

export default class InstagramView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      loading: false,
      data: []
    };
  }

  componentDidMount() {

  }


  handleSubmit = () => {
    this.setState({loading: true}, () => {
      let { value } = this.state;
      console.log(value);
      let data = {
        userhandle: value
      };
      lifestyle(data).then((res) => {
        if (res.status == 200) {
          console.log(...res.lifestyle);
          this.setState({
            data: res.lifestyle,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
          message.error(`There is not any information for ${value}, please try another one.`);
        }
      }).catch((error) => {
        this.setState({
          loading: false
        });
        message.error("The network is busy, please try later.");
      });
    });
  };

  render() {
    let { data, loading, value } = this.state;
    return (
      <div className={styles.warp}>
        <div className={styles.top} ref='top'>
          <img className={styles.logo} src={logo} alt="logo"/>
          <img className={styles.img} src={titleBgIcon} alt=""/>
          <img className={styles.icon} src={sanjiaoIcon} alt=""/>
          <h1 className={styles.title}>100-second <br /> Instagram Lifestyle Classification</h1>
        </div>
        <div className={styles.mid} ref='mid'>
          <div className={styles.box}>
            <div className={styles.leftBox}>
              <img src={bgIcon} alt=""/>
            </div>
            <div className={styles.rightBox}>
              <div style={{width: '80px'}}><img src={logoIcon} alt=""/></div>
              <div><h2>Welcome</h2></div>
              <div>Please login to your Ins account.</div>
              <div>
                <Input className={styles.input} value={value} onChange={(val) => {this.setState({value: val.target.value})}} placeholder="Public Instagram handle" />
              </div>
              <Button className={styles.button} onClick={this.handleSubmit} loading={loading} type="primary" size="large">Downloading Your Images</Button>
            </div>
          </div>
          {
            data.length > 0 && (
              <div className={styles.textBox}>
                {this.setDataListHtml(data)}
              </div>
            )
          }
        </div>
        <div className={styles.bot} ref='bot' />
      </div>
    )
  }

  setDataListHtml = (data) => {
    let leftHtml = [], rightHtml = [];
    data.map((item, index) => {
      let key = Object.keys(item)[0];
      if(index < 3) {
        let hml = (<div key={index}>{`${key} : ${item[key]}`}</div>);
        leftHtml.push(hml);
      } else {
        let hml = (<div key={index}>{`${key} : ${item[key]}`}</div>);
        rightHtml.push(hml);
      }
    });

    let style = {};
    if(data.length <= 3) {
      style.border = 'none'
    }
    return [<div key="left" className={styles.leftTextBox} style={{...style}}>{leftHtml}</div>, <div key="right" className={styles.rightTextBox}>{rightHtml}</div>];
  }
}
