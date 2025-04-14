import React from 'react';
import { UserProfile } from './UserProfile';
import { Brain, LogOut } from 'lucide-react';
import { ChatBox } from './ChatBox';

export function Dashboard() {
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <Brain size={24} />
          <span>InterviewAI</span>
        </div>
        <button className="logout-button">
          <LogOut size={20} />
          <a href='/'>Logout</a>
        </button>
      </nav>
      
      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <UserProfile />
        </aside>
        <main className="dashboard-main">
          <ChatBox />
        </main>
      </div>
    </div>
  );
}