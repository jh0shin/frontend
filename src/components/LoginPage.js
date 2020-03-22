/*global kakao*/

import React from "react";
import './LoginPage.css';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.showLogin();
  }

  showLogin = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      //<![CDATA[
        // 사용할 앱의 JavaScript 키를 설정해 주세요.
        window.Kakao.init('9f17d1af144fec8d4501c5e713f1c0a8');
        // 카카오 로그인 버튼을 생성합니다.
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: function(authObj) {
            alert(JSON.stringify(authObj));
          },
          fail: function(err) {
            alert(JSON.stringify(err));
          }
        });
    };
    //]]>
  }

  render() {
    return (
      <div>
        <a id="kakao-login-btn"></a>
        <a href="http://developers.kakao.com/logout"></a>
      </div>
    );
  }
}

export default SearchInput;