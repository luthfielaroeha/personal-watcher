import { combineReducers } from 'redux';

import colsys from './colsys';
import rulemodal from './rulemodal';

const ColsysWeb = combineReducers({
	colsys,
	rulemodal
})

export default ColsysWeb
