import React, { Component } from 'react';
import './ReportsurveyPage.css';

class ReportsurveyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade : 0,
      subject : 0,
      defaultOption : 0,
      queOne : 0,
      queTwo : 0,
      queThree : 0
    };
    this.onGradeCallback = this.onGradeCallback.bind(this);
    this.onSubjectCallback = this.onSubjectCallback.bind(this);
    this.onOptionCallback = this.onOptionCallback.bind(this);
    this.onQueOneCallback = this.onQueOneCallback.bind(this);
    this.onQueTwoCallback = this.onQueTwoCallback.bind(this);
    this.onQueThreeCallback = this.onQueThreeCallback.bind(this);
  }

  onGradeCallback(gradeCall) {
    this.setState({grade : gradeCall});
  }

  onSubjectCallback(subjectCall) {
    this.setState({subject : subjectCall});
  }

  onOptionCallback(optionCall) {
    this.setState({defaultOption : optionCall});
  }

  onQueOneCallback(queCall) {
    this.setState({queOne : queCall});
  }
  onQueTwoCallback(queCall) {
    this.setState({queTwo : queCall});
  }
  onQueThreeCallback(queCall) {
    this.setState({queThree : queCall});
  }

  render (){
    let one=0, two=0, three=0, four=0, five=0, six=0, result = 0;
    const { grade, subject, defaultOption, queOne, queTwo, queThree } = this.state;
    if(grade == 0){
      one = 1;
    }else{
      if(subject == 0){
        two = 1;
      }else if(subject == 1){
        if(defaultOption == 0){
          three = 1;
        }else{
          if(queOne == 0){
            four = 1;
          }else if(queOne == 1){
            if(queTwo == 0){
              five = 1;
            }else if(queTwo == 1){
              if(queThree == 0){
                six = 1;
              }else if(queThree == 1){
                result = 9;
              }else{
                result = 3;
              }
            }else{
              if(queThree == 0){
                six = 1;
              }else if(queThree == 1){
                result = 4;
              }else{
                result = 1;
              }
            }
          }else{
            result = 2;
          }
        }
      }else if(subject == 2){
        if(defaultOption == 0){
          three = 1;
        }else{
          if(queOne == 0){
            four = 1;
          }else if(queOne == 1){
            if(queThree == 0){
              six = 1;
            }else if(queThree == 1){
              result = 7;
            }else{
              result = 5;
            }
          }else{
            result = 2;
          }
        }
      }else{
        if(defaultOption == 0){
          three = 1;
        }else{
          if(queOne == 0){
            four = 1;
          }else if(queOne == 1){
            if(queThree == 0){
              six = 1;
            }else if(queThree == 1){
              result = 8;
            }else{
              result = 6;
            }
          }else{
            result = 2;
          }
        }
      }
    }
    return(
      <div className = "reportsurveyBody">
        <div className = "reportsurveyTitle">학원고 Report</div>
        <div className = "reportsurveyExp">예상 견적 확인</div>
        {one ? <ReportsurveyGrade gradeChange={this.onGradeCallback}/> : ""}
        {two ? <ReportsurveySubject subjectChange={this.onSubjectCallback} gradeChange={this.onGradeCallback}/> : ""}
        {three ? <ReportsurveyDefault optionChange={this.onOptionCallback} subjectChange={this.onSubjectCallback}/> : ""}
        {four ? <ReportsurveyQuestion queChange={this.onQueOneCallback} queChangeBack={this.onOptionCallback}/> : ""}
        {five ? <ReportsurveyQuestion queChange={this.onQueTwoCallback} queChangeBack={this.onQueOneCallback}/> : ""}
        {six ? <ReportsurveyQuestion queChange={this.onQueThreeCallback} queChangeBack={this.onQueTwoCallback}/> : ""}
        {result ? result : ""}
      </div>
    )
  }
}

class ReportsurveyGrade extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  gradeClick = (e) => {
    e.preventDefault();
    this.props.gradeChange(e.target.id);
  }

  render (){
    return(
      <div className = "reportsurveyCompBody">
        <div className = "reportsurveyCompTitle">자녀의 학년을 선택해 주세요</div>
        <button className = "reportsurveyCompButton" id = "1" onClick={this.gradeClick}>초등학생</button>
        <button className = "reportsurveyCompButton" id = "2" onClick={this.gradeClick}>중학교 1~2학년</button>
        <button className = "reportsurveyCompButton" id = "3" onClick={this.gradeClick}>중학교 3학년</button>
        <button className = "reportsurveyCompButton" id = "4" onClick={this.gradeClick}>고등학교 1학년</button>
        <button className = "reportsurveyCompButton" id = "5" onClick={this.gradeClick}>고등학교 2학년</button>
        <button className = "reportsurveyCompButton" id = "6" onClick={this.gradeClick}>고등학교 3학년</button>
      </div>
    )
  }
}

class ReportsurveySubject extends Component{
  constructor(props) {
    super(props);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      checkboxGroup: {
        kor: false,
        mat: false,
        eng: false,
        sci: false,
        soc: false,
        all: false,
        oth: false
      },
      len : 0
    }
  }

  handleCheckbox(e) {
    const {checkboxGroup, len} = this.state
    let obj = checkboxGroup
    if (e.target.checked == true){
      if( len < 3 ){
        obj[e.target.value] = e.target.checked
        this.setState({len : len+1})
        this.setState({checkboxGroup: obj})
      }
    }
    else{
      obj[e.target.value] = e.target.checked
      this.setState({len : len-1})
      this.setState({checkboxGroup: obj})
    }
    
  }

  subjectClick = (e) => {
    e.preventDefault();
    this.props.subjectChange(this.state.len);
  }

  gradeClick = (e) => {
    e.preventDefault();
    this.props.gradeChange(0);
  }

  render (){
    return(
      <div className = "reportsurveyCompBody">
        <div className = "reportsurveyCompTitle">도움이 필요한 과목을 선택해주세요</div>
        <label  className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='kor' checked={this.state.checkboxGroup['kor']} onChange={this.handleCheckbox}/>
          국어
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='mat' checked={this.state.checkboxGroup['mat']} onChange={this.handleCheckbox}/>
          수학
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='eng' checked={this.state.checkboxGroup['eng']} onChange={this.handleCheckbox}/>
          영어
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='sci' checked={this.state.checkboxGroup['sci']} onChange={this.handleCheckbox}/>
          과학
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='soc' checked={this.state.checkboxGroup['soc']} onChange={this.handleCheckbox}/>
          사회
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='all' checked={this.state.checkboxGroup['all']} onChange={this.handleCheckbox}/>
          학습전반
        </label>
        <label className = "reportsurveyCompButton">
          <input type="checkbox" name="checkboxGroup" value='oth' checked={this.state.checkboxGroup['oth']} onChange={this.handleCheckbox}/>
          기타
        </label>
        <div className = "reportsurveyCompBN">
          <button className = "reportsurveyCompBack" onClick={this.gradeClick}>뒤로</button>
          <button className = "reportsurveyCompNext" onClick={this.subjectClick}>다음</button>
        </div>
      </div>
    )
  }
}

class ReportsurveyDefault extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  defaultClickNext = (e) => {
    e.preventDefault();
    this.props.optionChange(1);
  }

  defaultClickBack = (e) => {
    e.preventDefault();
    this.props.subjectChange(0);
  }

  render (){
    return(
      <div className = "reportsurveyCompBody">
        <div className = "reportsurveyCompTitle">기본 제공 항목은 다음과 같습니다.</div>
        <div className = "reportsurveyCompBN">
          <button className = "reportsurveyCompBack" onClick={this.defaultClickBack}>뒤로</button>
          <button className = "reportsurveyCompNext" onClick={this.defaultClickNext}>다음</button>
        </div>
      </div>
    )
  }
}

class ReportsurveyQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  defaultClickNext = (e) => {
    e.preventDefault();
    this.props.queChange(e.target.id);
  }

  defaultClickBack = (e) => {
    e.preventDefault();
    this.props.queChangeBack(0);
  }

  render (){
    return(
      <div className = "reportsurveyCompBody">
        <div className = "reportsurveyCompTitle">옵션</div>
        <div className = "reportsurveyCompBN">
          <button className = "reportsurveyCompBack" onClick={this.defaultClickBack}>뒤로</button>
          <button className = "reportsurveyCompBack" id="2" onClick={this.defaultClickNext}>괜찮아요</button>
          <button className = "reportsurveyCompNext" id="1" onClick={this.defaultClickNext}>해주세요</button>
        </div>
      </div>
    )
  }
}

export default ReportsurveyPage;