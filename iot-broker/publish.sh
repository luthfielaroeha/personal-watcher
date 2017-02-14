#!/bin/bash

if [ ! $1 ] 
then
	serverIp="localhost"
fi
if [ ! $2 ] 
then
	topic="mqtt"
fi
if [ ! $3 ] 
then
	message="Hello, World"
fi

mosquitto_pub -h "$serverIp" -t "$topic" -m "$message"
