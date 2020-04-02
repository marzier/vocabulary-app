import React, {useState, useEffect} from 'react';
import axios from 'axios';


export const DelWord = ({deck_name, word}) => {
   const [btnTxt, setBT] = useState('DeleteWord')

   const hndlSubmt = (e) => {
      // so clicking on btn doesn't trigger the next flashcard click of parent div
      if (!e) e = window.event;
      e.stopPropagation();

      const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/words';
      axios.delete(thisUrl, {
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







export const AddToDeck = ({allDeckNamesCopy, word, definition}) => {
   const [showAddModal, setSAM] = useState(false);

   const allUserDeckNames = allDeckNamesCopy.filter(name => name != "Barrons 3500");

   const hndlSubmt = (e,deckName) => {
      // so clicking on btn doesn't trigger the next flashcard click of parent div
      // if (!e) e = window.event;
      // e.stopPropagation();

      // axios.post('http://localhost:6001/words/copy', {
      //    headers: {
      //      authorization: localStorage.getItem('token')
      //    },
      //    data: {
      //       deck_name:deckName, word, definition
      //    } 
      //  })

      const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:6001';
      const thisUrl = baseUrl + '/words/copy';

      axios.post(thisUrl, {deck_name:deckName, word, definition}, {headers:{authorization: localStorage.getItem('token')}})
         .then((g) => {
            console.log(g);
            window.location.reload(false)
         })
         .catch((err) => {
            console.log(err);
         })
   }


   const modal = (
      <div className="addToDeckModal">
         <h2>Add to Deck</h2>
         { allUserDeckNames
            .map(deckName=>
                  <button className="addToDeckBtns" onClick={(e)=>hndlSubmt(e,deckName)}>
                     {deckName}
                  </button>
               ) 
         }
         <button onClick={(e)=>{e.stopPropagation(); setSAM(!showAddModal)}}  className='addToDeckCncl'>
            cancel
         </button>
      </div>
   );

   return ( <>
      <button onClick={(e)=>{e.stopPropagation(); setSAM(!showAddModal)}}  className='button1'>  {/* onClick={e=>hndlSubmt(e)} */}
         +
      </button>
      {showAddModal && modal}
   </>)
}