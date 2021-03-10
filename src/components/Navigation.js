import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import {getIndexes} from '../reducers/mappings'
import {getIsConnected} from '../reducers/app'
import { NAVIGATION } from '../actions/constants';
import { withTranslation } from 'react-i18next';


const NAVS = [
	...Object.keys(CONFIG.indexes).map((index_key) => '/index/' + index_key),
	'/help',
	'/logout'	
]

type Props = {
	history: any,
};
class Navigation extends Component<Props> {

	navHandler(key) {
		this.props.history.push(NAVS[parseInt(key.key)]);
	}

	render() {
		let selectedNav = Math.max(0, NAVS.indexOf(this.props.location.pathname))

		return (
			<>
			<img src="/images/logo.svg"
								width="100%"
								style={{padding: 25 }}
							/>
			<Menu theme="dark"
				defaultSelectedKeys={[`${selectedNav}`]}
				defaultOpenKeys={['sub1']}
				mode="inline"
				onSelect={this.navHandler.bind(this)}
			>
				<Menu.SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="table" />
                <span>{this.props.t('nav.datasets')}</span>
              </span>
            }
						>
				{Object.keys(CONFIG.indexes).map((index_key, index) => (
						<Menu.Item key={`${index}`}>{CONFIG.indexes[index_key].title}</Menu.Item>
				))}
				</Menu.SubMenu>

				<br/>
				
			<Menu.Item key={`${NAVS.length - 2}`} style={{marginTop: "25px"}} title={this.props.t('nav.support')}><Icon type="question-circle"/>
				{this.props.t('nav.help')}
			</Menu.Item>
			<Menu.Item key={`${NAVS.length - 1}`} title={this.props.t('nav.logout')}><Icon type="logout"/>
				{this.props.t('nav.logout')}
			</Menu.Item>
			
			</Menu>
			</>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(withTranslation()(Navigation)));
