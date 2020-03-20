import React from 'react';
import './HomeSelectField.css';
import HomeOfflineInput from './HomeOfflineInput'
import { Link } from 'react-router-dom'

class HomeSelectField extends React.Component{

  render(){
    return (
        <div className="field">
          <h1 id="requestTitle">REQUEST</h1>
          <h2>자문 요청</h2>
          <div><HomeOfflineInput/></div>
          <Link id="companyButton" to="/company">기업 자문 요청 페이지로 가기</Link>
        </div>
    );
  }
}

export default HomeSelectField;