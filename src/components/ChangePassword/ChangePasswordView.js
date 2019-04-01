import React, { Component } from "react";
import styles from './index.css';
import { connect } from 'react-redux'



@connect(({ user }) => ({ ...user }))
class ChangePasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.warp}>

      </div>
    )
  }
}

export default ChangePasswordView;
