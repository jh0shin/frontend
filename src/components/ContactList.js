import React from 'react';
import http from '../api';

class ContactList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usArr: [],
			parentArr: [],
			companyArr: [],
			testArr: [],
			usString: ''
		};
	}

	componentDidMount() {
		var _this = this;
		http.get('/api/contact/list/us').then(function(res) {
			_this.setState({
				usArr: res.data
			});
			console.log(_this.state.usArr);
		});
		http.get('/api/contact/list/parent').then(function(res) {
			_this.setState({
				parentArr: res.data
			});
			console.log(_this.state.parentArr);
		});
		http.get('/api/contact/list/company').then(function(res) {
			_this.setState({
				companyArr: res.data
			});
			console.log(_this.state.companyArr);
		});
		http
			.post('/api/search/name', {
				name: '',
				limit: '10',
				offset: '0',
				sido: '성남시',
				gungu: '수내동',
				subject: '토익',
				grade: '',
				lowprice: '',
				highprice: ''
			})
			.then(function(res) {
				console.log(res.data);
				_this.setState({
					testArr: res.data
				});
			});
		http
			.post('/api/search/id', {
				id: '3423'
			})
			.then(function(res) {
				console.log(res.data);
			});
	}

	render() {
		const renderUs = this.state.usArr.map(function(item, i) {
			return <li key={i}>{item.data}</li>;
		});
		const renderParent = this.state.parentArr.map(function(item, i) {
			return (
				<li key={i}>
					{item.pname} / {item.sname} / {item.hcall} / {item.address} / {item.grade} / {item.school} / {item.etc}
				</li>
			);
		});
		const renderCompany = this.state.companyArr.map(function(item, i) {
			return (
				<li key={i}>
					{item.cname} / {item.name} / {item.lcall} / {item.hcall} / {item.email} / {item.location} / {item.etc}
				</li>
			);
		});
		const renderTest = this.state.testArr.map(function(item, i) {
			return <li key={i}>{item.name}</li>;
		});

		return (
			<div>
				CONTACT_US<br />
				{renderUs}
				<br />
				<br />
				CONTACT_PARENT<br />
				{renderParent}
				<br />
				<br />
				CONTACT_COMPANY<br />
				{renderCompany}
				<br />
				<br />
				TESTARR<br />
				{renderTest}
				<br />
				<br />
			</div>
		);
	}
}

export default ContactList;
