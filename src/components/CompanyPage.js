import React from 'react';
import './CompanyPage.css';
import companyCap from '../img/companyCap.png'
import companyPic1 from '../img/companyPic1.png'
import companyPic2 from '../img/companyPic2.png'
import companyPic3 from '../img/companyPic3.png'

function CompanyPage() {
  return (
    <div id = "comPage">
      <div id = "firstPara">
        <span id = "firOne">학원고는<br/>워킹맘의 자녀 입시 문제를 해결하는 기업입니다.</span>
        <span id = "firTwo">많은 워킹맘들이 자녀 입시설명회조차<br/>마음놓고 참석하지 못한다는 사실, 알고 계셨나요?</span>
        <img id = "companyCap" src={companyCap} alt="캡쳐" title="캡쳐"/>
        <span id = "firThree">출처 = 맘카페 캡쳐</span>
      </div>
      <div id = "secondPara">
        <span id = "secOne">귀사에 재직중인 워킹대디∙워킹맘을 위한<br/>퇴근 후 참석하는 입시설명회 어떠세요?</span>
        <div id = "secFlex">
          <div id = "secFlexBox">
            <img id = "companyPic" src={companyPic1} alt="캡쳐" title="캡쳐"/>
            <span id = "companyText">대치동 출신 입시전문가<br/>인력 pool</span>
          </div> 
          <div id = "secFlexBox">
            <img id = "companyPic" src={companyPic2} alt="캡쳐" title="캡쳐"/>
            <span id = "companyText">2020년 3월 기준<br/>비용 제로</span>
          </div>
          <div id = "secFlexBox">
            <img id = "companyPic" src={companyPic3} alt="캡쳐" title="캡쳐"/>
            <span id = "companyText">실질적인 도움이 되는<br/>가족친화 프로그램을<br/>운영합니다.</span>
          </div>
        </div>
      </div>
      <div id = "thirdColor">
        <div id = "thirdPara">
          <div id = "thiFlexBox">
            <span id = "thiOne">"</span>
            <span id = "thiTwo">아이의 학년이 올라갈수록 자녀 교육의 방향을 잡지 못해 고민이 많았습니다. 주위에서 마음을 터놓고 상의할 육아 선배도 없었구요.</span>
            <span id = "thiOne">하지만 워킹맘을 배려하는 학원고 프로그램 덕에, 전문가와 충분한 상의를 거치고 자녀의 중학교 입학에 대비할 수 있었습니다.</span>
            <span id = "thiFive">"</span>
            <span id = "thiFour">중1, 초6 자녀를 둔 마포의 워킹맘 <br/> A씨</span>
          </div>
          <div id = "thiFlexBox">
            <span id = "thiOne">"</span>
            <span id = "thiTwo">우리 아이는 잘 컸습니다. 아니 잘 컸다고 생각했습니다. 고1 첫 시험 성적표를 받아오기 전까지는...</span>
            <span id = "thiOne">아빠들이 대치동 학원가 귀동냥하기 쉽지 않은데, 회사로 찾아온 학원고 전문가덕에 아이의 교육문제에 관해 마음 놓고 상담할 수 있었습니다.</span>
            <span id = "thiFive">"</span>
            <span id = "thiFour">고1 자녀를 둔 천안의 워킹대디 <br/> B씨</span>
          </div>
        </div>
      </div>
      <div id = "fourthColor">
        <div id = "fourthPara">
          <div id = "fouLine"></div>
          <span id = "fouOne">학원고 입시설명회</span>
          <span id = "fouTwo">퇴근 후 오피스에서 대치동의 입시설명회를 만나보세요</span>
          <span id = "fouThree">참석자 수요 조사</span>
          <span id = "fouFour">초등학생 자녀를 둔 워킹맘에게 2021 대입 전형은 가장 중요한 관심사가 아닐 것입니다. 학원고가 가장 중요하게 생각하는 가치는 참석자의 만족입니다. 학원고는 사전 참석자 조사를 통해, 임직원들의 관심사에 가장 부합하는 주제를 다룰 수 있는 입시 전문가를 초빙합니다.</span>
          <span id = "fouThree">사전 조율 및 상담</span>
          <span id = "fouFour">연사 초청부터 장소 대관까지, 기업 담당자와의 끊입없는 협의 및 조율을 통해 임직원도, 사장님도 만족할 수 있는 행사를 진행합니다.</span>
          <span id = "fouThree">중고생 자녀를 둔 임직원에게 실질적인 도움이 되는 행사</span>
          <span id = "fouFour">영유아 자녀를 둔 임직원 위주의 가족친화 프로그램에서 벗어나, 중고생 자녀를 둔 임직원에게 가장 큰 화두인 입시 문제를 다룹니다.</span>
          <span id = "fouThree">행사 구성</span>
          <span id = "fouFour">퇴근 후 회사 내 세미나실 (사측 장소 제공이 가능한 경우)/ 근처 자체 대관 세미나실에서 행사가 진행됩니다. 강연 약 1시간 및 Q&A session 약 2시간으로 구성되어, 임직원들의 실질적인 자녀 교육 궁금증을 풀어나가는 시간을 제공하고자 합니다.</span>
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;