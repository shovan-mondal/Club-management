import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Signup from './SignupPage/Signup'; 

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="App">
        <Signup />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;