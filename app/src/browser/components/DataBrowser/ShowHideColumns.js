// @flow

import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Dropdown } from 'antd';

import {
	getColumns,
	getVisibleColumns,
	getNestedVisibleColumns,
	getNestedColumns,
} from '../../reducers/mappings';
import { getIsShowingNestedColumns } from '../../reducers/nestedColumns';
import {
	setVisibleColumns,
	setNestedVisibleColumns,
} from '../../actions/mappings';
import colors from '../theme/colors';

const { Group } = Checkbox;

type Props = {
	columns: string[],
	nestedColumns: string[],
	visibleColumns: string[],
	setVisibleColumns: (any) => void,
	nestedVisibleColumns: string[],
	isShowingNestedColumns: boolean,
	setNestedVisibleColumns: (any) => void,
};

type State = {
	showDropdown: boolean,
};
class ShowHideColumns extends Component<Props, State> {
	showHideDropdownNode = createRef();

	state = {
		showDropdown: false,
	};

	componentDidMount() {
		document.addEventListener(
			'mousedown',
			this.handleDropdownOutsideClick,
			false,
		);
	}

	componentWillUnmount() {
		document.removeEventListener(
			'mousedown',
			this.handleDropdownOutsideClick,
			false,
		);
	}

	handleDropdownOutsideClick = (e: any) => {
		if (
			this.showHideDropdownNode &&
			this.showHideDropdownNode.current &&
			this.showHideDropdownNode.current.contains &&
			this.showHideDropdownNode.current.contains(e.target)
		) {
			return;
		}

		if (e.target.id === 'show-hide-button') {
			return;
		}

		this.setState({
			showDropdown: false,
		});
	};

	handleSelectAll = e => {
		const { checked } = e.target;
		const {
			columns,
			nestedColumns,
			isShowingNestedColumns,
			setNestedVisibleColumns: onSetNestedVisibleColumns,
			setVisibleColumns: onSetVisibleColumns,
		} = this.props;
		let visibleColumns;

		if (checked) {
			visibleColumns = isShowingNestedColumns ? nestedColumns : columns;
		} else {
			visibleColumns = [];
		}

		if (isShowingNestedColumns) {
			onSetNestedVisibleColumns(visibleColumns);
		} else {
			onSetVisibleColumns(visibleColumns);
		}
	};

	handleVisibleColumnsChange = visibleColumns => {
		const metaIndex = visibleColumns.indexOf('_index');
		const metaType = visibleColumns.indexOf('_type');
		let currentVissibleColums = visibleColumns;

		// to append meta fields at the beginning of array
		if (metaType > -1 && metaType > 1) {
			currentVissibleColums.splice(metaType, 1);
			currentVissibleColums = ['_type', ...currentVissibleColums];
		}

		if (metaIndex > -1 && metaIndex > 1) {
			currentVissibleColums.splice(metaIndex, 1);
			currentVissibleColums = ['_index', ...currentVissibleColums];
		}

		if (this.props.isShowingNestedColumns) {
			this.props.setNestedVisibleColumns(currentVissibleColums);
		} else {
			this.props.setVisibleColumns(currentVissibleColums);
		}
	};

	toggleDropDown = () => {
		this.setState(prevState => ({
			showDropdown: !prevState.showDropdown,
		}));
	};

	render() {
		const {
			columns: allColumns,
			nestedColumns: allNestedColumns,
			visibleColumns,
			isShowingNestedColumns,
			nestedVisibleColumns,
		} = this.props;
		const { showDropdown } = this.state;
		const allMappingColumns = isShowingNestedColumns
			? allNestedColumns
			: allColumns;
		const columns = isShowingNestedColumns
			? nestedVisibleColumns
			: visibleColumns;

		return (
			<Dropdown
				ref={this.showHideDropdownNode}
				placement="bottomRight"
				overlay={
					<div
						style={{
							background: colors.white,
							borderRadius: 4,
							padding: 10,
							boxShadow: '0 1px 6px rgba(0, 0, 0, .2)',
							maxHeight: '75vh',
							overflowY: 'auto',
						}}
						ref={this.showHideDropdownNode}
					>
						<Checkbox
							checked={
								columns.length === allMappingColumns.length
							}
							indeterminate={
								columns.length < allMappingColumns.length &&
								columns.length
							}
							style={{
								marginBottom: '5px',
								fontWeight: 'bold',
							}}
							onChange={this.handleSelectAll}
						>
							Select All
						</Checkbox>
						<Group
							options={allMappingColumns}
							style={{
								display: 'grid',
								gridGap: '5px',
							}}
							value={columns}
							onChange={this.handleVisibleColumnsChange}
						/>
					</div>
				}
				visible={showDropdown}
				trigger={['click']}
				onClick={this.toggleDropDown}
			>
				<Button
					style={{
						marginLeft: '5px',
						'.anticon': {
							fontSize: '18px',
						},
					}}
					id="show-hide-button"
					icon="setting"
				/>
			</Dropdown>
		);
	}
}

const mapStateToProps = state => ({
	columns: getColumns(state),
	nestedColumns: getNestedColumns(state),
	visibleColumns: getVisibleColumns(state),
	nestedVisibleColumns: getNestedVisibleColumns(state),
	isShowingNestedColumns: getIsShowingNestedColumns(state),
});

const mapDispatchToProps = {
	setVisibleColumns,
	setNestedVisibleColumns,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowHideColumns);
