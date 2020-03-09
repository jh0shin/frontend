import React from "react";
import './SearchInput.css';
import axios from "axios";
import SearchResultBox from "./SearchResultBox";

class SearchInput extends React.Component {
  state = {
    hakwonName: '',
    searchResult: [],
    pageNum: [],
    pageShow: [],
    rawData: []
  }

  handleData = () => {
    const { rawData } = this.state;
    this.setState({ pageNum: [] });
    let num = Math.ceil(rawData.length / 10);
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
      pageShow: rawData.slice(0, 10)
    })
  }

  handleInputClick = async () => {
    const { rawData } = this.state;
    const searchResult = await axios.post(
      'http://hakwongo.com:3000/api/search/name',
      { 'hakwonName': this.state.hakwonName }
    )
    this.setState({rawData: searchResult.data})
    this.handleData()
    console.log(this.state.pageShow)
  }

  handleChangeInput = (e) => {
    this.setState({
      hakwonName: e.target.value
    })
  }

  handlePageClick = (e) => {
    const { rawData } = this.state;
    let pageSingle = [];

    this.setState({
      pageNow: e.target.id
    })

    pageSingle = rawData.slice(e.target.id * 10 - 10, e.target.id * 10);

    this.setState({
      pageShow: pageSingle
    })
  }

  render() {
    const { pageShow, pageNum } = this.state;
    return (
      <div>
        <input type="text" value={this.state.hakwonName} onChange={this.handleChangeInput} name="hakwonName" placeholder="학원이름을 입력해 주세요" />
        <button onClick={this.handleInputClick}>검색</button>
        {pageShow.map((pageShow, index) => {
          return <SearchResultBox
            name={pageShow.hname}
            subject={pageShow.hcall} 
            address={pageShow.hadd}
            price={pageShow.hnum}
            key={index}
          />
        })}
        {pageNum.map(pageNum => {
          return (
            <button onClick={this.handlePageClick} key={pageNum.key} id={pageNum.key}>{pageNum.key}</button>
          )
        })}
      </div>
    );
  }
}

export default SearchInput;