import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';


import Groups from './Groups';

function ChooseDeck(props) {
   const [theDeck, setTheDeck] = useState(props.deck)

   //console.log("in choosedeck:", props);
   
   // useEffect(()=>{
   //    setTheDeck(props.deck);
   // }, []);
   
  function arrayTo2DArray2(list, howMany) {
    var idx = 0
    var result = []
  
    while (idx < list.length) {
      if (idx % howMany === 0) result.push([])
      result[result.length - 1].push(list[idx++])
    }
  
    return result
  }
  
  const splitDict = arrayTo2DArray2(theDeck, 50)
  
  return (
    <>
      {/* {console.log("in chooseDeck")} */}
      
      <Route exact path={`${props.match.path}`} render={()=>
         (
         <div>
            <CSSTransitionGroup
                transitionName="option2"
                transitionEnterTimeout={100}
                transitionLeaveTimeout={500}
                transitionAppear={true}
                transitionAppearTimeout={200}
                transitionEnter={true}
                transitionLeave={true}
                unmountOnExit
            >
              <div class="choose_group">
              <h2>{props.deckName}'s List</h2>

              <h3>Choose Group</h3>

              <div class="list_of_groups">
                {splitDict.map((element, index)=>{
                  // for purely aesthetics, add extra character to 1-9 so the groups line up on the page
                  if (index<9) {
                    return (
                      <Link className="link" to={`${props.match.url}/${index+1}`} key={index} >
                              {`G0${index+1}`}
                      </Link>)
                  }
                  return (
                      <Link className="link" to={`${props.match.url}/${index+1}`} key={index} >
                              {`G${index+1}`}
                      </Link> )
                })}
              </div>
              </div>
            </CSSTransitionGroup> 
         </div>
         
         )} 
      />
      
      {splitDict.map((element, index)=>{
      return <Route  path={`${props.match.path}/${index+1}`} key={index}
                     render={props=>
                        <Groups {...props} subList={element} />
                     } 
              />
      })}
    </>
  );
}

export default ChooseDeck;



