import React from 'react';
import './App.css';
import Navbar from './navbar';
import SearchBar from './searchbar';
import RecommendedProperties from './recommendedproperties';
const user = JSON.parse(localStorage.getItem('user'));
function Home() {
  return (
    <div className="App">
      
      <Navbar />
      <SearchBar />
      <RecommendedProperties locality={user.locality}/>
    </div>
  );
}

export default Home;
