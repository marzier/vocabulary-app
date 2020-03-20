import React, {useState,useEffect} from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

// import logo from './logo.svg';
import './App.css';
import './components/ChooseDeck';

import PrepScholar from './word-lists/prep-scholar';
import Kaplan from './word-lists/kaplan100';
import Barrons_1 from './word-lists/barrons_subset_1';

import ChooseDeck from './components/ChooseDeck';

import './App.css';


import Login from "./components/Login.js";
import Register from "./components/Register.js";

function App(props) {

  const initialDecks = [
    {deck: PrepScholar, name:"Prep Scholar", path:"prepScholar"}, 
    {deck: Kaplan, name:"Kaplan", path:"kaplan"},
    {deck: Barrons_1, name:"Barrons 1", path:"barrons"}
  ];


  const [users, setUsers] = useState([]);
  const [decks, setDecks] = useState(initialDecks);


  useEffect(() => {
    axios.get('http://localhost:6001/decks', {
      headers: {
        authorization: localStorage.getItem('token')
      } 
    })
      .then(res => {
        ////setUsers(res.data);   
        //setDecks({...decks, res.data})

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


  

  const goBack  = () => {
    // for a back button
    props.history.goBack();
  } 

  // const addDeck = () => {
  //   newDeck = {deck: 'CustomDeck', name:"Custom Deck", path:"prepScholar"};
  //   setDecks({...Decks, newDeck })
  // } 

  return (
        <div className="App">
          <Link to="/" className="menu">Home</Link>
          <Link to="/" className="logo">Zen Vocab</Link>
          <Link to="/login" className="">Login</Link>
          <Link to="/register" className="">Register</Link>
          {/* <button onClick={()=>goBack()}>Go Back</button> */}

          <Route path="/login" component={Login} />  
          <Route path="/register" component={Register} />  

          <div>
            {users.map(user => <div>{JSON.stringify(user)}</div>)}
          </div>
         

          <Route exact path="/" render={()=>
            (<div class="choose_list">
                <h1>Select Deck &darr;</h1>

                {decks.map((deckObj)=>(
                  <Link className="deckOptionButton" key={deckObj.path}
                        to={`/${deckObj.path}/groups`}>{deckObj.name}</Link>
                ))}

                <div className="deckOptionButton" style={{"font-weight":"bold"}}>Add Deck</div>
 
            </div> )} 
          />

          {decks.map((deckObj)=>(
            <Route  path={`/${deckObj.path}/groups`} key={deckObj.path} render={props=>(
              <ChooseDeck {...props} deck={deckObj.deck} key={deckObj.path} deckName={deckObj.path}  />  /* deckName={deckObj.path} */
            )} />
          ))}
        </div>
  );
}

{/* 

  <div 'app'>
    <h1> select word list </h1>
    <a> prepScholar </a>

  </div>


*/}

export default App;




// spaced repitiion and waterfall method 
// https://blog.prepscholar.com/the-best-way-to-study-sat-vocab-words



// marketing 1 - reddit publicity 
// no downloads. no installations. no accounts. study vocabulary immediately.

// marketing 2 - on homepage 
// why should you memorize words?
// increase reading comprehension
// etc


// Direct Hits Vocabulary: 365 words – 12 Hits = 30.4 words per hit
// Barron’s Hot Words: 396 words – 11 Hits = 36 words per hit
// TestMasters: 254 words: 6 Hits = 42.3 words per hit
// Rocket Review Core Words: 323 words – 6 hits = 53.8 words per hit
// Princeton Review Hit Parade: 254 words – 4 hits = 63.5 words per hit
// SparkNotes 1000: 1000 words:11 hits = 90.9 words per hit
// Word Smart: 1505 words: 16 hits = 94 words per hit
// Kaplan’s Score Raising Dictionary: 1000 words – 6 hits = 166.6 words per hit
// Kaplan’s Basic SAT Book: 500 words – 3 hits = 166.6 words per hit 10 Gruber’s 3400 Word List: 3,400 words – 20 hits = 170 words per hit 11 Barron’s 3500 Word Mini-Dictionary: 3,500 words – 20 hits = 175 words per hit source: 
// http://talk.collegeconfidential.com/sat-preparation/591431-which-vocab-book-list-performed-best-on-the-nov-08-sat.html