import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getIndexes} from '../reducers/mappings'
import {getIsConnected} from '../reducers/app'
import { NAVIGATION } from '../actions/constants';


function getNavigationItems() {
	let nav = Object.keys(CONFIG.indexes).map((index_key) => {
		const index = CONFIG.indexes[index_key];
		return {title: index.title, link: '/index/' + index_key, icon: 'table', css: null}
	});
	nav.push({title: 'Help support', link: '/help', icon: 'question-circle', css: null});
	nav.push({title: 'Logout', link: '/logout', icon: 'logout', css: null});
	return nav;
}

const NAVS = [
	...Object.keys(CONFIG.indexes).map((index_key) => '/index/' + index_key),
	'/help',
	'/logout'	
]


type Props = {
	indexes: string[],
	isConnected: boolean,
	history: any,
	onReload: () => void,
};
class Navigation extends Component<Props> {
	navHandler(key) {
		this.props.history.push(NAVS[parseInt(key.key)]);
	}

	render() {
		return (
			<>
			<img src="/images/logo.svg"
								width="100%"
								style={{padding: 25 }}
							/>
			<Menu theme="dark"
				defaultSelectedKeys={['0']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				onSelect={this.navHandler.bind(this)}
			>
				<Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="table" />
                <span>Datasets</span>
              </span>
            }
						>
				{Object.keys(CONFIG.indexes).map((index_key, index) => (
						<Menu.Item key={`${index}`}>{CONFIG.indexes[index_key].title}</Menu.Item>
				))}
				</Menu.SubMenu>

				<br/>
				
			<Menu.Item key={`${NAVS.length - 2}`} style={{marginTop: "25px"}} title="Help Support"><Icon type="question-circle"/>
				Help Support
			</Menu.Item>
			<Menu.Item key={`${NAVS.length - 1}`} title="Logout"><Icon type="logout"/>
				Logout
			</Menu.Item>
			
			</Menu>
			</>
		);
	}
}

const mapStateToProps = state => ({
	indexes: getIndexes(state),
	isConnected: getIsConnected(state),
});

export default connect(mapStateToProps)(withRouter(Navigation));
