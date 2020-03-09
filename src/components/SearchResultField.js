import React from 'react';
import './SearchResultField.css';
import SearchResultBox from "./SearchResultBox";

class SearchResultField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageShow: [],
      pageNow: 0
    }
  }

  handleClick = (e) => {

  }

  render() {
    const { result, pageNum } = this.props;
    return (
      <div>
        {result.map(result => {
          return <SearchResultBox
            name={result.hname}
            subject={result.hcall} 
            address={result.hadd}
            price={result.hnum}
            key={result.hnum}
          />
        })}
      </div>
    );
  }
}

export default SearchResultField;