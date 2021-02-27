import colors from '../theme/colors';

export default {
	maxWidth: 200,
	'.antd-checkbox-input:checked + label::before': {
		borderColor: `${colors.primary}`,
	},
	'.antd-checkbox-input:checked + label::after': {
		left: 'calc(1px + 12px/5)',
		width: 'calc(12px / 2)',
		height: 'calc(12px / 5)',
		marginTop: 'calc(12px / -2 / 2 * 0.8)',
		top: '11px',
	},
	'.antd-checkbox-input + label::before': {
		borderRadius: '3px',
		color: `${colors.primary}`,
		borderWidth: '1px',
		height: '12px',
		width: '12px',
	},
	'.antd-checkbox-input:hover + label::before': {
		borderColor: `${colors.primary}`,
	},
	label: {
		alignItems: 'center',
	},
};
