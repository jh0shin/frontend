import React from 'react';
import './HomeAdd.css';
import addBigImg from '../img/addImgBig.png';
import addSmallImg from '../img/addImgSmall.png';
import HomeIdInput from '../components/HomeIdInput';
import styled from 'styled-components';

const Mainbody = styled.div`
	width: 100%;
	margin: auto;
	background-color: white;
	display: flex;
	flex-direction: column;
	line-height: 1.4;
	word-break: keep-all;
	padding-bottom: 50px;
	position: relative;
`;
const PreregBody = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;
const PreregDark = styled.div`
	width: 100%;
	padding-top: 200px;
	padding-bottom: 30px;
	background-color: #504f4b;
	display: flex;
	flex-direction: column;
	position: relative;
`;
const PreregDarkText = styled.div`
	color: #fcf4cc;
	font-size: 50px;
	font-weight: 500;
	position: absolute;
	top: 70px;
	left: 50%;
	margin-left: -140px;
	width: 400px;
`;
const PreregLight = styled.div`
	width: 100%;
	height: 220px;
	padding-top: 20px;
	display: flex;
	justify-content: center;
	position: relative;
`;
const PreregLightText = styled.div`
	color: #504f4b;
	font-size: 40px;
	font-weight: 600;
	position: absolute;
	top: 20px;
	left: 50%;
	margin-left: -140px;
	width: 400px;
`;
const ImgPhone = styled.img`
	width: 230px;
	position: absolute;
	top: 40px;
	left: 50%;
	margin-left: -400px;
	z-index: 1;
`;
const ImgLogo = styled.img`
	height: 40px;
	width: 120px;
	position: absolute;
	top: 27px;
	left: 50%;
	margin-left: -140px;
`;
const InputWarp = styled.div`
	color: #504f4b;
	font-size: 40px;
	font-weight: 600;
	position: absolute;
	top: 370px;
	left: 50%;
	margin-left: -140px;
	width: 400px;
`;

function HomeAdd() {
	return (
		<Mainbody>
			<ImgPhone src={addBigImg} />
			<PreregBody>
				<PreregDark>
					<PreregDarkText>현명한 학원찾기가 시작되는 곳</PreregDarkText>
				</PreregDark>
				<PreregLight>
					<ImgLogo src={addSmallImg} />
					<PreregLightText>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;를<br /> 가장 먼저 만나보세요
					</PreregLightText>
				</PreregLight>
				<InputWarp>
					<HomeIdInput />
				</InputWarp>
			</PreregBody>
		</Mainbody>
	);
}

export default HomeAdd;
