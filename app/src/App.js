import React, { Component, lazy, Suspense } from 'react';
import { Layout, Modal, Skeleton } from 'antd';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mediaMin } from '@divyanshu013/media';
import DataBrowser from './browser';
import { css, cx, injectGlobal } from 'react-emotion';
import {
	Flex,
	utils,
	constants,
	store,
	colors,
} from './browser';

import Navigation from './components/Navigation';
import NoMatch from './components/NoMatch';
// import OldDejavuBanner from './components/OldDejavuBanner';

// import logo from './images/dejavu-logo.svg';

// const SearchPreview = lazy(() => import('./components/SearchPreview'));
// const QueryExplorer = lazy(() => import('./components/QueryExplorer'));

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

			return DataBrowser;
		}

		return DataBrowser;
	};

	render() {
		const {
			isShowingSideBar,
			isShowingFooter,
			isShowingVideo,
		} = this.state;

		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout className="heremyclass"
						style={{ minHeight: isShowingSideBar ? '100vh' : 'auto' }}
					>
						{isShowingSideBar && (
							<Sider
								theme="light"
								css={{display: 'block'}}
							>
								{/* <img
									src={logo}
									alt="Dejavu"
									width="100%"
									css={{ padding: 25 }}
								/> */}
								<Navigation />
							</Sider>
						)}
						<Layout css={{ overflowX: 'hidden !important' }}>
							<Content
								css={{
									margin: isShowingSideBar ? '15px 25px' : 0,
									height: isShowingFooter ? '95%' : '100%',
								}}
							>
								<div css={{padding: 20, background: '#fff'}}>
									<Switch>
										<Route
											exact
											path="/"
											render={props =>DataBrowser(props)}
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
