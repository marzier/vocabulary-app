import React, {useState, useEffect} from 'react';
import axios from 'axios';


export const DelWord = ({deck_name, word}) => {
   const [btnTxt, setBT] = useState('DeleteWord')

   const hndlSubmt = (e) => {
      // so clicking on btn doesn't trigger the next flashcard click of parent div
      if (!e) e = window.event;
      e.stopPropagation();

      axios.delete('http://localhost:6001/words', {
         headers: {
           authorization: localStorage.getItem('token')
         },
         data: {
            deck_name, word
         } 
       })
         .then((g) => {
            console.log(g);
            window.location.reload(false)
         })
         .catch((err) => {
            console.log(err);
         })
   }

   const singleClick = (e) => {
      if (!e) e = window.event;
      e.stopPropagation();

      setBT('Double Tap to Delete')

      setTimeout(() => {
         setBT('Delete Word')
      }, 1500);
   }


   return (
      <button onDoubleClick={e=>hndlSubmt(e)} onClick={e=>singleClick(e)} className='button1'>
         {btnTxt} 
      </button>
   )
}

 