import { combineReducers } from 'redux';

import colsys from './colsys';
import rulemodal from './rulemodal';
import chart from './chart';

const ColsysWeb = combineReducers({
	colsys,
	rulemodal,
	chart
})

export default ColsysWeb
