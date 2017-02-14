// @flow

import Menus from './containers/Menu';
import './App.css';

var mqtt = require('mqtt');

var host = 'ws://localhost:9001';
var client = mqtt.connect(host);

client.on('connect', function() {
	console.log("berhasil connect");
	client.subscribe("mqtt");
});

const App = () => {
	<Menu />	
}

export default App;
