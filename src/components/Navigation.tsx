import React from 'react';
import { Brain } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <Brain size={24} />
        InterviewAI
      </Link>
      <div className="nav-links">
        {/* <a href="#features" className="nav-link">Features</a>
        <a href="#pricing" className="nav-link">Pricing</a>
        <a href="#blog" className="nav-link">Blog</a> */}
        <Button onClick={() => navigate('/login')}>Get early access</Button>
      </div>
    </nav>
  );
}