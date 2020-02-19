import React, { useEffect , useState } from 'react';
import { Swipeable } from "react-swipeable";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


const Flashcards = ({ stack }) =>{

   let randomWord = stack[Math.floor(Math.random()*stack.length)];

   const [flashCard, setFlashCard] = useState(randomWord);
   const [isFlipped, setIsFlipped] = useState(false);

   const config = {
      // https://github.com/FormidableLabs/react-swipeable
      onSwipedLeft: () => {
         setFlashCard(stack[Math.floor(Math.random()*stack.length)]);
         setIsFlipped(false);
      },
      onSwipedRight: () => {
         setFlashCard(stack[Math.floor(Math.random()*stack.length)]);
         setIsFlipped(false);
      },
      // onSwipedUp, onSwipedDown
      preventDefaultTouchmoveEvent: true,
      trackMouse: true
    };

   
   const speak = (e, word) => {
      if (!e) e = window.event;
      e.stopPropagation();

      if ( 'speechSynthesis' in window ) {
         var to_speak = new SpeechSynthesisUtterance(word);
         window.speechSynthesis.speak(to_speak);
      }
   };

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
               <h1 onClick={(e)=>speak(e, flashCard[0].word)}>{flashCard[0].word} &#128265;</h1>

            <CSSTransitionGroup
               transitionName="example"
               transitionEnterTimeout={100}
               transitionLeaveTimeout={100}
               transitionAppear={true}
               transitionAppearTimeout={100}
               transitionEnter={true}
               transitionLeave={true}>
               {flashCard.map((word)=>{
                  return <p class="gloss" key={Math.random()}>{word.gloss}</p>
               })}
            </CSSTransitionGroup>

            </div>
      )} else {
         return (
            <div class="isFlipped_display">
               <h1 onClick={(e)=>speak(e, flashCard[0].word)}>{flashCard[0].word} &#128265;</h1>
               <p class="gloss"></p> 
            </div>
         );
      }
   }

   const getNextFlashCard = (e) => {
      if (!e) e = window.event;
      e.stopPropagation();
      setFlashCard(stack[Math.floor(Math.random()*stack.length)]);
      setIsFlipped(false);
   }

   const flipCard = (e) => {
      setIsFlipped(true);
   }

   // if (!stack[0][0].name) { 
   //    console.log(stack);
   //    return <h1>loading</h1>
   // }

   return (
      <div>
         <CSSTransitionGroup
            transitionName="option2"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={500}
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnter={true}
            transitionLeave={true}
         >        
            <div class="flashcards">

               <Swipeable {...config}>
               <div class="flashcards_main" onClick={()=>flipCard()}>
                  {flashCardSideDisplayed()}

                  <button className='button1' 
                     onClick={()=>flipCard()}>DEFINE &darr;</button>
                  <button className='button1' 
                     onClick={(e)=>{
                        getNextFlashCard(e);
                     }}>NEXT WORD &rarr;</button>
               </div>
               </Swipeable>

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
         </CSSTransitionGroup> 
      </div>
   )
}

export default Flashcards;