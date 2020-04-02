import React, { useState } from 'react';
import axios from 'axios';

const AWTD = ({ show, deck_name }) => {
   const initialInput = {
      words: '',
      deck_name,
      error: null,
      wordsNotFound: [],
   };

   const [words, setWords] = useState(initialInput);

   // const [error, setError] = useState(null);
   // const [wordsNotFound, setWNF ] = useState([]);

   const hndlChange = (e) => {
      setWords({...words, [e.target.name]:e.target.value});
   }
   
   const hndlSubmit = (e) => {
      e.preventDefault();

      const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/words';
      axios.post(thisUrl, words, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            //console.log("add words to deck res:", res);
            setWords({
               ...words,
               wordsNotFound: res.data.notFound,
               words: initialInput.words,
               error:null
            }) 

            setTimeout(() => {
               window.location.reload(false);
            }, 2500);
         })
         .catch((err) => {
           console.log("error: ", err);
           console.log("err.response: ",err.response);
           setWords({
            ...words,
            error: err.response.data.message,
            wordsNotFound: [],
            words: initialInput.words,
         }) 
         })

      
   }

   const inputArea = () => {
      return (
         <form onSubmit={hndlSubmit} className="addWordsForm"> 
            <textarea 
               type='text' 
               name="words"
               value={words.words} 
               placeholder="word1&#10;word2&#10;word3&#10;...etc"
               onChange={hndlChange}
               className="addWordsTextArea"
            >
            </textarea>
            {words.error && <div style={{color:'ivory'}}>Sorry, {words.error}.</div>}
            <button type='submit' className="addWrdsSbmtBtn">Add</button>
            <div className="wrdNotFoundMsg">
               <span>{words.wordsNotFound.length ? 'Success, added all words except:' : null} </span>
               {words.wordsNotFound.map(word=> <span>{word+' '}</span>)}
            </div>
         </form>
      )
   }

   return (
      <div>{show && inputArea()}</div>
   )
}

export default AWTD;
