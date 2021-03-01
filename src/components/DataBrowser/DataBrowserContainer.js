// @flow

import React from 'react';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { bool, string } from 'prop-types';

import DataBrowser from './DataBrowser';

import { getIsLoading, getIsConnected, getKey } from '../../reducers/app';

type Props = {
	isConnected: boolean,
	isLoading: boolean,
	ukey: string,
	index: string,
};

const DataBrowserContainer = ({
	isConnected,
	isLoading,
	ukey,
	index,
}: Props) => {
	console.log(index);
	return (
		<Skeleton loading={isLoading} active>
			{isConnected && ukey && <DataBrowser ukey={ukey} index={index} />}
		</Skeleton>
	);
}

const mapStateToProps = state => {
	return {
		isConnected: getIsConnected(state),
		isLoading: getIsLoading(state),
		ukey: `${getKey(state)}`,
	}
}

DataBrowserContainer.propTypes = {
	isLoading: bool.isRequired,
	isConnected: bool.isRequired,
	ukey: string.isRequired,
};

export default connect(mapStateToProps)(DataBrowserContainer);
