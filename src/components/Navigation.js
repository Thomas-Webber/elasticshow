import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getIndexes} from '../reducers/mappings'
import {getIsConnected} from '../reducers/app'


function getNavigationItems() {
	let nav = Object.keys(CONFIG.indexes).map((index_key) => {
		const index = CONFIG.indexes[index_key];
		return {title: index.title, link: '/index/' + index_key, icon: 'table', css: null}
	});
	nav.push({title: 'Help support', link: '/help', icon: 'question-circle', css: {position:'absolute', bottom: '40px'}});
	nav.push({title: 'Logout', link: '/logout', icon: 'logout', css: {position:'absolute', bottom: '0'}});
	return nav;
}


type Props = {
	indexes: string[],
	isConnected: boolean,
	history: any,
	onReload: () => void,
};
class Navigation extends Component<Props> {
	defaultSelectedKey = Object.keys(CONFIG.indexes)[0];
	navigationItems = [];

	componentDidMount() {
		this.navigationItems = getNavigationItems();
	}

	navHandler(key) {
		let item = this.navigationItems[parseInt(key.key)]
		this.props.history.push(item.link);
	}

	render() {
		return (
			<Menu theme="dark"
				defaultSelectedKeys={[this.defaultSelectedKey]}
				mode="inline"
				onSelect={this.navHandler.bind(this)}
			>
			{
			this.navigationItems.map((x, i) => (
				<Menu.Item key={i} title={x.title} style={x.css}>
					<Icon type={x.icon} />
					<span>{x.title}</span>
				</Menu.Item>
			))
			}
			</Menu>
		);
	}
}

const mapStateToProps = state => ({
	indexes: getIndexes(state),
	isConnected: getIsConnected(state),
});

export default connect(mapStateToProps)(withRouter(Navigation));
