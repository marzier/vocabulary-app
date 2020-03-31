import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditWord = ({ editing, setEditing, word, definition, deck_name, flashCard }) => {
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

      const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/words';

      axios.put(thisUrl, updateObj, {headers:{authorization: localStorage.getItem('token')}})
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
            
            <span className="speaker" 
                           role="img" 
                           aria-label="edit"
                           onClick={(e)=>{if (!e) e = window.event; e.stopPropagation(); setEditing(!editing) }}>
                        &nbsp;&#128295;
            </span>
         </form>
      )
   }

   return (
      <div>{editing && modal()}</div>
   )
}

export default EditWord;