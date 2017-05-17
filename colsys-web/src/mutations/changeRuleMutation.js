import {
	commitMutation,
	graphql,
} from 'react-relay';

import CustomMutationLibrary from './CustomMutationLibrary';

const mutation = graphql`
mutation changeRuleMutation($input: RuleUpdateInput) {
	updateRule(input: $input) {
		id,
		name,
		index,
		status,
		rule,
		actionID
	}
}
`;

function sharedUpdater(store, ruleID, updatedRule) {
	CustomMutationLibrary.updateData(store, 'rules', ruleID, updatedRule)
}

function commit(
		environment,
		ruleID,
		rule,
		callbackFn
		) {
	return commitMutation(
		environment,
		{
			mutation,
			variables: {
				input: {
					id: ruleID,
					rule
				}
			},
			updater: (store) => {
				const payload = store.getRootField('updateRule');
				console.log(payload)
				sharedUpdater(store, ruleID, payload);
				if (typeof callbackFn === 'function') {
					callbackFn()
				}
			},
			optimisticUpdater: (store) => {
			},
		}
	);
}

export default { commit };
