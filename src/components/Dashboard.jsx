import React, { useState } from 'react';
import { UserProfile } from './UserProfile';
import { Brain, LogOut } from 'lucide-react';
import { ChatBox } from './ChatBox';
import Quiz from './Quiz';

export function Dashboard() {
  const [activeComponent,setactivecomponent]=useState('chat')
  const toggleComponent=()=>{
    setactivecomponent((prev)=>(prev==="quiz"?"chat":"quiz"))
  }
  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <Brain size={24} />
          <span>InterviewAI</span>
          <div className="list">
          <button
  onClick={toggleComponent}
  style={{
    backgroundColor: '#4F46E5', // Indigo-600
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
  }}
>
{activeComponent === "quiz" ? "Show Chat" : "Show Quiz"}
</button>

        </div>
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
          {activeComponent==='chat' && <ChatBox/>}
          {activeComponent==='quiz' && <Quiz/>}
        </main>
      </div>
    </div>
  );
}