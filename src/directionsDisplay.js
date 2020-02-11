/*global google*/
import React from 'react';
import {DirectionsRenderer} from "react-google-maps";

export default class DirectionsDisplay extends React.Component {
    constructor(props) {
        super(props);
        console.log('directions display props', props)
        this.state = {
          display: false,
          directions: '',
          // render_times: 0,
          // origin: this.props.origin,
          // destination: this.props.destination,
        };
      }
    
    render(){
        // this.state.render_times = this.state.render_times + 1
        // console.log('in render direction display');
        // console.log(this.state.render_times);
        // console.log('origin,', this.props.origin)
        // console.log('destination,', this.props.destination)
        return (this.props.visible && this.state.display) && <DirectionsRenderer directions={this.state.directions} panel={ document.getElementById('panel') }/>
    }

    componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.origin !== prevProps.origin) {
        // console.log('origin changed, need to rerender, new origin', this.props.origin)
        const DirectionsService = new google.maps.DirectionsService();
        // console.log('send message');
        // console.log('sendoriginState,', this.props.origin)
        // console.log('senddestState,', this.props.destination)
        DirectionsService.route({
          // origin: new google.maps.LatLng(37.336236, -121.881530),
          origin: {query: this.props.origin},
          // destination: new google.maps.LatLng(37.334129, -121.884316),
          destination: {query: this.props.destination},
          // travelMode: google.maps.TravelMode.WALKING,
          travelMode: 'WALKING',
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
              display: true
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
    }
  }
}