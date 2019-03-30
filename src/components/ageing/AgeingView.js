import React, { Component } from "react";
import styles from './index.css';
import {a, b} from '../../services/api';
import { connect } from 'react-redux'



@connect(({ app }) => ({ ...app }))
class AgeingView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    a({a: '123', b: 'tewr'})
      .then(res => {
        console.log(res, 'res');
      })
      .catch(err => {
        console.log(err, 'err');
      });
    this.props.dispatch({type: 'app/a', payload: {user: '123', name: 'abc'}})
  }

  render() {
    console.log('props', this.props);
    return (
      <div className={styles.warp}>
        <div className={styles.top} ref='top'>

        </div>
        <div className={styles.mid} ref='mid'>
          哈哈哈哈哈哈
        </div>
        <div className={styles.bot} ref='bot' />
      </div>
    )
  }
}

export default AgeingView;
