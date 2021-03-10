// @flow

import React, {Component} from 'react';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { bool, string } from 'prop-types';

import DataBrowser from './DataBrowser';
import {connectApp} from '../../actions';
import { getIsLoading, getIsConnected, getKey } from '../../reducers/app';


type Props = {
	isConnected: boolean,
	isLoading: boolean,
	ukey: string,
	connectApp: (string, string, any) => void,
};

const DataBrowserContainer = (props) => {
	// props.connectApp(props.match.params.index, CONFIG.es_url);
	
	return (
		<Skeleton loading={props.isLoading} active>
			{props.isConnected && props.ukey && <DataBrowser />}
		</Skeleton>
	)
}

const mapStateToProps = state => {
	return {
		isConnected: getIsConnected(state),
		isLoading: getIsLoading(state),
		ukey: `${getKey(state)}`,
	}
}

const mapDispatchToProps = {
	connectApp
}

DataBrowserContainer.propTypes = {
	isLoading: bool.isRequired,
	isConnected: bool.isRequired,
	ukey: string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataBrowserContainer);
