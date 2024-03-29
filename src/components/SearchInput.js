/*global kakao*/

import React from 'react';
import './SearchInput.css';
import SearchResultBox from './SearchResultBox';
import Dropdown from 'react-dropdown';
import ReactSlider from 'react-slider';
import http from '../api';
import styled from 'styled-components';

const CoronaTitle = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	margin-top: 30px;
`;
const CoronaTextBig = styled.div`
	margin: 0 auto;
	font-size: 35px;
	font-weight: 600;
	color: #ed2939;
	margin-bottom: 10px;
`;
const CoronaTextSmall = styled.div`
	margin: 0 auto;
	font-size: 40px;
	font-weight: 600;
	color: white;
`;
const Background = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: #504f4b;
`;
const PageButton = styled.div`
	display: flex;
	flex-direction: row;
`;
const NameSearch = styled.div`
	width: 95%;
	height: 30px;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-bottom: 20px;
`;
// const Container = styled.div`
// 	display: grid;
// 	grid-template-rows: repeat(2, 50px);
// 	grid-template-columns: repeat(5, 20%);
// 	grid-template-areas: ". . . . ." "searchInputSlider searchInputSlider searchInputSlider searchInputSlider initButton";
// 	row-gap: 10px;
// `;
const Container = styled.div`
	display: grid;
	grid-template-rows: repeat(1, 50px);
	grid-template-columns: repeat(5, 20%);
	grid-template-areas: ". . . . initButton";
	row-gap: 10px;
`;

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hakwonName: '',
			sido: '',
			gungu: '',
			subject: '',
			grade: '',
			sidoLabel: '시/도',
			gunguLabel: '시/구/군',
			subjectLabel: '과목',
			// gradeLabel: '학년',
			gradeLabel: '수업 가능한 곳 찾기',
			maxPrice: '제한없음',
			minPrice: '0 만원',
			sort: '',
			gunguOptions: [ '시,도를 선택해주세요' ],
			searchResult: [],
			pageNum: [],
			pageShow: [],
			rawData: [],
			onPageNum: 0,
			offset: 0,
			isName: true
		};
		this.onSelectSido = this.onSelectSido.bind(this);
		this.onSelectGungu = this.onSelectGungu.bind(this);
		this.onSelectSub = this.onSelectSub.bind(this);
		this.onSelectGrade = this.onSelectGrade.bind(this);
		this.onSelectSort = this.onSelectSort.bind(this);
	}

	componentDidMount() {
		this.showMap();
	}

	showMap = () => {
		const { pageShow } = this.state;
		const script = document.createElement('script');
		script.async = true;
		script.src =
			'https://dapi.kakao.com/v2/maps/sdk.js?appkey=9f17d1af144fec8d4501c5e713f1c0a8&autoload=false&libraries=services';
		document.head.appendChild(script);

		script.onload = () => {
			kakao.maps.load(() => {
				var container = document.getElementById('map');
				var options = {
					center: new kakao.maps.LatLng(33.450701, 126.570667),
					level: 3
				};
				var map = new kakao.maps.Map(container, options);

				var addReform = [];
				var reformedAdd = [];

				pageShow.map((pageShow) => {
					addReform = pageShow.addr.split(' ');
					reformedAdd.push({
						add: addReform[0] + ' ' + addReform[1] + ' ' + addReform[2] + ' ' + addReform[3],
						name: pageShow.name
					});
					return '';
				});

				var geocoder = new kakao.maps.services.Geocoder();
				var markers = [];

				reformedAdd.map((reformedAdd) => {
					geocoder.addressSearch(reformedAdd.add, function(result, status) {
						if (status === kakao.maps.services.Status.OK) {
							var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
							var marker = new kakao.maps.Marker({
								map: map,
								position: coords
							});
							markers.push(coords);
							var bounds = new kakao.maps.LatLngBounds();

							let i;
							for (i = 0; i < markers.length; i++) {
								bounds.extend(markers[i]);
							}

							map.setBounds(bounds);
							var infowindow = new kakao.maps.InfoWindow({
								content: '<div style="width:150px;text-align:center;padding:6px 0;">' + reformedAdd.name + '</div>'
							});
							infowindow.open(map, marker);
						}
					});
					return '';
				});
			});
		};
	};

	handleData = async () => {
		const { offset, isName } = this.state;

		let rawData = '';

		if (isName === true) {
			const searchResult = await http.post('/api2/search/corona/name', {
				name: this.state.hakwonName,
				limit: '71',
				offset: offset * 70
			});
			console.log(searchResult);

			rawData = searchResult.data;
		} else {
			const searchResult = await http.post('/api2/search/corona/init', {
				limit: '71',
				offset: this.state.offset * 70,
				sido: this.state.sido,
				gungu: this.state.gungu,
				dong: '',
				subject: this.state.subject,
				age: this.state.grade
			});
			console.log(searchResult.data);
			rawData = searchResult.data;
		}

		let num = Math.ceil(rawData.length / 7) - 1;
		let page = 0;
		let step;

		let pageNum = [];

		for (step = 0; step < num; step++) {
			pageNum.push(page + 1 + offset * 10);
			page++;
		}

		this.setState({ pageNum, pageShow: rawData.slice(0, 7), rawData, onPageNum: 1 + offset * 10 });
		this.showMap();
		// console.log(rawData.slice(0, 7));
	};

	// handleKeyUp = (e) => {
	// 	if (e.keyCode === 13) {
	// 		this.handleInputNameClick();
	// 	}
	// };

	handleInputFirstNameClick = () => {
		this.setState({ offset: 0, isName: true }, () => {
			this.handleData();
		});
	};

	handleInputFirstInitClick = () => {
		this.setState({ offset: 0, isName: false }, () => {
			this.handleData();
		});
	};

	// handleInputNameClick = async () => {
	// const searchResult = await http.post('/api2/search/name', {
	// 	name: this.state.hakwonName,
	// 	limit: '71',
	// 	offset: this.state.offset * 70
	// });
	// // console.log(searchResult);
	// this.setState({ rawData: searchResult.data });
	// this.handleData();
	// this.showMap();
	// };

	// handleInputInitClick = async () => {
	// 	const searchResult = await http.post('/api2/search/init', {
	// 		limit: '71',
	// 		offset: this.state.offset * 70,
	// 		sido: this.state.sido,
	// 		gungu: this.state.gungu,
	// 		dong: '',
	// 		subject: '',
	// 		age: ''
	// 	});
	// 	console.log(searchResult);
	// 	this.setState({ rawData: searchResult.data });
	// 	this.handleData();
	// 	this.showMap();
	// };

	handleChangeInput = (e) => {
		this.setState({
			hakwonName: e.target.value
		});
	};

	handlePageClick = (e) => {
		const { rawData, offset } = this.state;
		let pageSingle = [];

		pageSingle = rawData.slice((e.target.id - offset * 10) * 7 - 7, (e.target.id - offset * 10) * 7);

		this.setState({ pageShow: pageSingle, onPageNum: e.target.id }, () => {
			this.showMap();
		});
	};

	handlePagePlus = (e) => {
		const { offset } = this.state;
		this.setState({ offset: offset + 1, onPageNum: 1 + (offset + 1) * 10 }, () => {
			this.handleData();
		});
	};

	handlePageMinus = (e) => {
		const { offset } = this.state;
		this.setState({ offset: offset - 1, onPageNum: 1 + (offset - 1) * 10 }, () => {
			this.handleData();
		});
	};

	onSelectSido = (option) => {
		const seoulOptions = [
			'종로구',
			'중구',
			'용산구',
			'성동구',
			'광진구',
			'동대문구',
			'중랑구',
			'성북구',
			'강북구',
			'도봉구',
			'노원구',
			'은평구',
			'서대문구',
			'마포구',
			'양천구',
			'강서구',
			'구로구',
			'금천구',
			'영등포구',
			'동작구',
			'관악구',
			'서초구',
			'강남구',
			'송파구',
			'강동구',
			'모두 선택'
		];
		const busanOptions = [
			'중구',
			'서구',
			'동구',
			'영도구',
			'부산진구',
			'동래구',
			'남구',
			'북구',
			'해운대구',
			'사하구',
			'금정구',
			'강서구',
			'연제구',
			'수영구',
			'사상구',
			'기장군',
			'모두 선택'
		];
		const chungbukOptions = [
			'청주시 상당구',
			'청주시 서원구',
			'청주시 흥덕구',
			'청주시 청원구',
			'충주시',
			'제천시',
			'보은군',
			'옥천군',
			'영동군',
			'증평군',
			'진천군',
			'괴산군',
			'음성군',
			'단양군',
			'모두 선택'
		];
		const chungnamOptions = [
			'천안시 동남구',
			'천안시 서북구',
			'공주시',
			'보령시',
			'아산시',
			'서산시',
			'논산시',
			'계룡시',
			'당진시',
			'금산군',
			'부여군',
			'서산군',
			'청양군',
			'홍성군',
			'예산군',
			'태안군',
			'모두 선택'
		];
		const deguOptions = [ '중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군', '모두 선택' ];
		const dejunOptions = [ '동구', '중구', '서구', '유성구', '대덕구', '모두 선택' ];
		const gangwonOptions = [
			'춘천시',
			'원주시',
			'강릉시',
			'동해시',
			'태백시',
			'속초시',
			'삼척시',
			'홍천군',
			'횡성군',
			'영월군',
			'평창군',
			'정선군',
			'철원군',
			'화천군',
			'양구군',
			'인제군',
			'고성군',
			'양양군',
			'모두 선택'
		];
		const guangjuOptions = [ '동구', '서구', '남구', '북구', '광산구', '모두 선택' ];
		const gyeongbukOptions = [
			'포항시 남구',
			'포항시 북구',
			'경주시',
			'김천시',
			'안동시',
			'구미시',
			'영주시',
			'영천시',
			'상주시',
			'문경시',
			'경산시',
			'군위군',
			'의성군',
			'청송군',
			'영양군',
			'영덕군',
			'청도군',
			'고령군',
			'성주군',
			'칠곡군',
			'예천군',
			'봉화군',
			'울진군',
			'울릉군',
			'모두 선택'
		];
		const gyeongnamOptions = [
			'창원시 의창구',
			'창원시 성산구',
			'창원시 마산합포구',
			'창원시 마산회원구',
			'창원시 진해구',
			'진주시',
			'통영시',
			'사천시',
			'김해시',
			'밀양시',
			'거제시',
			'양산시',
			'의령군',
			'함안군',
			'창녕군',
			'고성군',
			'남해군',
			'하동군',
			'산청군',
			'함양군',
			'거창군',
			'합천군',
			'모두 선택'
		];
		const gyunggiOptions = [
			'수원시 장안구',
			'수원시 권선구',
			'수원시 팔달구',
			'수원시 영통구',
			'수원시 수정구',
			'수원시 중원구',
			'수원시 분당구',
			'안양시 만안구',
			'안양시 동안구',
			'안산시 상록구',
			'안산시 단원구',
			'고양시 덕양구',
			'고양시 일단동구',
			'고양시 일산서구',
			'용인시 처안구',
			'용인시 기흥구',
			'용인시 수지구',
			'의정부시',
			'부천시',
			'광명시',
			'평택시',
			'동두천시',
			'과천시',
			'구리시',
			'남양주시',
			'오산시',
			'시흥시',
			'군포시',
			'의왕시',
			'하남시',
			'파주시',
			'이천시',
			'안성시',
			'김포시',
			'화성시',
			'광주시',
			'양주시',
			'포천시',
			'여주시',
			'연천군',
			'가평군',
			'양평군',
			'모두 선택'
		];
		const inchunOptions = [ '중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군', '모두 선택' ];
		const jejuOptions = [ '제주시', '서귀포시', '모두 선택' ];
		const junbukOptions = [
			'전주시 완산구',
			'전주시 덕진구',
			'군산시',
			'익산시',
			'정읍시',
			'남원시',
			'김제시',
			'완주군',
			'진안군',
			'무주군',
			'장수군',
			'임실군',
			'순창군',
			'고창군',
			'부안군',
			'모두 선택'
		];
		const junnamOptions = [
			'목포시',
			'여수시',
			'순천시',
			'나주시',
			'광양시',
			'담양군',
			'곡성군',
			'구례군',
			'고흥군',
			'보성군',
			'화순군',
			'장흥군',
			'강진군',
			'해남군',
			'영암군',
			'무안군',
			'함평군',
			'영광군',
			'장성군',
			'완도군',
			'진도군',
			'신안군',
			'모두 선택'
		];
		const sejongOptions = [
			'반곡동',
			'소담동',
			'보람동',
			'대평동',
			'가람동',
			'한솔동',
			'나성동',
			'새롬동',
			'다정동',
			'어진동',
			'종촌동',
			'고운동',
			'아름동',
			'도담동',
			'조치원읍',
			'연기면',
			'연동면',
			'부강면',
			'금남면',
			'장군면',
			'연서면',
			'전의면',
			'전동면',
			'소정면',
			'모두 선택'
		];
		const ulsanOptions = [ '중구', '남구', '동구', '북구', '울주군', '모두 선택' ];
		const allOptions = [ '모두 선택 됨' ];

		this.setState({ sido: option.label });
		this.setState({ sidoLabel: option.label });

		if (option.label === '서울') {
			this.setState({ gunguOptions: seoulOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '경기도') {
			this.setState({ gunguOptions: gyunggiOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '강원도') {
			this.setState({ gunguOptions: gangwonOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '충청북도') {
			this.setState({ gunguOptions: chungbukOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '충청남도') {
			this.setState({ gunguOptions: chungnamOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '전라북도') {
			this.setState({ gunguOptions: junbukOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '전라남도') {
			this.setState({ gunguOptions: junnamOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '경상북도') {
			this.setState({ gunguOptions: gyeongbukOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '경상남도') {
			this.setState({ gunguOptions: gyeongnamOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '부산') {
			this.setState({ gunguOptions: busanOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '대구') {
			this.setState({ gunguOptions: deguOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '인천') {
			this.setState({ gunguOptions: inchunOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '광주') {
			this.setState({ gunguOptions: guangjuOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '대전') {
			this.setState({ gunguOptions: dejunOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '울산') {
			this.setState({ gunguOptions: ulsanOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '제주특별자치도') {
			this.setState({ gunguOptions: jejuOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '세종특별자치시') {
			this.setState({ gunguOptions: sejongOptions, gunguLabel: '시,도를 선택해주세요', gungu: '' });
		} else if (option.label === '모두 선택') {
			this.setState({ gunguOptions: allOptions });
			this.setState({ sido: '' });
		}
	};

	onSelectGungu = (option) => {
		this.setState({ gungu: option.label });
		this.setState({ gunguLabel: option.label });
		if (option.label === '모두 선택') {
			this.setState({ gungu: '' });
		} else if (option.label === '시,도를 선택해주세요') {
			this.setState({ gungu: '' });
		}
	};

	onSelectSub = (option) => {
		this.setState({ subject: option.label });
		this.setState({ subjectLabel: option.label });
		if (option.label === '모두 선택') {
			this.setState({ subject: '' });
		}
	};

	onSelectGrade = (option) => {
		this.setState({ grade: option.label });
		this.setState({ gradeLabel: option.label });
		if (option.label === '모두 검색') {
			this.setState({ grade: '' });
		} else if (option.label === '교습소 (수업가능)') {
			this.setState({ grade: '교습소' });
		}
	};

	handleSlider = (e) => {
		this.setState({ maxPrice: e[1] + '만원' });
		this.setState({ minPrice: e[0] + '만원' });
		if (e[1] === 101) {
			this.setState({ maxPrice: '제한없음' });
		}
	};

	onSelectSort = (option) => {
		this.setState({ sort: option.label });
	};

	render() {
		const { pageShow, pageNum, onPageNum, offset } = this.state;
		const sidoOptions = [
			'서울',
			'경기도',
			'강원도',
			'충청북도',
			'충청남도',
			'전라북도',
			'전라남도',
			'경상북도',
			'경상남도',
			'부산',
			'대구',
			'인천',
			'광주',
			'대전',
			'울산',
			'제주특별자치도',
			'세종특별자치시',
			'모두 선택'
		];
		const subjectOptions = [ '예능', '국제화', '입시.검정 및 보습', '독서실', '기타', '모두 선택' ];
		// const gradeOptions = [ '고등학교 3학년', '고등학교 2학년', '고등학교 1학년', '중학교 3학년', '중학교 2학년', '중학교 1학년', '초등학교', '모두 선택' ];
		const gradeOptions = [ '모두 검색', '교습소 (수업가능)' ];
		const sortOptions = [ '기본 정렬', '별점 높은순', '좋아요 많은 순', '가격 높은순', '가격 낮은순' ];

		let minus = <div className="none" />;
		if (this.state.offset > 0) {
			minus = (
				<button className="pageButton" onClick={this.handlePageMinus}>
					&#60;
				</button>
			);
		} else {
			minus = <div className="none" />;
		}

		let plus = <div className="none" />;
		if (this.state.rawData.length === 71) {
			plus = (
				<button className="pageButton" onClick={this.handlePagePlus}>
					&#62;
				</button>
			);
		} else {
			plus = <div className="none" />;
		}

		let resultButton = pageShow.map((pageShow) => (
			<SearchResultBox
				name={pageShow.name}
				address={pageShow.addr}
				corona={pageShow.age}
				callnum={pageShow.callnum}
				id={pageShow.id}
				key={pageShow.id}
			/>
		));

		const pageLow = pageNum.slice(0, onPageNum - offset * 10 - 1);
		const pageHigh = pageNum.slice(onPageNum - offset * 10, 10);

		let pageButtonLow = pageLow.map((pageLow) => {
			return (
				<button className="pageButton" onClick={this.handlePageClick} key={pageLow} id={pageLow}>
					{pageLow}
				</button>
			);
		});

		let pageButtonHigh = pageHigh.map((pageHigh) => {
			return (
				<button className="pageButton" onClick={this.handlePageClick} key={pageHigh} id={pageHigh}>
					{pageHigh}
				</button>
			);
		});

		let pageButtonNow = <div className="none" />;
		if (onPageNum === 0) {
			pageButtonNow = <div className="none" />;
		} else {
			pageButtonNow = (
				<button className="pageButtonNow" onClick={this.handlePageClick} key={onPageNum} id={onPageNum}>
					{onPageNum}
				</button>
			);
		}

		return (
			<Background>
				<div className="searchBody">
					<CoronaTitle>
						<CoronaTextBig>수도권 사회적 거리두기 2.5단계 격상</CoronaTextBig>
						<CoronaTextSmall>우리 아이의 정확한 학원 정보를 찾아보세요</CoronaTextSmall>
					</CoronaTitle>
					<div className="searchInputField">
						{/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
						<NameSearch>
							<input
								className="searchInputFieldTextInput"
								type="text"
								onKeyUp={this.handleKeyUp}
								value={this.state.hakwonName}
								onChange={this.handleChangeInput}
								name="hakwonName"
								placeholder="학원이름을 입력해 주세요"
							/>
							<button className="nameButton" onClick={this.handleInputFirstNameClick}>
								이름으로 검색
							</button>
						</NameSearch>
						<Container>
							<Dropdown
								options={sidoOptions}
								value={this.state.sidoLabel}
								onChange={this.onSelectSido}
								className="dropdown"
								menuClassName="dropdownMenu"
							/>
							<Dropdown
								options={this.state.gunguOptions}
								value={this.state.gunguLabel}
								onChange={this.onSelectGungu}
								className="dropdown"
								menuClassName="dropdownMenu"
							/>
							{/* <Dropdown
								options={this.state.gunguOptions}
								value={this.state.gunguLabel}
								onChange={this.onSelectGungu}
								className="dropdown"
								menuClassName="dropdownMenu"
							/> */}
							<Dropdown
								options={subjectOptions}
								value={this.state.subjectLabel}
								onChange={this.onSelectSub}
								placeholder="과목"
								className="dropdown"
								menuClassName="dropdownMenu"
							/>
							<Dropdown
								options={gradeOptions}
								value={this.state.gradeLabel}
								onChange={this.onSelectGrade}
								className="dropdown"
								menuClassName="dropdownMenu"
							/>
							{/* <div className="searchInputFieldCostLow">최소 금액: {this.state.minPrice}</div> */}
							{/* <ReactSlider
								className="searchInputSlider"
								thumbClassName="searchInputThumb"
								trackClassName="searchInputTrack"
								defaultValue={[ 0, 101 ]}
								ariaLabel={[ 'Lower thumb', 'Upper thumb' ]}
								ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
								onChange={this.handleSlider}
								pearling
								minDistance={1}
								min={0}
								max={101}
							/> */}
							{/* <div className="searchInputFieldCostHigh">최대 금액: {this.state.maxPrice}</div> */}
							<button className="initButton" onClick={this.handleInputFirstInitClick}>
								주소로 검색
							</button>
						</Container>
					</div>

					<div className="resultField">
						<div className="hakwonResult">
							{/* <Dropdown
								options={sortOptions}
								value={this.state.sort}
								onChange={this.onSelectSort}
								placeholder="정렬기준"
								className="dropdownSort"
								menuClassName="dropdownMenu"
							/> */}
							{resultButton}
							<PageButton>
								{minus}
								{pageButtonLow}
								{pageButtonNow}
								{pageButtonHigh}
								{plus}
							</PageButton>
						</div>
						<div id="map" className="mapResult" />
					</div>
				</div>
			</Background>
		);
	}
}

export default SearchInput;
