import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SLink = styled(Link)`
	display:flex;
	height: 100px;
	width: 100%;
	margin-bottom: 1vh;
	color:#504f4b;
	border-style: solid none;
	border-color: gray;
	background-color: #fcf4cc;
	text-decoration:none;
	flex-direction: column;
	align-items:center;
	justify-content:space-around;
	&:hover{
		opacity: 0.8;
		transform: scale(0.98);
	}
`;

function SearchResultBox({ name, address, id }) {
	const idUrl = `hakwonPage/${id}`;

	return (
		<SLink to={idUrl}>
			<h2>{name}</h2>
			<h5>주소: {address}</h5>
		</SLink>
	);
}

export default SearchResultBox;
