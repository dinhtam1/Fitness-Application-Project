import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Import icon Home

function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/"><FaHome /> Home</Link> {/* Thêm icon Home vào đây */}
        </li>
        <li>
          <Link to="/gender-statistic">Gender Statistic</Link>
        </li>
        <li>
          <Link to="/age-statistic">Age Statistic</Link>
        </li>
        <li>
          <Link to="/weight-statistic">Weight Statistic</Link>
        </li>
        <li>
          <Link to="/height-statistic">Height Statistic</Link>
        </li>
        {/* Thêm các mục khác nếu cần */}
      </ul>
    </aside>
  );
}

export default Sidebar;