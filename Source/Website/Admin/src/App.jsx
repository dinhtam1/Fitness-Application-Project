import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import GenderStatistic from './GenderStatistic';
import AgeStatistic from './AgeStatistic';
import WeightStatistic from './WeightStatistic';
import HeightStatistic from './HeightStatistic';
// Import các component khác của bạn

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gender-statistic" element={<GenderStatistic />} />
          <Route path="/age-statistic" element={<AgeStatistic />} />
          <Route path="/weight-statistic" element={<WeightStatistic />} />
          <Route path="/height-statistic" element={<HeightStatistic />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* Định nghĩa thêm các Route khác ở đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;