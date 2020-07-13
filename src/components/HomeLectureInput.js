import React, { useState } from 'react';
import { Fragment } from "react";
import { useAlert } from "react-alert";
import './HomeInput.css';

import http from '../api';

function HomeLectureInput(){
  const alert = useAlert();
  const [isChecked, setIsChecked] = useState(false);

  const [cname, setCname] = useState('');
  const [name, setName] = useState('');
  const [lcall, setLcall] = useState('');
  const [hcall, setHcall] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [etc, setEtc] = useState('');

  const onChangeCname = e => { setCname(e.target.value); };
  const onChangeName = e => { setName(e.target.value); };
  const onChangeLcall = e => { setLcall(e.target.value); };
  const onChangeHcall = e => { setHcall(e.target.value); };
  const onChangeEmail = e => { setEmail(e.target.value); };
  const onChangeLocation = e => { setLocation(e.target.value); };
  const onChangeEtc = e => { setEtc(e.target.value); };

  const onClickChecked = (() => {
    http.post('/api/contact/company', {
      cname: cname,
      name: name,
      lcall: lcall,
      hcall: hcall,
      email: email,
      location: location,
      etc: etc,
    })
    .then(function (response) {console.log(response)})
    .catch(function (error) {console.log(error)});
    alert.success("검토 후 1영업일 이내에 회신드리겠습니다.");
  })

  return (
    <Fragment>
    <div className="inputField">
      <h2 className="inputTitle">입시설명회 개최</h2>
      <input className="textInput" value={cname} onChange={onChangeCname} type="text" name="companyName" placeholder="기업 (단체명)"/>
      <input className="textInput" value={name} onChange={onChangeName} type="text" name="employeeName" placeholder="담당자 성함"/>
      <input className="textInput" value={lcall} onChange={onChangeLcall} type="text" name="wirePhone" placeholder="유선전화"/>
      <input className="textInput" value={hcall} onChange={onChangeHcall} type="text" name="cellPhone" placeholder="휴대전화"/>
      <input className="textInput" value={email} onChange={onChangeEmail} type="text" name="email" placeholder="이메일"/>
      <input className="textInput" value={location} onChange={onChangeLocation} type="text" name="place" placeholder="강연 지역"/>
      <textarea className="massageInput" value={etc} onChange={onChangeEtc} type="text" name="message" rows="10" cols="30" placeholder="기타 요청 사항 (관심 과목, 성적대, 성향 등)"/>
      <div className = "checkboxFlex">
        <label className="checkbox"><input type="checkbox" onChange={ () => setIsChecked(!isChecked) } name="agree"/></label>
        <span className="checkboxLabel">개인정보 수집 및 이용에 동의합니다</span>
      </div>
      <button onClick={ isChecked 
        ? onClickChecked
        : () => { alert.error("개인정보 동의 및 이용에 체크해 주십시오"); }
        } className="inputButton">접수하기
      </button>
    </div>
    </Fragment>
  );
}

export default HomeLectureInput;