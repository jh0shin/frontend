import React from 'react';
import HomeSelectField from '../components/HomeSelectField'
import HomeAdd from '../components/HomeAdd';

function Home() {
  return (
    <div>
      <HomeAdd/>
      <HomeSelectField isParent={true}/>
    </div>
  );
}

export default Home;