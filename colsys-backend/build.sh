cd pkg/domain && go get -d -v && go build . && cd ../../
cd pkg/implementation/postgres && go get -d -v && go build . && cd ../../../
cd pkg/graphql && go get -d -v && go build . && cd ../../
cd cmd/AutoAI && go get -d -v && go build . && cd ../../
cd cmd/GraphQL && go get -d -v && go build . && cd ../../

if [ "$1" == "ai" ] 
then
	AutoAI
else
	GraphQL
fi
