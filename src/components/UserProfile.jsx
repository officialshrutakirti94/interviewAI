import React from 'react';
import { User, Settings } from 'lucide-react';
import { useAuthStore } from '../store/UseAuth';
import { toast } from 'react-toastify/unstyled';
import {useStreak} from "use-streak";



export function UserProfile() {
    const user = useAuthStore((state) => state.user)
    const today = new Date();
    const streak = useStreak(localStorage, today);
    console.log(streak)
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
          <p>--</p>
        </div>
        <div className="stat-item">
          <h3 >Streak</h3>
          <p>{streak.currentCount}🔥</p>
        </div>
      </div>
    </div>
  );
}