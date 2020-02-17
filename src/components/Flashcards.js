import React, { useEffect , useState } from 'react';


const Flashcards = ({ stack }) =>{

   let randomWord = stack[Math.floor(Math.random()*stack.length)];

   const [flashCard, setFlashCard] = useState(randomWord);
   const [isFlipped, setIsFlipped] = useState(false);

   useEffect(() => {
      const handleEsc = (event) => {
         if (event.keyCode === 40) {
          console.log('down key pressed');
          setIsFlipped(true);

        }
      };

      const handleEsc2 = (event) => {
         if (event.keyCode === 39) {
          console.log('right key pressed');
          setFlashCard(stack[Math.floor(Math.random()*stack.length)]);
          setIsFlipped(false);
        }
      };

      window.addEventListener('keydown', handleEsc);
      window.addEventListener('keydown', handleEsc2);

      return () => {
        window.removeEventListener('keydown', handleEsc);
        window.removeEventListener('keydown', handleEsc2);
      };
    }, []);


   const flashCardSideDisplayed = () => {
      if (isFlipped) {
         return (
            <div class="isFlipped_display">
               <h1>{flashCard[0].word}</h1>
               {flashCard.map((word)=>{
                  return <p class="gloss" key={Math.random()}>{word.gloss}</p>
               })}
            </div>
      )} else {
         return (
            <div class="isFlipped_display">
               <h1>{flashCard[0].word}</h1>
               <p class="gloss"></p> 
            </div>
         );
      }
   }

   const getNextFlashCard = (e) => {
      setFlashCard(stack[Math.floor(Math.random()*stack.length)]);
      setIsFlipped(false);
   }

   const flipCard = () => {
      setIsFlipped(true)
   }

   // if (!stack[0][0].name) { 
   //    console.log(stack);
   //    return <h1>loading</h1>
   // }

   return (
      <div class="flashcards">

         <div class="flashcards_main">
            {flashCardSideDisplayed()}

            <button className='button1' 
               onClick={()=>flipCard()}>DEFINE &darr;</button>
            <button className='button1' 
               onClick={()=>getNextFlashCard()}>NEXT WORD &rarr;</button>
         </div>

         <div class="flashcards_words">
               <h3> Words in this Stack </h3>
               <div className='stackList'>{stack[0][0].word}</div>
               <div className='stackList'>{stack[1][0].word}</div>
               <div className='stackList'>{stack[2][0].word}</div>
               <div className='stackList'>{stack[3][0].word}</div>
               <div className='stackList'>{stack[4][0].word}</div>
               <div className='stackList'>{stack[5][0].word}</div>
               <div className='stackList'>{stack[6][0].word}</div>
               <div className='stackList'>{stack[7][0].word}</div>
               <div className='stackList'>{stack[8][0].word}</div>
               <div className='stackList'>{stack[9][0].word}</div>
         </div>

         {/* mapping over stack doens't work, why?! */}


      </div>
   )
}

export default Flashcards;