/*global kakao*/

import React from "react";
import './SearchInput.css';
import axios from "axios";
import SearchResultBox from "./SearchResultBox";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hakwonName: '',
      searchResult: [],
      pageNum: [],
      pageShow: [],
      rawData: []
    }
  }

  componentDidMount() {
    this.showMap();
  }

  showMap = () => {
    const { pageShow } = this.state;
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=9f17d1af144fec8d4501c5e713f1c0a8&autoload=false&libraries=services";
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

        pageShow.map(pageShow => {
          addReform = pageShow.hadd.split(' ')
          reformedAdd.push({
            add: addReform[0] + ' ' + addReform[1] + ' ' + addReform[2] + ' ' + addReform[3],
            name: pageShow.hname
          })
        });

        var geocoder = new kakao.maps.services.Geocoder();
        var markers = [];

        reformedAdd.map(reformedAdd => {
          geocoder.addressSearch(reformedAdd.add, function (result, status) {
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
                content: '<div style="width:150px;text-align:center;padding:6px 0;">'+reformedAdd.name+'</div>'
              });
              infowindow.open(map, marker);
            }
          })
        });
      });
    };
  }

  handleData = () => {
    const { rawData } = this.state;
    this.setState({ pageNum: [] });
    let num = Math.ceil(rawData.length / 7);
    let page = 0;
    let step;

    for (step = 0; step < num; step++) {
      this.setState({
        pageNum: this.state.pageNum.concat({
          key: page + 1
        })
      })
      page++;
    };

    this.setState({
      pageShow: rawData.slice(0, 7)
    })
  }

  handleKeyUp = (e) => {
    if(e.keyCode === 13){
      this.handleInputClick();
    }
  }

  handleInputClick = async () => {
    const searchResult = await axios.post(
      'http://hakwongo.com:3000/api/search/name',
      { 'hakwonName': this.state.hakwonName }
    )
    this.setState({ rawData: searchResult.data })
    this.handleData()
    this.showMap()
  }

  handleChangeInput = (e) => {
    this.setState({
      hakwonName: e.target.value
    })
  }

  handlePageClick = (e) => {
    const { rawData } = this.state;
    let pageSingle = [];

    pageSingle = rawData.slice(e.target.id * 7 - 7, e.target.id * 7);

    this.setState({pageShow: pageSingle},()=>{this.showMap()})
  }

  render() {
    const { pageShow, pageNum } = this.state;
    return (
      <div>
        <div className="searchInputField">
          <input type="text" onKeyUp={this.handleKeyUp} value={this.state.hakwonName} onChange={this.handleChangeInput} name="hakwonName" placeholder="학원이름을 입력해 주세요" />
          <button onClick={this.handleInputClick}>검색</button>
        </div>

        <div className="resultField">
          <div className="hakwonResult">
            {pageShow.map((pageShow, index) => {
              return <SearchResultBox
                name={pageShow.hname}
                subject={pageShow.hcall}
                address={pageShow.hadd}
                price={pageShow.hnum}
                key={index}
              />
            })}
            <br />
            {pageNum.map(pageNum => {
              return (
                <button className="pageButton" onClick={this.handlePageClick} key={pageNum.key} id={pageNum.key}>{pageNum.key}</button>
              )
            })}
          </div>
          <div id="map" className="mapResult"></div>
        </div>
      </div>
    );
  }
}

export default SearchInput;