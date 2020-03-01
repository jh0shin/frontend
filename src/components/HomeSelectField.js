import React from 'react';
import './HomeSelectField.css';
import HomeOfflineInput from './HomeOfflineInput'
import HomeLectureInput from './HomeLectureInput';

class HomeSelectField extends React.Component{
  state = {
    isParents: true
  }
  parents = () => {
    this.setState({isParents: true});
  };
  company = () => {
    this.setState({isParents: false});
  };

  render(){
    return (
        <div className="field">
          <h1 id="requestTitle">REQUEST</h1>
          <h2>강연 및 자문 요청</h2>
          <button onClick={this.parents} className="selectButton">학원 자문 요청<br/>(학부모)</button>
          <button onClick={this.company} className="selectButton">입시 설명회 개최 요청<br/>(기업)</button>
          {this.state.isParents ? <HomeOfflineInput/> : <HomeLectureInput/>}
        </div>
    );
  }
}

export default HomeSelectField;