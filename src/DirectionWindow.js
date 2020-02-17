import React from 'react';
import 'antd/dist/antd.css';
import './css/app.css'
import { Button, Icon, Modal, Form, Input, Radio, Row, Col } from 'antd';

const DirectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        origin: '',
        destination: '',
        // showPanel:true
      };
      // this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () =>{
      var currLoc = this.state.origin
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // var location = pos.lat + ',' + pos.lng
          console.log('get geolocation', pos)
          console.log('get geolocation, lat:', String(pos.lat), ' lon:', String(pos.lng))
          currLoc = 'Current Location: Latitude:' + String(pos.lat) + ' Lontitude:' + String(pos.lng)
          document.getElementById('currLoc').innerHTML = currLoc
          console.log('change field value')
          // return pos.lat + pos.lon
          // infoWindow.setPosition(pos);
          // infoWindow.setContent('Location found.');
          // infoWindow.open(map);
          // map.setCenter(pos);
        }, function() {
          this.handleLocationError(true);
        });
      } else {
        // Browser doesn't support Geolocation
        this.handleLocationError(false);
      }
      this.props.form.setFieldsValue({
        origin: 'currLoc',
      });
      console.log(currLoc)
    }

    handleLocationError = (browserHasGeolocation)=> {
      console.log(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.')
      // infoWindow.setPosition(pos);
      // infoWindow.setContent(browserHasGeolocation ?
      //                       'Error: The Geolocation service failed.' :
      //                       'Error: Your browser doesn\'t support geolocation.');
      // infoWindow.open(map);
    }

    // clearDirections = ()=> {
    //   console.log(browserHasGeolocation ?
    //     'Error: The Geolocation service failed.' :
    //     'Error: Your browser doesn\'t support geolocation.')
    // }

    render() {
      // console.log('render direction form button')
      const { visible, onCancel, onCreate, onClear, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Get Directions"
          onCancel={onCancel}
          footer={[
          <Button key='onclear' type="danger" onClick={onClear}> Clear</Button>,
          <Button key='oncreate'type="primary" onClick={onCreate}> Go</Button>,
          <Button key='onexit' type="default" icon="fullscreen-exit" onClick={onCancel}> Map</Button>,
          ]}
          closeIcon={
            <Icon type="fullscreen-exit" />
          }
        >
          <Form layout="vertical">
            <Form.Item label="From">
              <Row gutter={3}>
              <Col span={22}>
                {getFieldDecorator('origin', {
                  rules: [{ required: true, message: 'Please input the start location!' }],
                })(<Input type="textarea" id='origin'/>)}
              </Col>
              <Col span={2}>
                <Button icon="environment" onClick={this.handleClick}>
                  {/* Get current location */}
                </Button>
              </Col>
            </Row>
            <div id = 'currLoc'></div>
            </Form.Item>
            <Form.Item label="To">
              {getFieldDecorator('destination',{
                rules: [{ required: true, message: 'Please input the destination!' }],
                initialValue: 'Charles W. Davidson College of Engineering',
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Travel Mode">
              {getFieldDecorator('travelMode', {
                initialValue: 'WALKING',
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="DRIVING">Driving</Radio.Button>
                  <Radio.Button value="TRANSIT">Transit</Radio.Button>
                  <Radio.Button value="WALKING">Walking</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
          <div id='directionPanel'></div>
        </Modal>
      );
    }
  },
);

export default class DirectionWindow extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     visible: false,
  //   };
  // }

  // showModal = () => {
  //   console.log('showModal')
  //   this.setState({ visible: true });
  // };

  handleCancel = () => {
    console.log('handle cancel')
    // this.setState({ visible: false });
    this.props.hideModal();
  };

  handleClear = () => {
    console.log('handle clear')
    const { form } = this.formRef.props;
    form.resetFields();
    document.getElementById('directionPanel').innerHTML = "";
    this.props.hideDirections();
    // this.setState({ visible: false });
    this.props.hideModal();
    this.props.closeDrawer();
  };

  handleCreate = () => {
    console.log('handle create')
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      this.props.showDirections();
      this.props.closeDrawer();
      this.props.setDirections(values.origin, values.destination, values.travelMode)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.props.showModal}>
          Get Directions
        </Button>
        <DirectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.modalState}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onClear={this.handleClear}
        />
      </div>
    );
  }
}