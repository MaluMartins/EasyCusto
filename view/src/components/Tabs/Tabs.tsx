import React, { useState } from 'react';
import './tabs.css';

interface TabProps {
  label: string;
  content: React.ReactNode;
}

const Tabs: React.FC<{ tabs: TabProps[] }> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div id="tabs">
      <div className="tabs-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? 'tab-active' : ''}`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
