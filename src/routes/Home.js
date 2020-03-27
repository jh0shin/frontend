import React from 'react';
import HomeSelectField from '../components/HomeSelectField'
import HomeAdd from '../components/HomeAdd';
import HomePage from '../components/HomePage'

function Home() {
  return (
    <div>
      <HomeAdd/>
      <HomePage/>
      <HomeSelectField isParent={true}/>
    </div>
  );
}

export default Home;