#!/bin/bash
if [ $# -eq 0 ] 
then
	docker exec -i -t colsys-backend /bin/bash
elif [ "$1" == "ai" ]
then
	docker exec -i -t colsys-ai /bin/bash
else
	docker exec -i -t colsys-db /bin/bash
fi
