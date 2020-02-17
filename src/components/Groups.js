import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import Flashcards from './Flashcards';


function Groups(props) {

   function getChunks(list, howMany) {
    var idx = 0
    var result = []
  
    while (idx < list.length) {
      if (idx % howMany === 0) result.push([])
      result[result.length - 1].push(list[idx++])
    }
  
    return result
  }
  
  const stacks = getChunks(props.subList, 10)

   useEffect(()=>{
   }, [])


  return (
    <>
      {/*  */}

      <Route exact path={props.match.path} render={()=>
            <div className="choose_stack">
              <h3>Select Stack</h3>
              <div className="separator"></div>
              {stacks.map((element, index)=>{
                return <Link className="link" to={`${props.match.path}/stack/${index+1}`} key={index}>
                        {`Stack ${index+1}`}
                        </Link>
              })}

            </div>
         } 
      />       
       
       <div>
          {stacks.map((element, index)=>{
            return <Route path={`${props.match.path}/stack/${index+1}`} key={index}
                          render={props=>
                             <Flashcards {...props} stack={element} />
                          } 
                    />
          })}
        </div>
    </>
  );
}

export default Groups;



// https://github.com/moos/wordnet-db
// https://github.com/NaturalNode/natural