import React from 'react';
import 'antd/dist/antd.css';
import './css/app.css'
import { Button, Modal, Form, Input, Radio, Row, Col } from 'antd';

const DirectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    handleClick = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          // var location = pos.lat + ',' + pos.lng
          console.log('get geolocation', pos)
          console.log('get geolocation, lat:', String(pos.lat), ' lon:', String(pos.lng))
          var currLoc = 'Current Location: lat:' + String(pos.lat) + ' lon:' + String(pos.lng)
          document.getElementById('currLoc').innerHTML = currLoc
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

    render() {
      // console.log('render direction form button')
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Get Directions"
          okText="Go"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Origin">
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
            <Form.Item label="Destination">
              {getFieldDecorator('destination',{
                rules: [{ required: true, message: 'Please input the destination!' }],
                initialValue: 'Charles W. Davidson College of Engineering',
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="Type">
              {getFieldDecorator('radio-button', {
                initialValue: 'c',
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="a">Driving</Radio.Button>
                  <Radio.Button value="b">Transit</Radio.Button>
                  <Radio.Button value="c">Walking</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

export default class DirectionWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModal = () => {
    console.log('showModal')
    this.setState({ visible: true });
  };

  handleCancel = () => {
    console.log('handle cancel')
    this.setState({ visible: false });
  };

  handleCreate = () => {
    console.log('handle create')
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
      this.props.showDirections();
      this.props.closeDrawer();
      this.props.setDirections(values.origin, values.destination)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Get Directions
        </Button>
        <DirectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}