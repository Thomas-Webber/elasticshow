// @flow

import React from 'react';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { bool, string } from 'prop-types';

import DataBrowser from '../DataBrowser';

import { getIsLoading, getIsConnected, getKey } from '../../reducers/app';

type Props = {
	isConnected: boolean,
	isLoading: boolean,
	ukey: string,
};

const DataBrowserContainer = ({
	isConnected,
	isLoading,
	ukey,
}: Props) => {
	return (
		<Skeleton loading={isLoading} active>
			{isConnected && ukey && <DataBrowser ukey={ukey} />}
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
