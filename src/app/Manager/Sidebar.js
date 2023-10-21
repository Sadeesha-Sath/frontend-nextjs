import React, { useState } from 'react';
import './Sidebar.css'; 

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('home'); 

  const views = [
    {
      title: 'Home',
      url: '',//edit this for proper destination link
    },
    {
      title: 'Cutomers details',
      url: "",//edit this for proper destination link
    },
    {
      title: 'Total transaction report',
      url: '',//edit this for proper destination link
    },
    {
      title: 'Loan installment report',
      url: '',//edit this for proper destination link
    },
    
  ];

  return (
    <div className="sidebar">
      <h2>Manager Dashbord</h2>
      <ul>
        {views.map((option, index) => (
          <li
            key={index}
            className={activeLink === option.title.toLowerCase() ? 'active' : ''}
          >
            <a
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveLink(option.title.toLowerCase())}
              onMouseLeave={() => setActiveLink('')}
            >
              {option.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
