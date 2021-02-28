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
	key: string,
};

const DataBrowserContainer = ({
	isConnected,
	isLoading,
	key,
}: Props) => (
	<Skeleton loading={isLoading} active>
		{isConnected && <DataBrowser key={key} />}
	</Skeleton>
);

const mapStateToProps = state => ({
	isConnected: getIsConnected(state),
	isLoading: getIsLoading(state),
	key: getKey(state),
});

DataBrowserContainer.propTypes = {
	isLoading: bool.isRequired,
	isConnected: bool.isRequired,
	key: string.isRequired,
};

export default connect(mapStateToProps)(DataBrowserContainer);
