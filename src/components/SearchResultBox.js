import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// const SLink = styled(Link)`
// 	display:flex;
// 	height: 100px;
// 	width: 100%;
// 	margin-bottom: 1vh;
// 	color:#504f4b;
// 	border:none;
// 	background-color: #fcf4cc;
// 	text-decoration:none;
// 	flex-direction: column;
// 	align-items:center;
// 	justify-content:space-around;
// 	&:hover{
// 		opacity: 0.8;
// 		transform: scale(0.98);
// 	}
// `;

// const SCoronaLink = styled(Link)`
// 	display:flex;
// 	height: 100px;
// 	width: 100%;
// 	margin-bottom: 1vh;
// 	color:#504f4b;
// 	border: none;
// 	background-color: #fa8072;
// 	text-decoration:none;
// 	flex-direction: column;
// 	align-items:center;
// 	justify-content:space-around;
// 	&:hover{
// 		opacity: 0.8;
// 		transform: scale(0.98);
// 	}
// `;

// function SearchResultBox({ name, address, id, corona }) {
// 	const idUrl = `hakwonPage/${id}`;
// 	if (corona === '학원') {
// 		return (
// 			<SCoronaLink to={idUrl}>
// 				<h2>{name}</h2>
// 				<h5>주소: {address}</h5>
// 				<h5>현재 오프라인 수업 불가능</h5>
// 			</SCoronaLink>
// 		);
// 	} else {
// 		return (
// 			<SLink to={idUrl}>
// 				<h2>{name}</h2>
// 				<h5>주소: {address}</h5>
// 				<h5>현재 오프라인 수업 가능</h5>
// 			</SLink>
// 		);
// 	}
// }

const ResultBox = styled.div`
	display: flex;
	height: 100px;
	width: 100%;
	margin-bottom: 1vh;
	color: #504f4b;
	border: none;
	background-color: #fcf4cc;
	text-decoration: none;
	flex-direction: row;
	justify-content: space-around;
	padding-top: 5px;
	padding-bottom: 5px;
`;

const ResultBoxRed = styled.div`
	display: flex;
	height: 100px;
	width: 100%;
	margin-bottom: 1vh;
	color: #504f4b;
	border: none;
	background-color: #fa8072;
	text-decoration: none;
	flex-direction: row;
	justify-content: space-around;
	padding-top: 5px;
	padding-bottom: 5px;
`;

const ResultText = styled.div`
	display: flex;
	width: 70%;
	flex-direction: column;
	align-items: start;
	justify-content: space-around;
`;

const Warning = styled.div`
	display: flex;
	width: 20%;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	text-align: center;
`;

function SearchResultBox({ name, address, id, corona, callnum }) {
	let Rcallnum = '';

	if (callnum === '') {
		Rcallnum = '전화번호 정보가 없습니다';
	} else {
		Rcallnum = callnum;
	}

	if (corona === '학원') {
		return (
			<ResultBoxRed>
				<ResultText>
					<h2>{name}</h2>
					<h5>주소: {address}</h5>
					<h5>전화번호: {Rcallnum}</h5>
				</ResultText>
				<Warning>
					<h2>현재 오프라인 수업 불가능</h2>
				</Warning>
			</ResultBoxRed>
		);
	} else {
		return (
			<ResultBox>
				<ResultText>
					<h2>{name}</h2>
					<h5>주소: {address}</h5>
					<h5>전화번호: {Rcallnum}</h5>
				</ResultText>
				<Warning>
					<h2>현재 오프라인 수업 가능</h2>
				</Warning>
			</ResultBox>
		);
	}
}

export default SearchResultBox;
