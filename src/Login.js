import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    console.log(`Email: ${email}, Password: ${password}`);
  };

  const sendInfo = async (event) => {
    event.preventDefault();
    try {
      
      console.log("trying to send!");

      handleCreateAccount();
  
      const action = {
        action: "login",
        user_data: 
          {
            //fname: "first",
           // lname: "last",
            email: email,
            password: password
          }
      };
  
      const response = await fetch('http://localhost:8080/todo-list-201/account', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials" : true,
          "status" : 200
        },
        body: JSON.stringify(action),
        mode: 'no-cors',
      })
      .then((response) => {
        console.log("response");
        console.log(response.body); //displays null
        })
        .then((data) => {
        console.log(data);
          console.log("Success");
        });
    } catch (error) {
      console.error('Error sending user info:', error);
    }
  };
  // CSS STYLES

  const headerStyle = {
    background: '#A795FF', 
    padding: '20px', 
    textAlign: 'left', 
    color: 'white !important', 
    };

  const bodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    margin: '0',
    padding: '0',
    background: '#A795FF',
  };

  const formStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '480px', 
    height: '540px',
    

  };

  const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    fontSize: '16px',
  };

  const labelStyle = {
    fontSize: '14px',
    color: '#333',
    marginBottom: '5px',
  };

  const buttonStyle = {
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    background:'#2B1887',
    width:'384px',
    height:'56px',
    marginTop:'14px',
    alignItems: 'center',
    marginLeft:'48px',
  };

  return (
    <div>
      <div style={headerStyle}>
      <h1 style={{ color: 'white' }}>To do list</h1>
      </div>
      <div style={bodyStyle}>
        <div style={formStyle}>
          <div style={{ ...labelStyle, textAlign: 'center', fontSize: '40px', fontWeight:'bold', marginTop:'48px' }}>
            Welcome Back!
          </div>
          <form onSubmit={sendInfo}>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'48px', marginRight:'48px',marginTop:'48px',}}>
              <label style={labelStyle}>
                EMAIL*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' , marginLeft:'48px', marginRight:'48px', marginTop:'24px',}}>
              <label style={labelStyle}>
                PASSWORD*
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
            <label style={{ display: 'flex', alignItems: 'center',  marginLeft:'48px', marginRight:'48px', marginTop:'24px', fontSize:'12px',}}>
             Forgot your password?
            </label>
            <button type="submit" style={buttonStyle}>
              Log In
            </button>
            <button type="button" onClick={handleCreateAccount} style={buttonStyle}>
              Continue as Guest
            </button>
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
            Don't have an account yet?  <span style={{ color: '#4C3A51', cursor: 'pointer' }}>Sign up now</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
