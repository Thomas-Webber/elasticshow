import React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {getIndexes} from '../reducers/mappings'
import {getIsConnected} from '../reducers/app'
import {
	normalizeSearchQuery,
	getImporterBaseUrl,
	getUrlParams,
} from '../utils'


type Props = {
	indexes: string[],
	isConnected: boolean,
	history: any,
};

const getImporterSearchParams = () => {
	let params = window.location.search;

	if (params) {
		params = normalizeSearchQuery(params);
		params += '&sidebar=true';
	} else {
		params = '?sidebar=true';
	}

	return params;
};

const navHandler = (key, history) => {
	switch (key) {
		case 'import':
			window.location.href = `${getImporterBaseUrl()}${getImporterSearchParams()}`;
			break;
		case 'browse':
			history.push('/');
			break;
		default:
			history.push(key);
			break;
	}
};

const Navigation = ({ indexes, isConnected, history }: Props) => {
	// const routeName = window.location.pathname.substring(1);
	let defaultSelectedKey = CONFIG.indexes[0].name;

	const items = [];
	for (const index of CONFIG.indexes) {
		items.push(
			<Menu.Item key={index.name} title={index.title}>
			<Icon type="table" />
			<span>{index.title}</span>
		</Menu.Item>
		)
	}

	return (
		<Menu theme="dark"
			defaultSelectedKeys={[defaultSelectedKey]}
			mode="inline"
			onSelect={({ key }) => navHandler(key, history)}
		>
			{items}
			<Menu.Item key="/logout" title="Logout" style={{position:'absolute', bottom: '0'}}>
			<Icon type="logout" />
			<span>Logout</span>
			</Menu.Item>
		</Menu>
	);
};

const mapStateToProps = state => ({
	indexes: getIndexes(state),
	isConnected: getIsConnected(state),
});

export default connect(mapStateToProps)(withRouter(Navigation));
