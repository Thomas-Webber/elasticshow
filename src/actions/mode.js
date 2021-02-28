import { MODE } from './constants';
import { MODES } from '../constants';

const setMode = mode => {
	if (CONFIG.readonly) {
		mode = MODES.VIEW
	}
	return {type: MODE.SET_MODE, mode}
}

export default setMode;
