import React from 'react';
import styled from 'styled-components';

function LoginPageCont({ name, subject, address, key }) {
	return (
		<Body>
			<Text>카카오톡 간편 로그인</Text>
			<Text>로그인 후 더 많은 혜택을 누리세요!</Text>
			<KaKaoBtn
				jsKey={'9f17d1af144fec8d4501c5e713f1c0a8'}
				buttonText="KaKao"
				onSuccess={this.responseKaKao}
				onFailure={this.responseFail}
				getProfile={true}
			/>
		</Body>
	);
}

const Body = styled.div`
	width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const Text = styled.div`
	margin: 10px;
	font-size: 20px;
`;

const KaKaoBtn = styled(KaKaoLogin)`
		margin-top: 20px;
    padding: 0;
    width: 190px;
    height: 44px;
    line-height: 44px;
    color: #783c00;
    background-color: #FFEB00;
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2)
    }
`;

export default LoginPageCont;
