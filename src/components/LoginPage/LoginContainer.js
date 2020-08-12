import React from 'react';
import { connect } from 'react-redux';
import LoginPresenter from './LoginPresenter';
import { changeState, changeId, changeData } from '../../store/modules/login';

class LoginContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: 'kakao',
			pageClse: false
		};
	}

	componentDidMount = () => {
		// console.log('mount');
	};

	loginWhenClose = () => {
		const { pageClse } = this.state;
		this.setState({});
	};

	responseKaKao = (res) => {
		this.setState({
			data: res
		});
		// console.log(this.state.data);
		const { changeState, changeId, changeData } = this.props;
		changeId(this.state.data.profile.id);
		changeData(this.state.data);
		changeState(true);
		localStorage.setItem('isLogin', true);
		localStorage.setItem('userId', this.state.data.profile.id);
		localStorage.setItem('userData', JSON.stringify(this.state.data));
		// console.log(JSON.parse(localStorage.getItem('userData'))); 다시 객체로 변형하기
	};

	responseFail = (err) => {
		alert(err);
	};

	logout = () => {
		const { changeState } = this.props;
		changeState(false);
		localStorage.setItem('isLogin', false);
		localStorage.removeItem('userId');
		localStorage.removeItem('userData');

		// window.Kakao.Auth.logout(function() {
		// 	alert('logout');
		// });
		// 카카오톡 제공 로그아웃 함수

		if (!(window.Kakao === undefined)) {
			window.Kakao.API.request({
				url: '/v1/user/unlink',
				success: function(res) {
					// alert('success: ' + JSON.stringify(res));
				},
				fail: function(err) {
					alert('fail: ' + JSON.stringify(err));
				}
			});
		}
	};

	render() {
		const { isLogin, userId, userData } = this.props;
		// console.log(userData);
		return (
			<LoginPresenter
				responseKaKao={this.responseKaKao}
				responseFail={this.responseFail}
				isLogin={isLogin}
				userId={userId}
				userData={userData}
				logout={this.logout}
			/>
		);
	}
}

// props 로 넣어줄 스토어 상태값
const mapStateToProps = (state) => ({
	isLogin: state.login.isLogin,
	userId: state.login.userId,
	userData: state.login.userData
});

// props 로 넣어줄 액션 생성함수
const mapDispatchToProps = (dispatch) => ({
	changeState: (isLogin) => dispatch(changeState(isLogin)),
	changeId: (userId) => dispatch(changeId(userId)),
	changeData: (userData) => dispatch(changeData(userData))
});

// 컴포넌트에 리덕스 스토어를 연동해줄 때에는 connect 함수 사용
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

// 카카오 데이터 정리
// profile.id : api에서 사용할 id
// profile.kakao_account.email : 유저 이메일
// profile.kakao_account.profile.nickname : 유저 카카오톡 이름
// profile.kakao_account.profile.profile_image_url : 유저 카카오톡 프로필 이미지
// profile.kakao_account.profile.thumbnail_image_url : 유저 카카오톡 썸네일
// profile.response.access_token : 엑세스 토큰
// profile.response.refresh_token : 리프레쉬 토큰
