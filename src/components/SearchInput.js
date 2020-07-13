/*global kakao*/

import React from 'react';
import './SearchInput.css';
import axios from 'axios';
import SearchResultBox from './SearchResultBox';
import Dropdown from 'react-dropdown';
import ReactSlider from 'react-slider';

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hakwonName: '',
			sido: '',
			gungu: '',
			subject: '',
			grade: '',
			sidoLabel: '시,도',
			gunguLabel: '군,구',
			subjectLabel: '과목',
			gradeLabel: '학년',
			maxPrice: '제한없음',
			minPrice: '0 만원',
			sort: '',
			gunguOptions: [ '시,도를 선택해주세요' ],
			searchResult: [],
			pageNum: [],
			pageShow: [],
			rawData: [],
			onPageNum: 0,
			offset: 0
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
				});
			});
		};
	};

	handleData = () => {
		const { rawData, offset } = this.state;
		this.setState({ pageNum: [] });
		let num = Math.ceil(rawData.length / 7) - 1;
		let page = 0;
		let step;

		for (step = 0; step < num; step++) {
			this.setState({
				pageNum: this.state.pageNum.concat({
					key: page + 1 + offset * 10
				})
			});
			page++;
		}

		this.setState({
			pageShow: rawData.slice(0, 7)
		});
	};

	handleKeyUp = (e) => {
		if (e.keyCode === 13) {
			this.handleInputClick();
		}
	};

	handleInputFirstClick = () => {
		this.setState({ offset: 0 }, () => {
			this.handleInputClick();
		});
	};

	handleInputClick = async () => {
		const searchResult = await axios.post('http://hakwongo.com:3000/api/search/name', {
			name: this.state.hakwonName,
			limit: '71',
			offset: this.state.offset,
			sido: this.state.sido,
			gungu: this.state.gungu,
			subject: '',
			grade: '',
			lowprice: '',
			highprice: ''
		});
		// console.log(searchResult.data[0])
		this.setState({ rawData: searchResult.data });
		this.handleData();
		this.showMap();
	};

	handleChangeInput = (e) => {
		this.setState({
			hakwonName: e.target.value
		});
	};

	handlePageClick = (e) => {
		const { rawData, offset } = this.state;
		let pageSingle = [];

		pageSingle = rawData.slice((e.target.id - offset * 10) * 7 - 7, (e.target.id - offset * 10) * 7);

		this.setState({ pageShow: pageSingle }, () => {
			this.showMap();
		});
		this.setState({ onPageNum: e.target.id });
	};

	handlePagePlus = (e) => {
		const { offset } = this.state;
		this.setState({ offset: offset + 1 }, () => {
			this.handleInputClick();
		});
	};

	handlePageMinus = (e) => {
		const { offset } = this.state;
		this.setState({ offset: offset - 1 }, () => {
			this.handleInputClick();
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
		const cungjuOptions = [ '상당구', '서원구', '흥덕구', '청원구', '모두 선택' ];
		const chungbukOptions = [ '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군', '모두 선택' ];
		const chunanOptions = [ '동남구', '서북구', '모두 선택' ];
		const chungnamOptions = [
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
		const pohangOptions = [ '남구', ' 북구', '모두 선택' ];
		const gyeongbukOptions = [
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
		const changwonOptions = [ '의창구', '성산구', '마산합포구', '마산회원구', '진해구', '모두 선택' ];
		const gyeongnamOptions = [
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
		const suwonOptions = [ '장안구', '권선구', '팔달구', '영통구', '수정구', '중원구', '분당구', '모두 선택' ];
		const anyangOptions = [ '만안구', '동안구', '모두 선택' ];
		const ansanOptions = [ '상록구', '단원구', '모두 선택' ];
		const goyangOptions = [ '덕양구', '일단동구', '일산서구', '모두 선택' ];
		const yonginOptions = [ '처안구', '기흥구', '수지구', '모두 선택' ];
		const gyunggiOptions = [
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
		const gyunjuOptions = [ '완산구', '덕진구', '모두 선택' ];
		const junbukOptions = [
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

		if (option.label == '서울') {
			this.setState({ gunguOptions: seoulOptions });
		} else if (option.label == '경기도') {
			this.setState({ gunguOptions: gyunggiOptions });
		} else if (option.label == '경기도 수원시') {
			this.setState({ gunguOptions: suwonOptions });
		} else if (option.label == '경기도 안양시') {
			this.setState({ gunguOptions: anyangOptions });
		} else if (option.label == '경기도 고양시') {
			this.setState({ gunguOptions: goyangOptions });
		} else if (option.label == '경기도 용인시') {
			this.setState({ gunguOptions: yonginOptions });
		} else if (option.label == '경기도 안산시') {
			this.setState({ gunguOptions: ansanOptions });
		} else if (option.label == '강원도') {
			this.setState({ gunguOptions: gangwonOptions });
		} else if (option.label == '충청북도') {
			this.setState({ gunguOptions: chungbukOptions });
		} else if (option.label == '충청북도 청주시') {
			this.setState({ gunguOptions: cungjuOptions });
		} else if (option.label == '충청남도') {
			this.setState({ gunguOptions: chungnamOptions });
		} else if (option.label == '충청남도 천안시') {
			this.setState({ gunguOptions: chunanOptions });
		} else if (option.label == '전라북도') {
			this.setState({ gunguOptions: junbukOptions });
		} else if (option.label == '전라북도 전주시') {
			this.setState({ gunguOptions: gyunjuOptions });
		} else if (option.label == '전라남도') {
			this.setState({ gunguOptions: junnamOptions });
		} else if (option.label == '경상북도') {
			this.setState({ gunguOptions: gyeongbukOptions });
		} else if (option.label == '경상북도 포항시') {
			this.setState({ gunguOptions: pohangOptions });
		} else if (option.label == '경상남도') {
			this.setState({ gunguOptions: gyeongnamOptions });
		} else if (option.label == '경상남도 창원시') {
			this.setState({ gunguOptions: changwonOptions });
		} else if (option.label == '부산') {
			this.setState({ gunguOptions: busanOptions });
		} else if (option.label == '대구') {
			this.setState({ gunguOptions: deguOptions });
		} else if (option.label == '인천') {
			this.setState({ gunguOptions: inchunOptions });
		} else if (option.label == '광주') {
			this.setState({ gunguOptions: guangjuOptions });
		} else if (option.label == '대전') {
			this.setState({ gunguOptions: dejunOptions });
		} else if (option.label == '울산') {
			this.setState({ gunguOptions: ulsanOptions });
		} else if (option.label == '제주특별자치도') {
			this.setState({ gunguOptions: jejuOptions });
		} else if (option.label == '세종특별자치시') {
			this.setState({ gunguOptions: sejongOptions });
		} else if (option.label == '모두 선택') {
			this.setState({ gunguOptions: allOptions });
			this.setState({ sido: '' });
		}
	};

	onSelectGungu = (option) => {
		this.setState({ gungu: option.label });
		this.setState({ gunguLabel: option.label });
		if (option.label == '모두 선택') {
			this.setState({ gungu: '' });
		} else if (option.label == '시,도를 선택해주세요') {
			this.setState({ gungu: '' });
		}
	};

	onSelectSub = (option) => {
		this.setState({ subject: option.label });
		this.setState({ subjectLabel: option.label });
		if (option.label == '모두 선택') {
			this.setState({ subject: '' });
		}
	};

	onSelectGrade = (option) => {
		this.setState({ grade: option.label });
		this.setState({ gradeLabel: option.label });
		if (option.label == '모두 선택') {
			this.setState({ grade: '' });
		}
	};

	handleSlider = (e) => {
		this.setState({ maxPrice: e[1] + '만원' });
		this.setState({ minPrice: e[0] + '만원' });
		if (e[1] == 101) {
			this.setState({ maxPrice: '제한없음' });
		}
	};

	onSelectSort = (option) => {
		this.setState({ sort: option.label });
	};

	render() {
		const { pageShow, pageNum } = this.state;
		const sidoOptions = [
			'서울',
			'경기도',
			'경기도 수원시',
			'경기도 안양시',
			'경기도 고양시',
			'경기도 용인시',
			'경기도 안산시',
			'강원도',
			'충청북도',
			'충청북도 청주시',
			'충청남도',
			'충청남도 천안시',
			'전라북도',
			'전라북도 전주시',
			'전라남도',
			'경상북도',
			'경상북도 포항시',
			'경상남도',
			'경상남도 창원시',
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
		const subjectOptions = [ '수학', '영어', '국어', '과학', '모두 선택' ];
		const gradeOptions = [ '고등학교 3학년', '고등학교 2학년', '고등학교 1학년', '중학교 3학년', '중학교 2학년', '중학교 1학년', '초등학교', '모두 선택' ];
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
		if (this.state.rawData.length == 71) {
			plus = (
				<button className="pageButton" onClick={this.handlePagePlus}>
					&#62;
				</button>
			);
		} else {
			plus = <div className="none" />;
		}

		return (
			<div className="searchBody">
				<div className="searchInputField">
					{/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
					<div className="searchInputFieldCol">
						<Dropdown
							options={sidoOptions}
							value={this.state.sidoLabel}
							onChange={this.onSelectSido}
							placeholder="시,도"
							className="dropdown"
							menuClassName="dropdownMenu"
						/>
						<Dropdown
							options={this.state.gunguOptions}
							value={this.state.gunguLabel}
							onChange={this.onSelectGungu}
							placeholder="군,구"
							className="dropdown"
							menuClassName="dropdownMenu"
						/>
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
							placeholder="학년"
							className="dropdown"
							menuClassName="dropdownMenu"
						/>
					</div>
					<div className="searchInputFieldCol">
						<div className="searchInputFieldCost">최소 금액: {this.state.minPrice}</div>
						<ReactSlider
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
						/>
						<div className="searchInputFieldCost">최대 금액: {this.state.maxPrice}</div>
						<input
							className="searchInputFieldTextInput"
							type="text"
							onKeyUp={this.handleKeyUp}
							value={this.state.hakwonName}
							onChange={this.handleChangeInput}
							name="hakwonName"
							placeholder="학원이름을 입력해 주세요"
						/>
						<button onClick={this.handleInputFirstClick}>검색</button>
					</div>
				</div>

				<div className="resultField">
					<div className="hakwonResult">
						<Dropdown
							options={sortOptions}
							value={this.state.sort}
							onChange={this.onSelectSort}
							placeholder="정렬기준"
							className="dropdown"
							menuClassName="dropdownMenu"
						/>
						{pageShow.map((pageShow) => {
							return (
								<SearchResultBox
									name={pageShow.name}
									subject={pageShow.callnum}
									address={pageShow.addr}
									key={pageShow.id}
								/>
							);
						})}
						<br />
						{minus}
						{pageNum.map((pageNum) => {
							return (
								<button className="pageButton" onClick={this.handlePageClick} key={pageNum.key} id={pageNum.key}>
									{pageNum.key}
								</button>
							);
						})}
						{plus}
					</div>
					<div id="map" className="mapResult" />
				</div>
			</div>
		);
	}
}

export default SearchInput;
