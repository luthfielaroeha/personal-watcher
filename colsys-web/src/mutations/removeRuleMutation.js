import {
	commitMutation,
	graphql,
} from 'react-relay';

import CustomMutationLibrary from './CustomMutationLibrary';

const mutation = graphql`
mutation removeRuleMutation($input: RuleDeleteInput) {
	deleteRule(input: $input) {
		id,
		name,
		index,
		status
	}
}
`;

function sharedUpdater(store, deletedID) {
	CustomMutationLibrary.deleteByID(store, 'rules', deletedID)
}

function commit(
		environment,
		ruleID,
		callbackFn
		) {
	return commitMutation(
			environment,
			{
				mutation,
				variables: {
					input: {
						id: ruleID
					}
				},
				updater: (store) => {
					const payload = store.getRootField('deleteRule');
					sharedUpdater(store, payload.getValue('id'));
					if (typeof callbackFn == 'function') {
						callbackFn()
					}
				},
				optimisticUpdater: (store) => {
					sharedUpdater(store, ruleID);
				},
			}
			);
}

export default {commit};
