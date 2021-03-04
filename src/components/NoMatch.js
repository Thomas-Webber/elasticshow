import React from 'react';
import { Icon, Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const NoMatch = () => (
	<section
		style={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		}}
	>
		<br></br>
		<Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
		extra={(
			<Link to="/">
				<Button type="primary" size="large">
					Go Back
				</Button>
			</Link>)}
		/>
	</section>
);

export default NoMatch;
