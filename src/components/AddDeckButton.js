import React, { useState } from 'react';
import axios from 'axios';

const AddDeckButton = ({ showModal }) => {
   const initialInput = {
      "deck_name": ""
   }

   const [deckName, setDN ] = useState(initialInput);

   const hndlChange = (e) => {
      setDN({...initialInput, [e.target.name]:e.target.value});
   }
   
   const hndlSubmit = (e) => {
      e.preventDefault();

      const baseUrl = process.env.SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/decks';

      axios.post(thisUrl, deckName, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            console.log("add deck res:", res)
            window.location.reload(false);
         })
         .catch((err) => {
           console.log(err.response); 
         })
   }

   const modal = () => {
      return (
         <form onSubmit={hndlSubmit}>
            <input 
               type='text' 
               name="deck_name" 
               placeholder="deck name"
               onChange={hndlChange}
               className="addDckInpt"
            >
            </input>
            <button type='submit' className="addDckBtn">Add</button>
         </form>
      )
   }

   return (
      <div>{showModal && modal()}</div>
   )
}

export default AddDeckButton;