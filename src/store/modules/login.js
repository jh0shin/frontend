const LOGIN_STATE = 'login/LOGIN_STATE';
const USER_ID = 'login/USER_ID';
const USER_DATA = 'login/USER_DATA';

export const changeState = (isLogin) => ({ type: LOGIN_STATE, isLogin });
export const changeId = (userId) => ({ type: USER_ID, userId });
export const changeData = (userData) => ({ type: USER_DATA, userData });

const initialState = {
	isLogin: false,
	userId: null,
	userData: null
};

export default function login(state = initialState, action) {
	switch (action.type) {
		case LOGIN_STATE:
			return {
				...state,
				isLogin: action.isLogin
			};
		case USER_ID:
			return {
				...state,
				userId: action.userId
			};
		case USER_DATA:
			return {
				...state,
				userData: action.userData
			};
		default:
			return state;
	}
}

// 액션 타입 정의
// const CHANGE_NUM = 'counter/CHANGE_NUM';

// 액션 생섬함수 정의
// export const changeNum = (number) => ({ type: CHANGE_NUM, number });

// **** 초기상태 정의
// const initialState = {
// 	number: 4
// };

// **** 리듀서 작성
// export default function counter(state = initialState, action) {
// 	switch (action.type) {
// 		case CHANGE_NUM:
// 			return {
// 				...state,
// 				number: action.number
// 			};
// 		default:
// 			return state;
// 	}
// }
