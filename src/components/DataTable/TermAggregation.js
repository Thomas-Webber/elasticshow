// @flow

import React from 'react';
import { Popover, Icon } from 'antd';
import { MultiList, DynamicRangeSlider, DateRange, CategorySearch } from '@appbaseio/reactivesearch';
import { css } from 'react-emotion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import {withTranslation} from 'react-i18next';
import Flex from '../Flex';

import filterIconStyles from '../CommonStyles/filterIcons';
import overflowStyles from '../CommonStyles/overflowText';
import termAggregationStyles from '../CommonStyles/termAggregations';
import colors from '../theme/colors';

type Props = {
	field: string,
	type: string,
};

type State = {
	hasMounted: boolean,
};


class TermAggregation extends React.Component<Props, State> {
	state = {
		hasMounted: true,
	};

	onUpdate = () => {
		this.setState(
			() => ({
				hasMounted: false,
			}),
			() =>
				setTimeout(() =>
					this.setState({
						hasMounted: true,
					}),
				),
		);
	};

	renderPopoverSearchComponent() {
		const { field, type } = this.props;
		let componentId = field;
		if (field === '_type') {
			componentId = 'typeField';
		}
		if (field === '_index') {
			componentId = 'indexField';
		}
		if (type === 'long') {
			return (
				<DynamicRangeSlider componentId={componentId} dataField={field} />
			)
		} else if (type === 'date') {
			return (
				<DateRange componentId={componentId} dataField={field}
					numberOfMonths={1}
					innerClass={{
						input: `ant-input ${css`
							height: 32px;
							background: ${colors.white} !important;
						`}`
					}}
					innerClass={{
					"input-container": `${css`
						div {border: none !important; }
						input {
							height: 32px !important;
							touch-action: manipulation;
							padding: 8px 12px !important;
							border: 1px solid #ccc !important;
							width: 100%;
							border-radius: 4px;
						}
						input:hover {
							border-color: #40a9ff !important;
						}
					`}`}}
				/>
			)
		} 
			//&& field.match(/.+\.keyword$/) === null
		// else if (type === 'text' ) {
		// 	return (
		// 		<CategorySearch componentId={componentId} dataField={[field]} categoryField={field}
    // 			debounce={100}
		// 			innerClass={{
		// 				input: `ant-input ${css`
		// 					background: ${colors.white} !important;
		// 				`}`}}
					// render={({ loading, error, data, value, downshiftProps: { isOpen, getItemProps } }) => {
					// 	if (loading) {
					// 			return <div>Fetching Suggestions.</div>;
					// 	}
					// 	if (error) {
					// 			return <div>Something went wrong! Error details {JSON.stringify(error)}</div>;
					// 	}
					// 	console.log(data);
					// 	return isOpen && Boolean(value.length) ? (
					// 			<div>
					// 					{data.slice(0, 5).map((suggestion, index) => (
					// 							<div key={suggestion.value} {...getItemProps({ item: suggestion })}>
					// 									{suggestion.value}
					// 							</div>
					// 					))}
					// 					{Boolean(value.length) && (
					// 							<div {...getItemProps({ item: { label: value, value: value } })}>
					// 									Show all results for "{value}"
					// 							</div>
					// 					)}
					// 			</div>
					// 	) : null;
					// }}
		// 		/>
		// 	)
		// }

		return (
			<MultiList
				componentId={componentId}
				dataField={field}
				size={1000}
				showLoadMore={true}
				showMissing={true}
				transformData={(data) => {
					if (data[0].key === null) {
						data[0].key = "N/A"
					}
					return data;
				}}
				css={termAggregationStyles}
				placeholder={this.props.t('browser.search')}
				innerClass={{
					input: `ant-input ${css`
						height: 32px;
						background: ${colors.white} !important;
					`}`,
					checkbox: 'ant-checkbox-input',
				}}
				renderItem={(label, count) => {
					if (!label) {
						label = "";
					}
					return (
					<Flex
						alignItem="center"
						wrap="nowrap"
						justifyContent="space-between"
						css={{
							width: '100%',
						}}
					>
						<span title={label}
							css={{ maxWidth: '170px' }}
							className={overflowStyles}
						>
							{label}
						</span>
						<span>{count}</span>
					</Flex>
				)}}
				loader="Loading..."
				renderNoResults={() => <p>{this.props.t('browser.no_results')}</p>}
			/>
		);
	}
	
	render() {
		return (
			<Popover
				content={this.state.hasMounted && this.renderPopoverSearchComponent()}
				title={
					<Flex justifyContent="space-between" alignItems="center">
						<span>{this.props.t('browser.filter')}</span>
						<Icon
							type="sync"
							css={css`
								cursor: pointer;
							`}
							onClick={this.onUpdate}
						/>
					</Flex>
				}
				placement="bottomRight"
				arrowPointAtCenter
			>
				<FontAwesomeIcon icon={faFilter} className={filterIconStyles} />
			</Popover>
		);
	}
}

export default withTranslation()(TermAggregation);
