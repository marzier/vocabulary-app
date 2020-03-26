import React, { useState } from 'react';
import axios from 'axios';

const AWTD = ({ show, deck_name }) => {
   const initialInput = {
      words: '',
      deck_name
   };

   const [words, setWords ] = useState(initialInput);

   const hndlChange = (e) => {
      setWords({...words, [e.target.name]:e.target.value});
   }
   
   const hndlSubmit = (e) => {
      e.preventDefault();

      axios.post('http://localhost:6001/words', words, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            console.log("add words to deck res:", res)
         })
         .catch((err) => {
           console.log(err.response); 
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
            <div type='submit' className="addWrdsSbmtBtn">Add</div>
         </form>
      )
   }

   return (
      <div>{show && inputArea()}</div>
   )
}

export default AWTD;
