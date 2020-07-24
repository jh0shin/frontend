import React from 'react';
import './HomeSelectField.css';
import HomeOfflineInput from './HomeOfflineInput';
import HomeLectureInput from './HomeLectureInput';
import { Link } from 'react-router-dom';

class HomeSelectField extends React.Component {
	render() {
		return (
			<div id="homeSelectFieldAnchorSpace">
				<div id="HomeSelectField" />
				<div className="field">
					<h1 id="requestTextOne">REQUEST</h1>
					<h2 id="requestTextTwo">자문 요청</h2>
					{this.props.isParent ? <HomeOfflineInput /> : <HomeLectureInput />}
					{this.props.isParent ? (
						<Link id="companyButton" to="/company">
							기업 자문 요청 페이지로 가기
						</Link>
					) : (
						<div id="companyNoButton" />
					)}
				</div>
			</div>
		);
	}
}

export default HomeSelectField;
