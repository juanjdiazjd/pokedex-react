import axios from 'axios';
import React from 'react'




const  checkFailed = async (responses) => {

    responses = responses.filter(response => !response.error)
    console.log(responses)
    return responses


}



export const   fetchingDetailPokemon =  async (id) => {
  return new Promise(function (resolve,reject) {
    let promises =  [ axios.get(process.env.REACT_APP_URL_POKEAPI+"pokemon/"+id.toString()), axios.get(process.env.REACT_APP_URL_POKEAPI+"pokemon-species/"+id.toString())]
    const promisesResolved = promises.map(promise => promise.catch(error => ({ error })))
    try {
      axios.all(promisesResolved)
      .then(async response => {
        
        let promisel = await checkFailed(response)
        console.log(promisel)
        resolve(promisel)
      })
      .catch((err) => {
        console.log('FAIL', err)
      });
    //  checkFailed(data)
    } catch (error) {
      
    }
  })


}

export const convertToText =(id) => {
    const word_id = "" + id
    const digitsStr = "000"
    return "#"+digitsStr.substring(0, digitsStr.length - word_id.length) + word_id
  }
  
  export  const getPokeColor =  (name) => {
    return {
      backgroundColor: selectColor(name),margin:"5px"
    };
  };
  
  const selectColor = name => {
    switch (name) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#ee8130';
      case 'water':
        return '#6390f0';
      case 'electric':
        return '#f7d02c';
      case 'grass':
        return '#7ac74c';
      case 'ice':
        return '#96d9d6';
      case 'fighting':
        return '#c22e28';
      case 'poison':
        return '#a33ea1';
      case 'ground':
        return '#e2bf65';
      case 'flying':
        return '#a98ff3';
      case 'psychic':
        return '#f95587';
      case 'bug':
        return '#a6b91a';
      case 'rock':
        return '#b6a136';
      case 'ghost':
        return '#735797';
      case 'dragon':
        return '#6f35fc';
      case 'dark':
        return '#705746';
      case 'steel':
        return '#b7b7ce';
      case 'fairy':
        return '#d685ad';
      default:
        return undefined;
    }
  };
  function toFeet(meters) {
    const realFeet = (meters * 0.3937) / 12;
    const feet = Math.floor(realFeet);
    const inches = Math.round((realFeet - feet) * 12);
    return feet + '′' + inches + '´´';
  }
  export const getFormatHeight = height => {
    return `${toFeet(height * 10)} (${height / 10}m)`;
  };
  
  export  const getFormatWeight = weight => {
    const lbs = Math.floor(weight * 22.046) / 100;
    return `${lbs} lbs  (${weight / 10}kg)`;
  };