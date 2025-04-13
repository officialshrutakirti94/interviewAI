import React from 'react';
import { User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/UseAuth';



export function UserProfile() {
    const user = useAuthStore((state) => state.user);
    console.log(user)
    console.log("Image url======>",user.photoURL)
    
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
        <img src="https://lh3.googleusercontent.com/a/ACg8ocKeRvxgVuBzWz52URN-dcUYD9VH-11XYmQAFlh-Fza_ay_wD_N2tQ=s96-c" alt="User avatar" width={100} />

        </div>
        <div className="profile-info">
          <h5>{user.displayName}</h5>
          <p>{user.email}</p>
        </div>
        <button className="profile-settings">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <h3>Interviews Completed</h3>
          <p>{user?.userCompletion}</p>
        </div>
        <div className="stat-item">
          <h3>Last Active</h3>
          <p>{user.lastActive}</p>
        </div>
      </div>
    </div>
  );
}