import React, { useState } from 'react';
import axios from 'axios';

const AWTD = ({ show, deck_name }) => {
   const initialInput = {
      words: '',
      deck_name
   };

   const [words, setWords] = useState(initialInput);
   const [error, setError] = useState(null);

   const hndlChange = (e) => {
      setWords({...words, [e.target.name]:e.target.value});
   }
   
   const hndlSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:6001/words', words, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            console.log("add words to deck res:", res);
            setWords(initialInput);
         })
         .catch((err) => {
           console.log(err.response);
           setError(err.response.data.message); 
         })

      
   }

   const inputArea = () => {
      return (
         <form onSubmit={hndlSubmit} className="addWordsForm"> 
            <textarea 
               type='text' 
               name="words" 
               placeholder="word1&#10;word2&#10;word3&#10;...etc"
               onChange={hndlChange}
               className="addWordsTextArea"
            >
            </textarea>
            {error && <div style={{color:'ivory'}}>Sorry, {error}.</div>}
            <button type='submit' className="addWrdsSbmtBtn">Add</button>
         </form>
      )
   }

   return (
      <div>{show && inputArea()}</div>
   )
}

export default AWTD;
