import {
	commitMutation,
	graphql,
} from 'react-relay';

import CustomMutationLibrary from './CustomMutationLibrary';

const mutation = graphql`
mutation addRuleMutation($input: RuleInput) {
	createRule(rule: $input) {
		id,
		name,
		index,
		status,
		rule,
		actionID
	}
}
`;

function sharedUpdater(store, newRule) {
	CustomMutationLibrary.insertData(store, 'rules', newRule)
}

function commit(
		environment,
		rule,
		callbackFn
		) {
	return commitMutation(
		environment,
		{
			mutation,
			variables: {
				input: {
					...rule
				}
			},
			updater: (store) => {
				const payload = store.getRootField('createRule');
				sharedUpdater(store, payload);
				if (typeof callbackFn === 'function') {
					callbackFn()
				}
			},
			optimisticUpdater: (store) => {
			},
		}
	);
}

export default {commit};
