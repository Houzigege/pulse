import React, { Component } from "react";
import { message, Slider, Button, Upload } from 'antd';
import styles from './index.css';
import triangleIcon from '@/assets/icon/0.png';
import fenxiIcon from '@/assets/icon/fenxi.png';
import nianlingIcon from '@/assets/icon/nianling.png';
import zhaopianIcon from '@/assets/icon/zhaopian.png';
import titleBgIcon from '@/assets/bg_02.png';
import logoIcon from '@/assets/logo.png';
import ceshiIcon from '@/assets/alphas.png';

const setSpanColor = (num) => {
  return {
    style: {
      color: '#1F89F7',
      fontSize: '12px'
    },
    label: <span>{num}</span>
  }
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
  if (!isJPG) {
    message.error('You can only upload JPG PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
};

export default class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      value: 0,
      loading: false,
      imgArr: []
    };
  }

  componentDidMount() {
    // this.adjustLayout();
  }

  // adjustLayout = () => {
  //   let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  //   let hBot = this.refs.bot.clientHeight;
  //   let hTop = this.refs.top.clientHeight;
  //   this.refs.mid.setAttribute("style", `height: ${h - (hBot + hTop)}px; margin-top: ${hTop}px`);
  // };

  handleSliderChange = (value) => {
    this.setState({value})
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    console.log(info);
    if (info.file.status === 'done') {
      let imgArr = [];
      if(info.file.response.code == '200') {
        imgArr = info.file.response.data || [];
      }
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
        imgArr,
        value: 10
      }));
    }
  };

  handleSubmit = () => {
    let { value } = this.state;
    console.log(value);
  };

  render() {
    let { value, loading, imageUrl, imgArr } = this.state;
    const marks = {
      0: setSpanColor(0),
      10: setSpanColor(10),
      20: setSpanColor(20),
      30: setSpanColor(30),
      40: setSpanColor(40),
      50: setSpanColor(50),
      60: setSpanColor(60),
      70: setSpanColor(40),
      80: setSpanColor(50),
      90: setSpanColor(60),
      100: setSpanColor(100),
    };
    return (
      <div className={styles.warp}>
        <div className={styles.top} ref='top'>
          <img className={styles.logo} src={logoIcon} alt="logo"/>
          <img className={styles.img} src={titleBgIcon} alt=""/>
          <img className={styles.icon} src={triangleIcon} alt=""/>
          <div className={styles.logo2}><img src={ceshiIcon} alt="logo"/>Alpha</div>
          <h1 className={styles.title}>Ageing Predictor</h1>
        </div>
        <div className={styles.mid} ref='mid'>
          <div className={styles.box}>
            <div className={styles.imgBox} style={{background: `url(${zhaopianIcon}) no-repeat center / 60%`}} />
            <Upload
              className="upload-box"
              name="image"
              showUploadList={false}
              action="/images" //使用代理
              // action="https://wrinkledevapi.azurewebsites.net/images"
              // headers={{Token: '1234567890'}}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              <Button className={styles.button} loading={loading} type="primary" size="large">Upload a picture</Button>
            </Upload>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.right} />
          </div>
          <div className={styles.box}>
            <div className={styles.imgBox} style={{background: `url(${ imageUrl ? imageUrl : fenxiIcon }) no-repeat center / ${ imageUrl ? '100%' : '60%' }`}} />
            <div  style={{color: '#1F89F7', marginTop: '50px', fontWeight: '500'}}>Predicted result</div>
            <div className={styles.button} style={{color: '#1F89F7', marginTop: '26px'}}>{`${20}~${30}`}</div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.right} />
          </div>
          <div className={styles.box}>
            {
              imgArr.length > 0 ? (
                <div className={styles.imgBox}>
                  <ul style={{top: value > 10 ? `-${(value/10 - 1) * 120}px` : 0}}>
                    {
                      imgArr.map((item, index) => <li key={`key-${index}`}><img src={item} alt=""/></li>)
                    }
                  </ul>
                </div>
              ) :   <div className={styles.imgBox} style={{background: `url(${nianlingIcon}) no-repeat center / 60%`}} />
            }
            <Slider style={{marginTop: '50px'}} marks={marks} value={value} step={null} onChange={this.handleSliderChange} />
            <div className={styles.button} style={{color: '#1F89F7', textAlign: 'left', paddingLeft: '16px', marginTop: '38px', fontSize: '12px'}}>
              {`True Age: ${value}`}
              <Button
                style={{height: '30px', borderRadius: '16px', position: 'absolute', right: '-2px', fontSize: '12px'}}
                type="primary"
                size="large"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.bot} ref='bot' />
      </div>
    )
  }
}
