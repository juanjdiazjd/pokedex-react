import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
  import NavBar from './components/Navbar' 
import Home from './components/Home'
import PokemonDetail from './components/PokemonDetail';
import './App.css'




function App(){

  console.log(process.env.REACT_APP_URL_POKEAPI)


        return(
          
          <Router>
            <NavBar></NavBar>
              <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
             <Route path="/pokemon/:id" component={PokemonDetail} />
            
        
         </Router>
         
        )  
        }


        export default App;