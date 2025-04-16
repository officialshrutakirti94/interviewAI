import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Brain } from 'lucide-react';
import { createUserWithEmailAndPassword, reload, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase-config';
import { setDoc,doc } from 'firebase/firestore';
import { useAuthStore } from '../store/UseAuth';


export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const navigate=useNavigate()

  const signupWithEmail=async(e)=>{
    e.preventDefault();
    if(!email || !password){
      console.log("provide correct email and password")
    }

    try{
      const userCredential=await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user=userCredential.user;
      // await setDoc(doc(db, "users", user.uid), {
      //   name: name,
      //   email: email,
      //   createdAt: new Date(),
      // });

      await updateProfile(user,{
        displayName:name,
        photoURL:"https://t3.ftcdn.net/jpg/05/19/32/56/360_F_519325685_Wy96q7w50hNTxNjTUYyQbkQnSmHIQxjv.jpg"
      })
      console.log("user details",user)
      console.log("Name======>",user.displayName)
      // setUser(user)
      // navigate('/dashboard')
      await sendEmailVerification(user)
      alert("Verification link send")
      console.log(user)
      const checkVerification=setInterval(async()=>{
        await reload(auth.currentUser);
        if(user.emailVerified){
          setUser(auth.currentUser)
          clearInterval(checkVerification)
          navigate('/dashboard')
        }else{
          alert("Waiting for verification")
        }
      })
    }catch(error){
      console.log("Error==>"+error)
    }

  }
  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log('Google sign-in clicked');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Brain size={32} className="auth-logo" />
          <h1>Create an account</h1>
          <p>Start your interview preparation journey</p>
        </div>

        <button onClick={handleGoogleSignIn} className="google-auth-button">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          Sign up with Google
        </button>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form  className="auth-form" onSubmit={signupWithEmail}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button className="auth-submit">Create account</Button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}