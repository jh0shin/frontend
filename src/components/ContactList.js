import React from 'react';
import http from '../api';

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usArr: [],
            parentArr: [],
            companyArr: [],
            usString: ''
        }
    }

    componentDidMount() {
        var _this = this;
        http.get('/api/contact/list/us')
        .then(function(res) {
            _this.setState({
                usArr: res.data,
            })
            console.log(_this.state.usArr);
        })
        http.get('/api/contact/list/parent')
        .then(function(res) {
            _this.setState({
                parentArr: res.data,
            })
            console.log(_this.state.parentArr);
        })
        http.get('/api/contact/list/company')
        .then(function(res) {
            _this.setState({
                companyArr: res.data,
            })
            console.log(_this.state.companyArr);
        })
    }

    render() {
        const renderUs = this.state.usArr.map(function(item, i) {
            return <li key={i}>{item.data}</li>
        });
        const renderParent = this.state.parentArr.map(function(item, i) {
            return <li key={i}>{item.pname} / {item.sname} / {item.hcall} / {item.address} / {item.grade} / {item.school} / {item.etc}</li>
        });
        const renderCompany = this.state.companyArr.map(function(item, i) {
            return <li key={i}>{item.cname} / {item.name} / {item.lcall} / {item.hcall} / {item.email} / {item.location} / {item.etc}</li>
        });

        return (
            <div>
                CONTACT_US<br/>
                {renderUs}<br/><br/>
                CONTACT_PARENT<br/>
                {renderParent}<br/><br/>
                CONTACT_COMPANY<br/>
                {renderCompany}<br/><br/>
            </div>
        )
    }
}

export default ContactList;