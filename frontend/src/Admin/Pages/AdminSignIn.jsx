import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirecting after sign-in
import { adminSignIn } from '../../services/admin_api';
import { toast } from 'react-toastify'; // Import react-toastify for toasts
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await adminSignIn({ email, password });
      console.log('Sign-in successful:', response);

      // Save the token in localStorage and redirect to admin layout
      localStorage.setItem('jwtToken', response.token);
      navigate('/adminhome'); // Redirect to the admin dashboard
    } catch (error) {
      console.error('Sign-in failed:', error);
      toast.error('Sign-in failed: Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Admin Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <toast.Container />
    </div>
  );
};

export default AdminSignIn;
