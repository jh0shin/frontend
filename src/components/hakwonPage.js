import React from 'react';
import http from '../api';
import styled from 'styled-components';

const Body = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
	margin: 0 auto;
`;

const MainBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 20px;
`;

const MainText = styled.div`
	margin: 10px;
	font-size: 20px;
`;

const SubBody = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 30px;
`;

const SubTitle = styled.div`
	margin: 10px;
	font-size: 20px;
	font-weight: bold;
`;

const SubText = styled.div`
	margin: 10px;
	font-size: 15px;
`;

class hakwonPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			add: '',
			call: '',
			founder: '',
			hakwonClassInfo: [],
			hasError: false,
			loading: true
		};
	}

	componentDidMount = async () => {
		const { match: { params: { id } } } = this.props;

		const { data: hakwonInfo } = await http.post('/api2/search/id', {
			id: id
		});
		this.setState({ name: hakwonInfo[0].name });
		this.setState({ add: hakwonInfo[0].addr });
		this.setState({ call: hakwonInfo[0].callnum });
		this.setState({ founder: hakwonInfo[0].founder });

		this.setState(() => {
			http
				.post('/api2/classinfo', {
					id: id
				})
				.then((result) =>
					this.setState({
						loading: false,
						hakwonClassInfo: [ ...result.data ]
					})
				);
		});
	};

	// componentDidCatch(error, info) {
	// 	this.setState({ hasError: true });
	// 	console.log(error, info);
	// }

	render() {
		const { name, add, call, founder, hakwonClassInfo, hasError, loading } = this.state;
		const classList = hakwonClassInfo.map((hakwonClassInfo, index) => {
			return (
				<div key={index}>
					<SubTitle>{hakwonClassInfo.class}</SubTitle>
					<SubText>나이 : {hakwonClassInfo.age}</SubText>
					<SubText>가격 : {hakwonClassInfo.cost1}</SubText>
					<SubText>선생님 숫자 : {hakwonClassInfo.teacher}</SubText>
					<SubText>기간 : {hakwonClassInfo.time}</SubText>
				</div>
			);
		});

		if (hasError) {
			return <h1>Something went wrong.</h1>;
		}

		if (loading) {
			return <h1>loading</h1>;
		}

		return (
			<Body>
				<MainBody>
					<MainText>{name}</MainText>
					<MainText>주소 : {add}</MainText>
					<MainText>전화번호 : {call}</MainText>
					<MainText>설립자 : {founder}</MainText>
				</MainBody>
				<SubBody>
					<SubText>커리큘럼</SubText>
					{classList}
				</SubBody>
			</Body>
		);
	}
}

export default hakwonPage;
