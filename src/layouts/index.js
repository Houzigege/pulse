import React from "react";
import styles from './index.css';
import {
  Layout, Menu, Icon, Dropdown
} from 'antd';
import routers from '../../config/routers';
import logo from '../assets/bg_01.png';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



const BasicLayout = (props) => {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const newRouters = routers[1].routes.filter(item => item.routes);
  const selectedKeys = [];
  const openKeys = [];
  newRouters.map(item => {
    if(pathname.indexOf(item.path) !== -1) {
      openKeys.push(item.path);
      item.routes.map(_item => {
        if(pathname === _item.path) {
          selectedKeys.push(_item.path);
        }
      })
    }
  });
  const menu = (
    <Menu onClick={({key}) => {console.log(key)}}>
      <Menu.Item key="1"><Icon type="home" />1st menu item</Menu.Item>
      <Menu.Item key="2"><Icon type="home" />2nd memu item</Menu.Item>
      <Menu.Item key="3"><Icon type="home" />3rd menu item</Menu.Item>
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
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                Hover me, Click menu item <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#001529', borderRight: '1px solid #f0f2f5' }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
              onSelect={(row) => {window.location.href = `${origin}${row.key}`}}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                newRouters.map(item => (
                  <SubMenu key={item.path} title={<span><Icon type={item.icon} />{item.name}</span>}>
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
              { props.children }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default BasicLayout;
