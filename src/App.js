import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation';
import NoMatch from './components/NoMatch';


import DataBrowserContainer from './components/DataBrowserContainer/DataBrowserContainer';
import configureStore from './store';

// shared components
import DefaultFlashMessage from './components/ErrorFlashMessage/FlashMessage';
import DefaultConnectApp from './components/ConnectApp/ConnectApp';

// shared reducers
import * as appReducers from './reducers/app';
import * as mappingsReducers from './reducers/mappings';

// shared utils
import { getUrlParams, getLocalStorageItem, setLocalStorageData } from './utils';
import * as constants from './constants';

const store = configureStore();


const DataBrowserWrapper = props => (
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
);


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

		const localConnections = getLocalStorageItem(constants.LOCAL_CONNECTIONS);

		if (!localConnections) {
			setLocalStorageData(
				constants.LOCAL_CONNECTIONS,
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
							<Layout.Sider theme="dark" >
								<img
									src="/images/elasticshow.svg"
									width="100%"
									style={{ padding: 25 }}
								/>
								<Navigation />
							</Layout.Sider>
						)}
						<Layout style={{ overflowX: 'hidden' }}>
							<Layout.Content style={{margin: 0, height: '100%', backgroundColor: '#fff'}} >
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
							</Layout.Content>
						</Layout>
					</Layout>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
