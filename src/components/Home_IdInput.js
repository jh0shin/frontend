import React, { useState } from "react";
import { useAlert } from "react-alert";
import './Home_IdInput.css';
import searchButton from '../img/glass.png'

import http from '../api';

function Home_IdInput() {
  const alert = useAlert();

  const [input, setInput] = useState('');

  const onChangeInput = e => {
    setInput(e.target.value);
  };

  const onClick = (() => {
    http.post('/api/contact/us', {
      data: input,
    })
    .then(function (response) {console.log(response)})
    .catch(function (error) {console.log(error)})
    console.log(input);
    alert.success(input);
  })

  return (
    <div className="back">
		  <h1>학원고 Coming Soon!</h1>
      <div className="inputBar">
        <input className="searchInput" type="text" value={input} onChange={onChangeInput} name="hakoneName" placeholder="이메일/카톡아이디를 입력해주세요"/>
        <button onClick={onClick} className="searchButton"><img className="buttonImg" src={searchButton} alt="검색"/>
        </button>
      </div>
	  </div>
  );
}

export default Home_IdInput;