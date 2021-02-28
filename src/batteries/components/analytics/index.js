import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Analytics from './components/Analytics';
import { getAppAnalytics, setSearchState } from '../../modules/actions';
import Loader from '../shared/Loader/Spinner';
import { getAppPlanByName, getAppAnalyticsByName } from '../../modules/selectors';
import RequestLogs from './components/RequestLogs';

let prevProps = {};
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: props.isPaid,
		};
	}

	static getDerivedStateFromProps(props) {
		if (prevProps.isFetching && !props.isFetching) {
			prevProps = props;
			return {
				isLoading: false,
			};
		}
		prevProps = props;
		return null;
	}

	componentDidMount() {
		// Comment out the below code to test paid user
		const { fetchAppAnalytics, isPaid } = this.props;
		if (isPaid) {
			fetchAppAnalytics();
		}
	}

	handleReplaySearch = (searchState) => {
		const {
 saveState, history, appName, handleReplayClick,
} = this.props;
		saveState(searchState);
		if (handleReplayClick) {
			handleReplayClick(appName);
		} else {
			history.push(`/app/${appName}/search-preview`);
		}
	};

	render() {
		const { isLoading } = this.state;
		const {
			noResults,
			popularSearches,
			searchVolume,
			popularResults,
			popularFilters,
			onClickViewAll,
			toolTipMessages,
			displayReplaySearch,
		} = this.props;
		const { appName, chartWidth, plan } = this.props;
		if (isLoading) {
			return <Loader />;
		}
		return (
			<React.Fragment>
				<Analytics
					toolTipMessages={toolTipMessages}
					noResults={noResults}
					chartWidth={chartWidth}
					plan={plan}
					popularSearches={popularSearches}
					popularFilters={popularFilters}
					popularResults={popularResults}
					searchVolume={searchVolume}
					onClickViewAll={onClickViewAll}
					displayReplaySearch={displayReplaySearch}
					handleReplaySearch={this.handleReplaySearch}
				/>
				<div css="margin-top: 20px">
					<RequestLogs size={100} appName={appName} />
				</div>
			</React.Fragment>
		);
	}
}
Main.defaultProps = {
	chartWidth: undefined,
	handleReplayClick: undefined,
	onClickViewAll: null,
	displayReplaySearch: false,
};
Main.propTypes = {
	appName: PropTypes.string.isRequired,
	onClickViewAll: PropTypes.object,
	chartWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	plan: PropTypes.string.isRequired,
	displayReplaySearch: PropTypes.bool,
	isPaid: PropTypes.bool.isRequired,
	fetchAppAnalytics: PropTypes.func.isRequired,
	popularSearches: PropTypes.array.isRequired,
	popularResults: PropTypes.array.isRequired,
	popularFilters: PropTypes.array.isRequired,
	searchVolume: PropTypes.array.isRequired,
	noResults: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired, //eslint-disable-line
	saveState: PropTypes.func.isRequired,
	handleReplayClick: PropTypes.func,
	history: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
	const appPlan = getAppPlanByName(state);
	const appAnalytics = getAppAnalyticsByName(state);
	return {
		plan: get(appPlan, 'plan', 'free'),
		isPaid: get(appPlan, 'isPaid', false),
		appName: get(state, '$getCurrentApp.name'),
		popularSearches: get(appAnalytics, 'popularSearches', []),
		popularResults: get(appAnalytics, 'popularResults', []),
		popularFilters: get(appAnalytics, 'popularFilters', []),
		searchVolume: get(appAnalytics, 'searchVolume', []),
		noResults: get(appAnalytics, 'noResultSearches', []),
		isFetching: get(state, '$getAppAnalytics.isFetching'),
	};
};
const mapDispatchToProps = dispatch => ({
	fetchAppAnalytics: (appName, plan) => dispatch(getAppAnalytics(appName, plan)),
	saveState: state => dispatch(setSearchState(state)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Main));
