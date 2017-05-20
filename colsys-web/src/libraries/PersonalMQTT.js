import { connect } from 'mqtt';
import { notification } from 'antd';

class PersonalMQTT {
	constructor(config) {
		this.config = config;
		this.mqtt = connect(config.url, config.opt);
		this.topicActionMap = {};
		this.mqtt.subscribe("notification/#", { qos: 0});
	}

	connect(store) {
		this.mqtt.on('connect', () => {
			console.log("Connected");
		});

		this.mqtt.on('disconnect', () => {
			console.log("Disconnected");
		});

		this.mqtt.on('message', (topic, payload) => {
			payload = JSON.parse(payload.toString())
			if (topic.indexOf('sensor') > 0) {
				store.dispatch({
					type: 'ADD_SENSOR_DATA',
					sensorData: payload,
				});
			} else {
				notification.info({
					message: payload.rule + ' True',
					description: payload.data
				});
			}
		});

		this.mqtt.on('error', err => {
			console.log("Error");
		});
	}

	subscribe(sensorID) {
		const topicName = "building/sensor/" + sensorID
		console.log("Connected to " + topicName)
		this.mqtt.subscribe(topicName, { qos: 0});
	}

	unsubscribe(sensorID) {
		const topicName = "building/sensor/" + sensorID
		console.log("Unsubscribe " + topicName)
		this.mqtt.unsubscribe(topicName);
	}
}

export function createClient(config) {
	console.log("Called now")
	return new PersonalMQTT(config);
}
