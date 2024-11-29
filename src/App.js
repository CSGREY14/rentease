// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignIn from './signup';  // Assuming SignIn component is in the same folder
import Login from './login';    // Import the Login component
import Home from './home';
import SearchResults from './searchresults';
import PostProperty from './PostProperty';
import LocationDetails from './LocationDetails';
import PropertyProfile from './PropertyProfile';
import MultiStageForm from './MultiStageForm';
import PropertyDetails from './PropertyDetails';
import UserProfilePage from './UserProfilePage';
import AdminPanel from './AdminPanel';
import VastuCalc from './VastuCalc';
import Contact from './contact';
// Placeholder components for future pages

const About = () => <h2>About Page</h2>;

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/location-details" element={<LocationDetails />} />
          <Route path="/property-profile" element={<PropertyProfile />} />
          <Route path="/msf" element={<MultiStageForm />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path='/user-profile-page' element={<UserProfilePage/>}></Route>
          <Route path='/admin-panel' element={<AdminPanel/>}></Route>
          <Route path='/vastu-calc' element={<VastuCalc/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
