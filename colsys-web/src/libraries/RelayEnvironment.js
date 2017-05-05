const {
	Environment,
	Network,
	RecordSource,
	Store,
} = require('relay-runtime');

function fetchQuery(
		operation,
		variables,
		cacheConfig,
		uploadables,
		) {
	return fetch('http://localhost:8080/graphql', {
			mode: 'cors',
			method: 'POST',
			headers: { 'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, // Add authentication and other headers here
			body: JSON.stringify({
				query: operation.text, // GraphQL text from input
				variables,
			}),
			}).then(response => {
		return response.json();
	}).catch(error => {
		console.log("Error: " + error);
	})
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
	network,
	store,
});
