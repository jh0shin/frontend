import React, { useState } from 'react';
import { Fragment } from "react";
import { useAlert } from "react-alert";
import './HomeInput.css';

import http from '../api';

function HomeOfflineInput(){
  const alert = useAlert();
  const [isChecked, setIsChecked] = useState(false);

  const [pname, setPname] = useState('');
  const [sname, setSname] = useState('');
  const [hcall, setHcall] = useState('');
  const [address, setAddress] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [etc, setEtc] = useState('');

  const onChangePname = e => { setPname(e.target.value); };
  const onChangeSname = e => { setSname(e.target.value); };
  const onChangeHcall = e => { setHcall(e.target.value); };
  const onChangeAddress = e => { setAddress(e.target.value); };
  const onChangeGrade = e => { setGrade(e.target.value); };
  const onChangeSchool = e => { setSchool(e.target.value); };
  const onChangeEtc = e => { setEtc(e.target.value); };

  const onClickChecked = (() => {
    http.post('/api/contact/parent', {
      pname: pname,
      sname: sname,
      hcall: hcall,
      address: address,
      grade: grade,
      school: school,
      etc: etc,
    })
    .then(function (response) {console.log(response)})
    .catch(function (error) {console.log(error)});
    alert.success("검토 후 1영업일 이내에 회신드리겠습니다.");
  })

  return (
    <Fragment>
    <div className="inputField">
      <h2 className="inputTitle">학원 자문 요청</h2>
      <input className="textInput" type="text" value={pname} onChange={onChangePname} name="parentsName" placeholder="학부모명"/>
      <input className="textInput" type="text" value={sname} onChange={onChangeSname} name="childName" placeholder="자녀명"/>
      {/* 여기부터 */}
      <input className="textInput" type="text" value={hcall} onChange={onChangeSname} name="childName" placeholder="학부모 전화번호"/> 
      <input className="textInput" type="text" value={hcall} onChange={onChangeSname} name="childName" placeholder="자녀 전화번호"/>
      <input className="textInput" type="text" value={hcall} onChange={onChangeSname} name="childName" placeholder="이메일"/>
      {/* 여기까지 추가된 부분 백연결 필요 */}
      <input className="textInput" type="text" value={address} onChange={onChangeAddress}  name="place" placeholder="거주지 (동까지)"/>
      <input className="textInput" type="text" value={grade} onChange={onChangeGrade}  name="childGrage" placeholder="자녀 학년"/>
      <input className="textInput" type="text" value={school} onChange={onChangeSchool} name="childSchool" placeholder="자녀 학교"/>
      <textarea className="massageInput" type="text" value={etc} onChange={onChangeEtc} name="message" rows="10" cols="30" placeholder="기타 요청 사항 (관심 과목, 성적대, 성향 등)"/>
      <label className="checkbox"><input className="checkbox" type="checkbox" onChange={ () => setIsChecked(!isChecked) } name="agree"/>개인정보 수집 및 이용에 동의합니다.</label>
      <button onClick={ isChecked
        ? onClickChecked
        : () => {alert.error("개인정보 동의 및 이용에 체크해 주십시오");}
        } className="inputButton">접수하기
      </button>
    </div>
    </Fragment>
  );
}

export default HomeOfflineInput;