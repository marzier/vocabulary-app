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

      axios.post('http://localhost:6001/decks', deckName, {headers:{authorization: localStorage.getItem('token')}})
         .then((res) => {
            console.log("add deck res:", res)
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
               
            >
            </input>
            <button type='submit'>Add</button>
         </form>
      )
   }

   return (
      <div>{showModal && modal()}</div>
   )
}

export default AddDeckButton;