import React, { useEffect, useState } from 'react';
import { UserProfile } from './UserProfile';
import { Brain, LogOut } from 'lucide-react';
import { ChatBox } from './ChatBox';
import Quiz from './Quiz';
import { toast, ToastContainer } from 'react-toastify';
import CodeEditor from './CodeEditor';

export function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('chat');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const toggleComponent = () => {
    setActiveComponent((prev) => (prev === "quiz" ? "chat" : "quiz"));
  };

  const handleEditorClick = () => {
    setActiveComponent("codeEditor");
  };

  useEffect(() => {
    toast.success('You are logged in ✅');

    // Handle window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="dashboard-layout">
      <nav className="dashboard-nav">
        <div className="nav-brand" style={{ gap: '1rem' }}>
          <Brain size={24} />
          <span>InterviewAI</span>

          <div
            className="list"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '12px',
              alignItems: isMobile ? 'flex-start' : 'center',
            }}
          >
            <button
              onClick={toggleComponent}
              style={{
                backgroundColor: '#4F46E5',
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

            <button
              onClick={handleEditorClick}
              style={{
                backgroundColor: '#4F46E5',
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
              Code Editor
            </button>
          </div>
        </div>

        <button className="logout-button">
          <LogOut size={20} />
          <a href="/">Logout</a>
        </button>
      </nav>

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <UserProfile />
        </aside>
        <main className="dashboard-main">
          {activeComponent === 'chat' && <ChatBox />}
          {activeComponent === 'quiz' && <Quiz />}
          {activeComponent === 'codeEditor' && <CodeEditor />}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
