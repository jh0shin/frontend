import React from 'react';
import './SearchResultBox.css';

function SearchResultBox({ name, subject, address, price }) {
	return (
		<button className="resultBox">
			<h2>{name}</h2>
			<h5>주소: {address}</h5>
		</button>
	);
}

export default SearchResultBox;
