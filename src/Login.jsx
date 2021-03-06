import React from 'react';

function Login() {
  return (
    <div className='App'>
      <h1>Welcome to the Meet app</h1>
      <h4>
        Login to see upcoming events around the world for full-stack developers
      </h4>
      <div className="button_cont" align="center">
        <div class="google-btn">
          <div class='google-icon-wrapper'>
            <img 
              class="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google sign-in"
            />
          </div>
          <a href="https://fzl82g0umf.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url" 
          rel="nofollow noopener"
          class="btn-text">
            <b>Sign in with google</b>
          </a>
        </div>
      </div>
      <a href="public/privacy.html"
      rel='nofollow noopener'>
        Privacy Policy
      </a>
    </div>
  );
}

export default Login;