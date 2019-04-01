import React, { Component } from "react";
import styles from './index.css';
import { connect } from 'react-redux'



@connect(({ user }) => ({ ...user }))
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    console.log('props', this.props);
    return (
      <div className={styles.warp}>

      </div>
    )
  }
}

export default LoginView;
