import React from 'react';
import './HomeAdd.css';
import addBigImg from '../img/addImgBig.png';
import addSmallImg from '../img/addImgSmall.png';
import HomeIdInput from '../components/HomeIdInput';

function HomeAdd() {
	return (
		<div className="addField">
			<div id="HomeAdd" />
			<img className="addBigImg" src={addBigImg} alt="광고" />
			<img className="addSmallImg" src={addSmallImg} alt="광고" />
			<div className="inputStyle">
				<HomeIdInput />
			</div>
			<div className="inputStyleSmall">
				<h1 id="HomeAddText">학원고 베타테스트 신청</h1>
				<HomeIdInput />
			</div>
		</div>
	);
}

export default HomeAdd;
