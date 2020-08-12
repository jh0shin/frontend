import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { HashLink as Link } from 'react-router-hash-link';
import styled from 'styled-components';
import './HomePage.css';
import homePic1 from '../img/homePic1.png';
import homePic2 from '../img/homePic2.png';
import homePic3 from '../img/homePic3.png';
import homeLogoBig from '../img/homeLogoBig.png';
import homeLogo1 from '../img/homeLogo1.png';
import homeLogo2 from '../img/homeLogo2.png';
import homeLogo3 from '../img/homeLogo3.png';

const Mainbody = styled.div`
	width: 100%;
	margin: auto;
	background-color: white;
	display: flex;
	flex-direction: column;
	line-height: 1.5;
	word-break: keep-all;
`;

const FirstPara = styled.div`
	width: 100%;
	background-color: white;
	position: relative;
`;
const LogoPara = styled.div`
	width: 100%;
	background-color: #fcf4cc;
	display: flex;
	flex-direction: column;
`;
const LogoParaUp = styled.div`
	margin: 0 auto;
	width: 0;
	height: 0;
	border-left: 500px solid transparent;
	border-right: 500px solid transparent;
	border-bottom: 60px solid #fcf4cc;
`;
const LogoDown = styled.div`
	width: 100%;
	background-color: #504f4b;
`;
const LogoParaDown = styled.div`
	margin: 0 auto;
	width: 0;
	height: 0;
	border-left: 500px solid #504f4b;
	border-right: 500px solid #504f4b;
	border-top: 60px solid #fcf4cc;
`;
const LogoTextPara = styled.div`
	margin: 0 auto;
	width: 80%;
	max-width: 1000px;
	background-color: #fcf4cc;
	text-align: center;
	color: #504f4b;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoTextBig = styled.span`
	font-size: 40px;
	font-weight: 600;
`;
const LogoTextSmall = styled.span`
	font-size: 30px;
	font-weight: 500;
`;
const LogoTextImg = styled.img`
	width: 25%;
	padding: 20px;
`;
const PicWarp = styled.div`
	background-color: #504f4b;
	width: 100%;
	padding-top: 20px;
	padding-bottom: 20px;
`;
const PicPara = styled.div`
	margin: 0 auto;
	width: 80%;
	max-width: 1000px;
	display: flex;
	flex-direction: column;
`;
const PicImg = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding-top: 30px;
`;
const PicImgSrc = styled.img`width: 25%;`;
const PicText = styled.div`
	padding-top: 20px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;
const PicTextSrc = styled.div`
	width: 25%;
	text-align: center;
	font-size: 25px;
	font-weight: 600;
	color: #fcf4cc;
`;
const PicInfo = styled.div`
	width: 80%;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	padding-top: 20px;
	padding-bottom: 20px;
`;
const PicInfoText = styled.div`
	width: 25%;
	text-align: center;
	font-size: 18px;
	font-weight: 600;
	color: #504f4b;
	text-align: left;
`;
const PicButtons = styled.div`
	width: 80%;
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	padding-bottom: 50px;
`;
const PicButton = styled.button`
	width: 25%;
	height: 60px;
	background-color: #504f4b;
	color: #fcf4cc;
	border-radius: 10px;
	font-size: 25px;
`;
const PicLink = styled(Link)`
	width: 25%;
	height: 30px;
	padding-top:10px;
	padding-bottom: 20px;
	background-color: #504f4b;
	color: #fcf4cc;
	border-radius: 10px;
	font-size: 25px;
	text-decoration:none;
	text-align:center;
	&:hover{
		opacity:0.7;
	}
`;
const SecondPara = styled.div`
	width: 100%;
	background-color: white;
	position: relative;
`;
const SelectPara = styled.div`
	width: 100%;
	background-color: #fcf4cc;
	padding-bottom: 300px;
	display: flex;
	align-items: center;
	flex-direction: column;
	color: #504f4b;
`;
const SelectTitle = styled.div`
	font-size: 40px;
	font-weight: 600;
	margin: 0 auto;
	padding-top: 50px;
	padding-bottom: 30px;
`;
const SelectText = styled.div`
	width: 60%;
	font-size: 25px;
	margin: 0 auto;
	text-align: center;
`;
const SelectVoid = styled.div`height: 150px;`;

function HomePage() {
	const alert = useAlert();

	const onClickAlert = () => {
		alert.success('서비스 준비중입니다');
	};

	const [ select, setSelect ] = useState('');

	const onClickSelect = (e) => {
		setSelect(e.target.id);
	};

	let selectShow;

	if (select === '2') {
		selectShow = <HomeSelTwo />;
	} else if (select === '3') {
		selectShow = <HomeSelThree />;
	} else {
		selectShow = <HomeSelOne />;
	}

	return (
		<Mainbody>
			<FirstPara>
				<LogoParaUp />
				<LogoPara>
					<LogoTextPara>
						<LogoTextBig>워킹맘을 위한 학원찾기 서비스</LogoTextBig>
						<LogoTextImg src={homeLogoBig} />
						<LogoTextSmall>
							교육전문가가 검증한 학원을 마음 놓고 보내세요.<br />학원고는 워킹맘의 일∙가정 양립을 응원합니다.
						</LogoTextSmall>
					</LogoTextPara>
				</LogoPara>
				<LogoDown>
					<LogoParaDown />
				</LogoDown>
				<PicWarp>
					<PicPara>
						<PicImg>
							<PicImgSrc src={homePic1} />
							<PicImgSrc src={homePic2} />
							<PicImgSrc src={homePic3} />
						</PicImg>
						<PicText>
							<PicTextSrc>자녀 상황 파악</PicTextSrc>
							<PicTextSrc>학원 검증</PicTextSrc>
							<PicTextSrc>레포트 제공</PicTextSrc>
						</PicText>
					</PicPara>
				</PicWarp>
				<PicInfo>
					<PicInfoText>학습성향검사와 대면 상담을 실시합니다. 이를 통해, 자녀의 학습 습관 뿐만 아니라 자녀의 꿈과 같은 디테일한 부분까지도 꼼꼼히 기록합니다.</PicInfoText>
					<PicInfoText>교육전문가의 강의 수강평가와, 학원추천 알고리즘을 통해 자녀가 어떤 학원을 가장 즐겁게 다닐 수 있을지 판단합니다.</PicInfoText>
					<PicInfoText>학원 검증 결과는 한 눈에 보기 쉽게 레포트 형식으로 제시됩니다. 자녀를 성장시킬 학원이 다양한 지표와 함께 제시됩니다</PicInfoText>
				</PicInfo>
				<PicButtons>
					<PicLink to="#HomeSelectField">학습성향검사 신청</PicLink>
					<PicButton onClick={onClickAlert}>학원 검증</PicButton>
					<PicButton onClick={onClickAlert}>레포트 제공</PicButton>
				</PicButtons>
			</FirstPara>
			<SecondPara>
				<SelectPara>
					<SelectTitle>학원고 라인업</SelectTitle>
					<SelectText>
						학원고는 맞춤형 학원 추천 서비스 학원고를 시작으로 서비스를 확장해나갈 예정입니다.<br />중고생 자녀 양육 걱정이 사라지는 그날까지, 학원고는 함께하겠습니다.
					</SelectText>
					<div id="homeFouFlex">
						<button className="homeFouButton" id="1" onClick={onClickSelect}>
							<img id="1" className="homeFouPic" src={homeLogo1} alt="그림" title="그림" />
						</button>
						<div id="homeFouDot">∙</div>
						<button className="homeFouButton" id="2" onClick={onClickSelect}>
							<img id="2" className="homeFouPic" src={homeLogo2} alt="그림" title="그림" />
						</button>
						<div id="homeFouDot">∙</div>
						<button className="homeFouButton" id="3" onClick={onClickSelect}>
							<img id="3" className="homeFouPic" src={homeLogo3} alt="그림" title="그림" />
						</button>
					</div>
				</SelectPara>
				<SelectVoid />
				{selectShow}
			</SecondPara>
		</Mainbody>
	);
}

function HomeThiFlex({ homePic, title, body }) {
	return (
		<div id="homeThiFlex">
			<img id="homeThiPic" src={homePic} alt="그림" title="그림" />
			<div id="homeThiOne">{title}</div>
			<div id="homeThiTwo">{body}</div>
		</div>
	);
}

function HomeSelOne() {
	// const alert = useAlert();

	// const onClickAlert = () => {
	// 	alert.success('서비스 준비중입니다');
	// };

	return (
		<div id="selPara">
			<div id="selTitle">
				<div id="selOne">워킹맘을 위한 프리미엄 학원 찾기 서비스</div>
				<img id="selTwo" src={homeLogo1} alt="그림" title="그림" />
			</div>
			<ul id="selList">
				<li id="selListBody">학습성향검사를 통한 자녀이해</li>
				<li id="selListBody">교육전문가의 직접 수강을 통한 학원검증</li>
				<li id="selListBody">객관적인 학원 추천 레포트 제공</li>
				<li id="selListBody">위클리 교육뉴스 제공</li>
			</ul>
			<Link id="selButton" to="/Reportsurvey">
				레포트 예상 견적 확인
			</Link>
		</div>
	);
}

function HomeSelTwo() {
	return (
		<div id="selPara">
			<div id="selTitle">
				<div id="selOne">우리동네 학원을 속속들이 알 수 있는</div>
				<img id="selTwo" src={homeLogo2} alt="그림" title="그림" />
			</div>
			<ul id="selList">
				<li id="selListBody">10만개 이상의 학원 데이터베이스 제공</li>
				<li id="selListBody">학원 강좌정보, 교습료, 강사 수 등의 정보 제공</li>
				<li id="selListBody">학원의 모든 경험을 공유할 수 있는 워킹맘 리뷰</li>
				<li id="selListBody">4월 중 베타서비스 출시 예정</li>
			</ul>
			<Link id="selButton" to="#HomeAdd">
				베타테스트 신청
			</Link>
		</div>
	);
}

function HomeSelThree() {
	const alert = useAlert();

	const onClickAlert = () => {
		alert.success('서비스 준비중입니다');
	};

	return (
		<div id="selPara">
			<div id="selTitle">
				<div id="selOne">자녀에게 딱 맞는 학원을 찾아드립니다</div>
				<img id="selTwo" src={homeLogo3} alt="그림" title="그림" />
			</div>
			<ul id="selList">
				<li id="selListBody">1분안에 작성하는 요청서</li>
				<li id="selListBody">요청서 작성 후, 지역 학원의 상담요청서 열람 가능</li>
				<li id="selListBody">2020년 하반기 베타서비스 실시 예정</li>
			</ul>
			<button id="selButton" onClick={onClickAlert}>
				학원 입점 요청
			</button>
		</div>
	);
}

export default HomePage;
