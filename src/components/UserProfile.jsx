import React from 'react';
import { User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/UseAuth';



export function UserProfile() {
    const user = useAuthStore((state) => state.user);
    // console.log(user)
    // console.log("Image url======>",user.photoURL)
    
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
        <img src={user.photoURL} alt="User avatar" width={100} />

        </div>
        <div className="profile-info">
          <h5>{user?.displayName || "name not available"}</h5>
          <p>{user?.email || "Email not available"}</p>
        </div>
        <button className="profile-settings">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <h3>Quiz Completed</h3>
          <p>{user?.userCompletion}</p>
        </div>
        <div className="stat-item">
          <h3 >Streak</h3>
          <p>2 ️‍🔥</p>
        </div>
      </div>
    </div>
  );
}