import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Brain } from 'lucide-react';
import { signInWithPopup,GoogleAuthProvider, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../Firebase/Firebase-config';
import { useAuthStore } from '../store/UseAuth';
import { toast, ToastContainer } from 'react-toastify';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[isloggedin,setisloggedin]=useState(false);
  const navigate=useNavigate()
  const setUser = useAuthStore((state) => state.setUser);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle login logic here
  //   console.log('Login:', { email, password });
  // };

  const handleGoogleSignIn = async() => {
    try{
      
      const provider=new GoogleAuthProvider();
     

    const result=await signInWithPopup(auth,provider);
    const user=result.user;
    console.log(user)
    console.log('Google sign-in clicked');
    setisloggedin(true)
    setUser(user)
    navigate('/dashboard')
    
    

    }catch(error){
      console.log(error)
    }
  };

  const triggetResetPass=async(e)=>{
    e.preventDefault();
    if(!email){
      toast.warning("Enter proper emailid ")
      return;
    }
    try{
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length === 0) {
        toast.error("Email not registered");
        return;
      }
      await sendPasswordResetEmail(auth,email)
      .then(
        toast.success("Reset link send to you mailid")
      )
    }catch(error){
      console.log(error)
      toast.error("failed to reset link")
    }
    
  }

  const handleEmailSignIn=async(e)=>{
    e.preventDefault();
    try{
      const userCredential=await signInWithEmailAndPassword(auth,email,password)

    const user=userCredential.user;
    console.log(user)
    setisloggedin(true)
    setUser(user)
    navigate('/dashboard')
    }catch(error){
      console.log("Erorr::",error)
      console.log("error code ::",error.code)
      toast.error("Wrong credentials 😭")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Brain size={32} className="auth-logo" />
          <h1>Welcome back</h1>
          <p>Sign in to continue to InterviewAI</p>
        </div>

        <button onClick={handleGoogleSignIn} className="google-auth-button">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" />
          Sign in with Google
        </button>

        <div className="auth-divider">
          <span>or continue with email</span>
        </div>

        <form  className="auth-form" onSubmit={handleEmailSignIn}>
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
          <button
            onClick={triggetResetPass}
            style={{
              marginTop: '1rem',
              fontSize: '14px',
              color: '#2563EB', // blue-600
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              transition: 'color 0.2s ease-in-out'
            }}
          >
            Forgot your password?
          </button>

          <Button>Sign in</Button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}