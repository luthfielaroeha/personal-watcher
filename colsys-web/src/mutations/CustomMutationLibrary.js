function deleteByID(store, rootFieldName, deletedID) {
	const record = store.getRoot()
	const edges = record.getLinkedRecords(rootFieldName);
	if (!edges) {
		return;
	}
	let nextEdges;
	for (let ii = 0; ii < edges.length; ii++) {
		const node = edges[ii];
		if (node != null && node.getDataID() === deletedID) {
			if (nextEdges === undefined) {
				nextEdges = edges.slice(0, ii);
			}
		} else if (nextEdges !== undefined) {
			nextEdges.push(node);
		}
	}
	if (nextEdges !== undefined) {
		record.setLinkedRecords(nextEdges, rootFieldName);
	}
}

function insertData(store, rootFieldName, newData) {
	const record = store.getRoot()
	const edges = record.getLinkedRecords(rootFieldName);
	if (!edges) {
		return;
	}
	edges.unshift(newData)
	if (edges !== undefined) {
		record.setLinkedRecords(edges, rootFieldName);
	}
}

function updateData(store, rootFieldName, ruleID, newData) {
	const record = store.getRoot()
	const edges = record.getLinkedRecords(rootFieldName);
	if (!edges) {
		return;
	}
	let nextEdges = [];
	for (let ii = 0; ii < edges.length; ii++) {
		const node = edges[ii];
		if (node != null && node.getDataID() === ruleID) {
			nextEdges.push(newData);
		} else {
			nextEdges.push(node);
		}
	}
	if (nextEdges !== undefined) {
		record.setLinkedRecords(nextEdges, rootFieldName);
	}
}

module.exports = {
	deleteByID,
	insertData,
	updateData
};
