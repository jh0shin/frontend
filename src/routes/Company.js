import React from 'react';
import CompanyPage from '../components/CompanyPage'
import HomeSelectField from '../components/HomeSelectField'

function Company() {
  return (
    <div>
      <CompanyPage/>
      <HomeSelectField isParent={false}/>
    </div>
  );
}

export default Company;