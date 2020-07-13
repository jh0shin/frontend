import React from 'react';
import './HomeImg.css';
import pptImg from '../img/infopic.jpg';

function HomeImg() {
	return (
		<div>
			<div className="infoImg">
				<img className="pptImg" src={pptImg} alt="학원고의 이념" title="학원고 설명" />
				<div className="infoBox">
					<h1 className="infoTitle">학원고는 워킹맘의 든든한 동반자입니다.</h1>
					<h2 className="infoBody">
						학원고는 언제나 자녀에게 알맞은 방향을 제시하는 <br /> 교육전문가로 구성되어 있습니다.
					</h2>
				</div>
			</div>
		</div>
	);
}

export default HomeImg;
