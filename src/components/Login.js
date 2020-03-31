import React, {useState } from 'react';
import axios from 'axios';
//import { config } from 'react-transition-group';   // what and why is this here?


const Login = (props) => {

   const initialCreds = {
      username: "",
      password: "",
   }
   const [ creds, setCreds ] = useState(initialCreds);
   const [ error2, setError2 ] = useState(null);
   const [ success, setSuccess ] = useState('no');
   
   const handleChange = (e) => {
      setCreds({...creds, [e.target.name]:e.target.value})
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      const baseUrl = process.env.SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/auth/login';

      axios.post(thisUrl, creds)
         .then((res) => {
            console.log("successful login, response: ", res);
            localStorage.setItem('token', res.data.token);
            setSuccess('yes');
            setTimeout(() => {
               props.history.push('/');
               window.location.reload(false);
            }, 1700);
            
         })
         .catch((err) => {
            console.log("error: ", err.response)
            err.response.data.message && setError2(err.response.data.message);
         });
   }
   
   return (
      <form className="logister" onSubmit={handleSubmit}>
         <h1>login</h1>
         <input type="text" 
            name="username" 
            value={creds.username}
            placeholder="username" 
            onChange={handleChange}
            className="input"></input>

         <input type="password" 
            name="password" 
            value={creds.password}
            placeholder="password" 
            onChange={handleChange}
            className="input"></input>
         <button class="submitButton" type="submit">Submit</button>

         {error2 && <div>{error2}</div>}
         {success==='yes' ? <div className="link">Sucess! Navigating home...</div> : null}
      </form>
   );
}

export default Login;