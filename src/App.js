import React, {useState,useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';


// import logo from './logo.svg';
import './App.css';
import './components/ChooseDeck';

import Barrons_1 from './word-lists/barrons_subset_1';

import ChooseDeck from './components/ChooseDeck';



import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Modal from "./components/AddDeckButton.js";

function App(props) {

  const initialDecks = [
    {deck: Barrons_1, name:"Barrons 3500", path:"Barrons"},
  ];

  const [decks, setDecks] = useState(initialDecks);
  const [showModal, setSM] = useState(false);

  const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:6001';
  const thisUrl = baseUrl + '/decks';

  useEffect(() => {
    axios.get(thisUrl, {
      headers: {
        authorization: localStorage.getItem('token')
      } 
    })
      .then(res => {
        const userDecks = res.data;

        const tempDecks = [...initialDecks];
        userDecks.forEach(deck => {
          let setToInitDecksFormat = { 
            deck: deck, 
            name: deck[0][0].deck_name,
            path: deck[0][0].deck_name.replace(/\s+/g,'') 
          }
          tempDecks.push(setToInitDecksFormat)
        });
        setDecks(tempDecks);
        
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  function addDeckChild(newDeck) {
    setDecks({...decks, newDeck})
  }


  return (<>
        <nav className="nav"> {console.log("REACT_APP_SERVER_URL:", process.env.REACT_APP_SERVER_URL)}
            <Link to="/" className="navLinks">Home</Link>
            <Link to="/login" className="navLinks">Login</Link>
            <Link to="/register" className="navLinks">Register</Link>
        </nav>
 
        <div className="App">

          {/* <button onClick={()=>goBack()}>Go Back</button> */}

          <Route path="/login" component={Login} />  
          <Route path="/register" component={Register} />  
         
          <Route exact path="/" render={()=>
            (<div class="choose_list">
                <h1>Select Deck</h1>
                <div className="separator"></div>

                {decks.map((deckObj)=>(
                  <Link className="deckOptionButton" key={deckObj.path}
                        to={`/${deckObj.path}/groups`}>{deckObj.name}</Link>
                ))}

                <div className="deckOptionButton" onClick={()=>setSM(!showModal)}>
                  {showModal ? 'Hide' : "Add Deck"}
                </div>
                <Modal showModal={showModal} />
 
            </div> )} 
          />

          {decks.map((deckObj)=>(
            <Route  path={`/${deckObj.path}/groups`} key={deckObj.path} render={props=>(
              <ChooseDeck {...props} 
                          deck={deckObj.deck} 
                          key={deckObj.path} 
                          deckName={deckObj.path} /// rename to path?? TODO
                          name={deckObj.name}
                          allDeckNames = {decks.map(deckObj=>deckObj.name)}  />  
                          
            )} />
          ))}
        </div>
  </>);
}

export default App;




// const goBack  = () => {
//   // for a back button
//   props.history.goBack();
// } 

// const addDeck = () => {
//   newDeck = {deck: 'CustomDeck', name:"Custom Deck", path:"prepScholar"};
//   setDecks({...Decks, newDeck })
// } 