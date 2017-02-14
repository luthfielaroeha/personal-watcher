// @flow

import React, { Component } from 'react';
import { Container, Divider } from 'semantic-ui-react';

import Headerbar from '../Headerbar';
import Content from '../Content';
import './App.css';

var mqtt = require('mqtt');

var host = 'ws://localhost:9001';
var client = mqtt.connect(host);

client.on('connect', function() {
	console.log("berhasil connect");
	client.subscribe("mqtt");
});

class App extends Component {
	render() {
		return (
			<Container fluid>
				<Headerbar />	
				<Divider hidden />
				<Content />
			</Container>
		)
	}
}

export default App;
