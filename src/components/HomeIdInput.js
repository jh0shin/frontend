import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import './HomeIdInput.css';

import http from '../api';

function HomeIdInput() {
	const alert = useAlert();

	const [ input, setInput ] = useState('');

	const onChangeInput = (e) => {
		setInput(e.target.value);
	};

	const onClick = () => {
		http
			.post('/api/contact/us', {
				data: input
			})
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.log(error);
			});
		alert.success('검토 후 1영업일 이내에 회신드리겠습니다.');
	};

	return (
		<div className="inputBar">
			<input
				className="searchInput"
				type="text"
				value={input}
				onChange={onChangeInput}
				name="hakoneName"
				placeholder="이메일/카톡아이디를 입력해주세요"
			/>
			<button onClick={onClick} className="searchButton">
				확인
			</button>
		</div>
	);
}

export default HomeIdInput;
