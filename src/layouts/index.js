import React, { Component } from "react";
import styles from './index.css';
import {
  Layout, Menu, Icon, Dropdown
} from 'antd';
import router from 'umi/router';
import { connect } from 'react-redux'
import routers from '../../config/routers';
import logo from '../assets/logo.png';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


@connect(({ user }) => ({ ...user }))
class BasicLayout extends Component {

  render() {
    console.log(this.props);
    const { userName } = this.props;
    const pathname = window.location.pathname;
    // let newRouters = routers[2].routes.map(item => {
    //   if (item.routes) {
    //     item.routes = item.routes.filter(_item => (!_item.authority || _item.authority && _item.authority.indexOf(this.props.authority) !== -1));
    //   }
    //   return item;
    // }).filter(item => (item.routes && item.routes.length > 0) && (!item.authority || item.authority && item.authority.indexOf(this.props.authority) !== -1));


    let newRouters = routers[1].routes.filter(item => item.routes && item.routes.length > 0);


    const selectedKeys = [];
    const openKeys = [];
    newRouters.map(item => {
      if (pathname.indexOf(item.path) !== -1) {
        openKeys.push(item.path);
        item.routes.map(_item => {
          if (pathname === _item.path) {
            selectedKeys.push(_item.path);
          }
        })
      }
    });
    const menu = (
      <Menu onClick={({ key }) => {
        console.log(key)
      }}>
        <Menu.Item key="1"><span style={{ padding: '0 20px' }}>My Profile</span></Menu.Item>
        <Menu.Item key="2"><span style={{ padding: '0 20px' }}>Change Password</span></Menu.Item>
        <Menu.Item key="3"><span style={{ padding: '0 20px' }}>Logout</span></Menu.Item>
      </Menu>
    );

    return (
      <div className={styles.normal}>
        <Layout>
          <Header className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt=""/>
            </div>
            <div className={styles.right}>
              <Dropdown overlay={menu} placement="bottomCenter">
                <a className="ant-dropdown-link" href="javascript:void(0)">
                  Hello, {userName} <Icon type="down"/>
                </a>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#001529', borderRight: '1px solid #f0f2f5' }}>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={selectedKeys}
                defaultOpenKeys={openKeys}
                onSelect={(row) => {
                  router.push(row.key)
                }}
                style={{ height: '100%', borderRight: 0 }}
              >
                {
                  newRouters.map(item => (
                    <SubMenu key={item.path} title={<span><Icon type={item.icon}/>{item.name}</span>}>
                      {
                        item.routes.map(_item => (
                          <Menu.Item key={_item.path}>{_item.name}</Menu.Item>
                        ))
                      }
                    </SubMenu>
                  ))
                }
              </Menu>
            </Sider>
            <Layout>
              <Content style={{
                background: '#fff', padding: 0, margin: 0, minHeight: 680,
              }}
              >
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
