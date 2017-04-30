#!/bin/bash
if [ ! $1 ] 
then
	serverIp="localhost"
else
	serverIp=$1
fi
if [ ! $2 ] 
then
	topic="building/#"
else
	topic=$2
fi

mosquitto_sub -h $serverIp -t $topic -v
