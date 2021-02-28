import React, { Component, lazy, Suspense } from 'react';
import { Layout, Modal, Skeleton } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mediaMin } from '@divyanshu013/media';
import Navigation from './components/Navigation';
import NoMatch from './components/NoMatch';

import logo from './images/dejavu-logo.svg';

import { ConfigProvider } from 'antd';
import DataBrowserContainer from './components/DataBrowserContainer/DataBrowserContainer';
import configureStore from './store';

// shared components
import DefaultFlex from './components/Flex';
import DefaultFlashMessage from './components/ErrorFlashMessage/FlashMessage';
import DefaultConnectApp from './components/ConnectApp/ConnectApp';

// shared reducers
import * as appReducers from './reducers/app';
import * as mappingsReducers from './reducers/mappings';

// shared utils
import * as utils from './utils';

// shared constants
import * as constants from './constants';

// shared theme
import colors from './components/theme/colors';

// import './antd.css';

// shared store
const store = configureStore();

function WithConfigProvider(props) {
	return (
		<ConfigProvider prefixCls="ant">
			{/* eslint-disable-next-line react/prop-types */}
			{props.children}
		</ConfigProvider>
	);
}

const Flex = props => (
	<WithConfigProvider>
		<DefaultFlex {...props} />
	</WithConfigProvider>
);

const FlashMessage = props => (
	<WithConfigProvider>
		<DefaultFlashMessage {...props} />
	</WithConfigProvider>
);

const ConnectApp = props => (
	<WithConfigProvider>
		<DefaultConnectApp {...props} />
	</WithConfigProvider>
);

const DataBrowserWrapper = props => (
	<WithConfigProvider>
		<Provider store={store}>
			<BrowserRouter>
				<section>
					<DefaultFlashMessage />
					<DefaultConnectApp {...props} />
					{/* eslint-disable-next-line react/prop-types */}
					<DataBrowserContainer />
				</section>
			</BrowserRouter>
		</Provider>
	</WithConfigProvider>
);


const { getUrlParams, getLocalStorageItem, setLocalStorageData } = utils;
const { LOCAL_CONNECTIONS } = constants;
const { Content, Sider } = Layout;


class App extends Component {
	state = {
		isShowingSideBar: true,
	};

	componentDidMount() {
		const { sidebar, footer } = getUrlParams(window.location.search);

		if (sidebar && sidebar === 'false') {
			this.setSideBarVisibility(false);
		}

		if (footer && footer === 'false') {
			this.setFooterVisibility(false);
		}

		const localConnections = getLocalStorageItem(LOCAL_CONNECTIONS);

		if (!localConnections) {
			setLocalStorageData(
				LOCAL_CONNECTIONS,
				JSON.stringify({
					pastApps: [],
				}),
			);
		}
	}

	setSideBarVisibility = isShowingSideBar => {
		this.setState({
			isShowingSideBar,
		});
	};

	setFooterVisibility = isShowingFooter => {
		this.setState({
			isShowingFooter,
		});
	};

	showVideoModal = () => {
		this.setState({
			isShowingVideo: true,
		});
	};

	hideVideoModal = () => {
		this.setState({
			isShowingVideo: false,
		});
	};

	renderExtensionRoutes = () => {
		const { route } = getUrlParams(window.location.search);

		if (route) {
			// if (route === 'preview') {
			// 	return withSuspense(SearchPreview);
			// }

			// if (route === 'query') {
			// 	return withSuspense(QueryExplorer);
			// }

			return DataBrowserWrapper;
		}

		return DataBrowserWrapper;
	};

	render() {
		const {
			isShowingSideBar,
			isShowingFooter,
			isShowingVideo,
		} = this.state;

		const mainPadding = CONFIG.readonly ? '0 20px' : '15px 20px 0 20px';

		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout
						style={{ minHeight: isShowingSideBar ? '100vh' : 'auto'}}
					>
						{isShowingSideBar && (
							<Sider
								theme="light"
								style={{display: 'block'}}
							>
								<img
									src={logo}
									alt="Dejavu"
									width="100%"
									style={{ padding: 25 }}
								/>
								<Navigation />
							</Sider>
						)}
						<Layout style={{ overflowX: 'hidden' }}>
							<Content style={{margin: 0, height: '100%', backgroundColor: '#fff'}} >
								<div style={{padding: mainPadding, background: '#fff', height: '100%', overflow: 'hidden'}}>
									<Switch>
										<Route
											exact
											path="/"
											render={props =>DataBrowserWrapper(props)}
										/>
										<Route
											path="/404"
											component={NoMatch}
										/>
										<Route component={NoMatch} />
									</Switch>
								</div>
							</Content>
						</Layout>
					</Layout>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
