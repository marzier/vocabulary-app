import React, { useEffect , useState } from 'react';
import { Swipeable } from "react-swipeable";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


const Flashcards = ({ stack, history, location }) =>{

   let randomWord = stack[Math.floor(Math.random()*stack.length)];

   const [flashCard, setFlashCard] = useState(randomWord);
   const [isFlipped, setIsFlipped] = useState(false);

   // the "stack.map" for listing words in that stack didn't work, unless I loaded it like this in state here
   const [stack2, setStack] = useState(stack);

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
         to_speak.rate = 0.75;
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

   const moveGroup = (direction) => {
      let pathname = location.pathname; // ex: "/barrons/groups/7/stack/1"

      // find current group number
      let start_group_num = pathname.indexOf("/groups");
      let end_group_num = pathname.indexOf("/stack");
      let current_group_no = pathname.slice(start_group_num+8, end_group_num);

      if (direction === "RIGHT") { 
         current_group_no++; 
      } else {
         current_group_no--;
      }
      
      // find current stack number
      let current_stack_no = pathname.slice(pathname.length - 1)

      // create new path
      let next_group_url = `/barrons/groups/${current_group_no}/stack/${current_stack_no}`;

      history.push(next_group_url);
   }

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
                  <button className='button1' 
                     onClick={()=>moveGroup("LEFT")}>&lArr;</button>
                  <button className='button1' 
                     onClick={()=>moveGroup("RIGHT")}>&rArr;</button>

               </div>
               </Swipeable>


               <div class="flashcards_words">
                     <h3> Words in this Stack </h3>
                     {/* <div className='stackList'>{stack2[0][0].word}</div> was like this*/}
                     {stack2.map((word) => {
                        return <div className='stackList'>{word[0].word}</div>
                     })}
               </div>

               {/* mapping over stack doens't work, why?! */}
            </div>
         </CSSTransitionGroup> 
      </div>
   )
}

export default Flashcards;