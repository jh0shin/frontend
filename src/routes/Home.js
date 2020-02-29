import React from 'react';
import HomeImg from '../components/HomeImg'
import HomeSelectField from '../components/HomeSelectField'
import HomeIdInput from '../components/HomeIdInput'
import HomeAdd from '../components/HomeAdd';

function Home() {
  return (
    <div>
      <HomeAdd/>
      <HomeIdInput/>
      <HomeImg/>
      <HomeSelectField/>
    </div>
  );
}

export default Home;