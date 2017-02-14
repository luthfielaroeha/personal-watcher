if [ $# -eq 0 ] 
then
	docker exec -i -t colsys-graphql /bin/bash
else
	docker exec -i -t colsys-db /bin/bash
fi
