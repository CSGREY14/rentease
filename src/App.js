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
// Placeholder components for future pages

const About = () => <h2>About Page</h2>;

function App() {
  return (
    <Router>
      <div>
      {  <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> }
         
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
