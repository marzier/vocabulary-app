import React, {useState } from 'react';
import axios from 'axios';
import { config } from 'react-transition-group';


const Register = (props) => {

   const initialCreds = {
      username: '',
      password: '',
   }
   const [ creds, setCreds ] = useState(initialCreds);
   const [ error, setError ] = useState(null);
   
   const handleChange = (e) => {
      setCreds({...creds, [e.target.name]:e.target.value})
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:6001/auth/register', creds)
         .then((res) => {
            console.log("successful registration, response: ", res);
            props.history.push('/') // need to push to login
         })
         .catch((err) => {
            //console.log("error: ", err.response)
            err.response.data.message && setError(err.response.data.message);
         });
   }
   
   return (
      <form className="logister" onSubmit={handleSubmit}>
         <h1>register</h1>
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

         {error && <div>{error}</div>}
      </form>
   );
}

export default Register;