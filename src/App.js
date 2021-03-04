import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navigation from './components/Navigation';
import NoMatch from './components/NoMatch';
import {HelpComponent} from './components/Help';
import {getUrlIndexParams} from './utils';
import DataBrowserContainer from './components/DataBrowser/DataBrowserContainer';
import configureStore from './store';

// shared components
import DefaultFlashMessage from './components/ErrorFlashMessage/FlashMessage';
import DefaultConnectApp from './components/ConnectApp/ConnectApp';

// shared reducers
// import * as appReducers from './reducers/app';
// import * as mappingsReducers from './reducers/mappings';

// shared utils
import { getLocalStorageItem, setLocalStorageData } from './utils';
import * as constants from './constants';

const store = configureStore();


const DataBrowserWrapper = props => (
	<Provider store={store}>
		<section>
			<DefaultFlashMessage />
			<DefaultConnectApp {...props} />
			<DataBrowserContainer {...props} index={props.match.params.index} />
		</section>
	</Provider>
);


class App extends Component {
	state = {
		isShowingSideBar: true,
	};

	componentDidMount() {
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

	render() {
		const mainPadding = CONFIG.readonly ? '0 20px' : '15px 20px 0 20px';
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Layout style={{ minHeight: '100vh' }} >
						<Layout.Sider theme="dark">
							<Navigation {...this.props} />
						</Layout.Sider>
						<Layout style={{ overflowX: 'hidden' }}>
							<Layout.Content style={{margin: 0, height: '100%', backgroundColor: '#fff'}} >
								<div style={{padding: mainPadding, background: '#fff', height: '100%', overflow: 'hidden'}}>
									<Switch>
										<Route exact
											path="/"
											render={props =>DataBrowserWrapper(props)}
										/>
										<Route exact
											path="/help"
											component={HelpComponent}
										/>

										<Route exact
											path="/index/:index"
											render={props => DataBrowserWrapper(props)}
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
