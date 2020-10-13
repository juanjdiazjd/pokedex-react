import React,{useState} from 'react';
import {Card,Badge} from 'react-bootstrap'
import not_image from '../images/descarga.png'

import './PokemonCard.css'

import {convertToText,getPokeColor} from './utils/Utils';

const PokemonCard = ({ card, loading }) => {


  if (loading) {
    return <div class="wrapper"><div class="pokeball"></div></div>
  
  }
  if(card.length == 0){
  return <h2>No hay resultados.</h2>}
 

  return (

          <div class="col-custom">
      <div class="card-custom" >
        <div style={{padding: "20px"}}>
      <img style={{height: "200px",width: "200px"}} variant="top" src={card.dataDetails.data.sprites.other["dream_world"].front_default ? card.dataDetails.data.sprites.other["dream_world"].front_default :card.dataDetails.data.sprites.other["official-artwork"].front_default || not_image } onError={(e)=>{e.target.onerror = null; e.target.src=not_image}}/>
      </div>
      <Card.Body>
        <Card.Title> {card.name}</Card.Title>
        <Card.Text>

          {card.height}
          <h5>
          {card.dataDetails.data.types.map(x=>{return <Badge style={getPokeColor(x.type.name)}><span style={{color:"white",textTransform:"capitalize"}}>{x.type.name}</span></Badge>})}
          </h5>
          <span>{convertToText(card.dataDetails.data.id)}</span>
        </Card.Text>
        {/* <Button onClick={() => setValues(card)} variant="primary">Details</Button> */}
      </Card.Body>
    </div>

    <br></br>
    </div>
    
      )}


export default PokemonCard;