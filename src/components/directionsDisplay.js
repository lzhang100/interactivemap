/*global google*/
import React from 'react';
import {DirectionsRenderer} from "react-google-maps";
import {message } from 'antd';


export default class DirectionsDisplay extends React.Component {
    constructor(props) {
        super(props);
        // console.log('directions display props', props)
        this.renderer = React.createRef()
        this.state = {
          display: false, //variable to check if get directions result from google maps api
          directions: '',
          // render_times: 0,
          // origin: this.props.origin,
          // destination: this.props.destination,
        };
      }
    
    // displayPanel = () =>{
    //   // var panel = ''
    //   // panel = this.renderer.current.getPanel()
    //   console.log(this.renderer.current.getPanel())
    // }

    render(){
        // this.state.render_times = this.state.render_times + 1
        // console.log('in render direction display');
        // console.log(this.state.render_times);
        // console.log('origin,', this.props.origin)
        // console.log('destination,', this.props.destination)
        // this.displayPanel()

        return (
          this.props.visible && this.state.display) && <DirectionsRenderer directions={this.state.directions} panel={ document.getElementById('directionPanel') }/>
          // this.props.visible && this.state.display) && <DirectionsRenderer directions={this.state.directions} panel={ document.getElementById('panel')} ref={this.renderer}/>
        }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      // if (this.props.origin !== prevProps.origin) {
      if (this.props.origin !== prevProps.origin || this.props.destination !== prevProps.destination || this.props.travelMode !== prevProps.travelMode) {
        // console.log('origin changed, need to rerender, new origin', this.props.origin)
        const DirectionsService = new google.maps.DirectionsService();
        // console.log('send message');
        // console.log('sendoriginState,', this.props.origin)
        // console.log('senddestState,', this.props.destination)
        // console.log(this.props.travelMode)
        // console.log('origin in form', this.props.origin)
        var origin_info = this.props.buildingsInfo.filter(b => b.name === this.props.origin);
        // var origin_coords = buildingsJSON.filter(b => b.desc === this.props.origin);
        var origin = ((origin_info.length === 0) ? this.props.origin : origin_info[0].center.lat.toString() + ', ' + origin_info[0].center.lng.toString());
        // console.log('origin send to google', origin)

        // console.log('destination in form', this.props.destination)
        var dest_info = this.props.buildingsInfo.filter(b => b.name === this.props.destination);
        var dest = ((dest_info.length === 0) ? this.props.destination : dest_info[0].center.lat.toString() + ', ' + dest_info[0].center.lng.toString());
        // console.log('dest send to google', dest)
        DirectionsService.route({
          origin: {query: origin},
          destination: {query: dest},
          travelMode: this.props.travelMode,
        }, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({directions: response},);
            this.setState({display: true});
          } else {
            console.error(`error fetching directions ${response}`);
            this.setState({directions: null});
            this.setState({display: false});
            message.error('Error fetching directions, please enter correct destination/origin', 5);
          }
        });
    }
  }
}