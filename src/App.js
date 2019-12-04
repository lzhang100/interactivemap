import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './css/app.css';
import './map';

import WrappedMap from './map';
import Searchbar from './components/Searchbar';
import Search from 'antd/lib/input/Search';

//const { Layout, Menu, Breadcrumb, Icon } = antd;

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: false,
    visible: false,
    buildings: [
      {
        id: 1,
        abbrev: 'ENG',
        name: 'Davidson College of Engineering',
        coords: { lat: 37.336734, lng: -121.881626 }
      },
      {
        id: 2,
        abbrev: 'SU',
        name: 'Student Union',
        coords: { lat: 37.336529, lng: -121.880843 }
      },
      {
        id: 3,
        abbrev: 'MLK',
        name: 'Martin Luther King Jr. Library',
        coords: { lat: 37.335444, lng: -121.884988 }
      },
      {
        id: 1,
        abbrev: 'ENG',
        name: 'Davidson College of Engineering',
        coords: { lat: 37.336734, lng: -121.881626 }
      },
      {
        id: 1,
        abbrev: 'ENG',
        name: 'Davidson College of Engineering',
        coords: { lat: 37.336734, lng: -121.881626 }
      }
    ]
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  render() {
    //return <div>I'M READY TO USE THE BACK END APIS! :-)</div>;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <div className='logo'>
            <img
              src={require('./css/logo_sjsu.png')}
              style={{ width: '150px' }}
              alt='SJSU'
            ></img>
          </div>
          <div className='schoolname'>
            <img src={require('./css/logo2_sjsu.png')} alt='SJSU'></img>
          </div>
          <div className='test'>
            <Searchbar buildings={this.state.buildings} />
          </div>
        </Header>
        <Layout>
          <Sider
            theme='light'
            width='250'
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className='logo' />
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1'>
                <span>Services</span>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='car' />
                    <span>Parking</span>
                  </span>
                }
              >
                <Menu.Item key='2'>North Parking Garage</Menu.Item>
                <Menu.Item key='3'>South Parking Garage</Menu.Item>
                <Menu.Item key='4'>West Parking Garage</Menu.Item>
                <Menu.Item key='5'>Park & Ride Lot</Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='wallet' />
                    <span>Food & Drinks</span>
                  </span>
                }
              >
                {/* <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item> */}
              </SubMenu>
              <SubMenu
                key='sub3'
                title={
                  <span>
                    <Icon type='printer' />
                    <span>Printers</span>
                  </span>
                }
              ></SubMenu>
            </Menu>
          </Sider>
          <Content style={{ margin: '0 16px' }}>
            <div className='links'>
              <a href={'https://www.sjsu.edu'} target={'_blank'}>
                {' '}
                SJSU Home |
              </a>
              <a href={'/'}> ICMap Home </a>
            </div>
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyB6C4COk_CiplZhE0Mn4ZS76_zFoSUP1hU`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              closeDrawer={this.onClose}
              openDrawer={this.showDrawer}
              currentDrawerState={this.state.visible}
            />
            <Footer style={{ textAlign: 'center' }}>
              SJSU Interactive Campus Map ©2019 Created by ICMap
            </Footer>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>SJSU Interactive Campus Map ©2019 Created by ICMap</Footer> */}
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          SJSU Interactive Campus Map ©2019 Created by ICMap
        </Footer>
      </Layout>
      //   <Footer style={{ textAlign: 'center' }}>SJSU Interactive Campus Map ©2019 Created by ICMap</Footer>

      // </Layout>
    );
  }
}

export default App;
