import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditWord = ({ editing, word, definition, deck_name, flashCard }) => {
   const initState = {
      "originalWord": word,
      "word": word,
      "definition": definition,
      "deck_name": deck_name
   }

   const [updateObj, setUO ] = useState(initState);


   useEffect(() => {
      // reinitialize updateObj when flaschard is changed in parent
      setUO(initState)
   }, [flashCard]);

   const hndlChange = (e) => {
      setUO({...updateObj, [e.target.name]:e.target.value});
   }
   
   const hndlSubmit = (e) => {
      e.preventDefault();

      axios.put('http://localhost:6001/words', updateObj, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            console.log("edited word, res:", res)
            window.location.reload(false);
         })
         .catch((err) => {
           console.log(err.response); 
         })
   }

   const modal = () => {
      return (
         <form onSubmit={hndlSubmit} className="updateForm">
            <input
               className="editWord" 
               type='text'
               value={updateObj.word} 
               name="word" 
               placeholder="word?"
               onChange={hndlChange}>
            </input>

            <textarea 
               className="editDef"
               type='text'
               value={updateObj.definition} 
               name="definition" 
               placeholder="def"
               onChange={hndlChange}>
            </textarea>
            <button type='submit' className="editSubmit">Update</button>
         </form>
      )
   }

   return (
      <div>{editing && modal()}</div>
   )
}

export default EditWord;