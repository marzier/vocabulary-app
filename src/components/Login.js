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
   
   const handleChange = (e) => {
      setCreds({...creds, [e.target.name]:e.target.value})
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:6001/auth/login', creds)
         .then((res) => {
            console.log("successful login, response: ", res);
            localStorage.setItem('token', res.data.token);
            // setCreds(initialCreds)
            //props.history.push('/')
         })
         .catch((err) => {
            console.log("error: ", err.response)
            err.response.data.message && setError2(err.response.data.message);
         });
   }
   
   return (
      <form onSubmit={handleSubmit}>
         <input type="text" 
            name="username" 
            value={creds.username}
            placeholder="username" 
            onChange={handleChange}></input>

         <input type="password" 
            name="password" 
            value={creds.password}
            placeholder="password" 
            onChange={handleChange}></input>
         <button type="submit">Submit</button>

         {error2 && <div>{error2}</div>}
      </form>
   );
}

export default Login;