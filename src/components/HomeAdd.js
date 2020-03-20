import React from 'react';
import './HomeAdd.css';
import addBigImg from '../img/addImgBig.png'
import addSmallImg from '../img/addImg.png'
import HomeIdInput from '../components/HomeIdInput'

function HomeAdd() {
  return (
    <div className="addField">
        <img className="addImg" src={addBigImg} alt="광고"/>
        <div className="inputStyle"><HomeIdInput/></div>
    </div>
  );
}

export default HomeAdd;