import React from 'react';
import './AppBottom.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Body = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #504f4b;
`;
const SLink = styled(Link)`
	margin: 20px;
	padding: 5px;
	text-align: center;
	text-decoration:none;
	color: #fcf4cc;
	background-color:none;
`;
const Bottons = styled.div`
	display: flex;
	justify-content: center;
`;

function AppBottom() {
	return (
		<Body>
			<Bottons>
				<SLink to="/about#Use">이용 약관</SLink>
				<SLink to="/about#Private">개인정보 처리 방침</SLink>
			</Bottons>
			<div className="bottom">
				{/* <p>서울시 성북구 안암로 145 고려대학교 KU개척마을 S304호</p> */}

				<p>경기 성남시 분당구 황새울로 335번길 8덕산빌딩 4층 퍼스트비지니스센터 409호</p>
				<p>대표자 : 이민수 (사업자 등록번호 : 240-86-01519)</p>
				<p>phone : 010-2645-3704</p>
				<p>email : contact@hakwongo.com</p>
				<p>2020 ㈜ 학원고 All rights reserved</p>
				<br />
			</div>
		</Body>
	);
}

export default AppBottom;
