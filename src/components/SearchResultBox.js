import React from 'react';
import './SearchResultBox.css';
import { Link } from 'react-router-dom';

function SearchResultBox({ name, subject, address, key }) {
	const idUrl = `hakwon/${key}`;

	return (
		<Link to={idUrl} className="resultBox">
			<h2>{name}</h2>
			<h5>주소: {address}</h5>
		</Link>
	);
}

export default SearchResultBox;
