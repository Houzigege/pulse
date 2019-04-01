import React, { Component } from "react";
import { connect } from 'react-redux'
import router from 'umi/router';
import { Spin } from 'antd';

@connect(({ user }) => ({ ...user }))
class App extends Component {

  componentDidMount() {
    const origin = window.location.origin;
    const { authority } = this.props;
    if(authority === 'localAdmin') {
      window.location.href = `${origin}/content/pages`
    } else if(authority === 'user') {
      window.location.href = `${origin}/content/banners`
    } else {
      window.location.href = `${origin}/settings/management`
    }
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '380px'
      }}>
        <Spin />
      </div>
    )
  }
}
export default App;
