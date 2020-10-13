import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {Card,Container, Row, Col,Badge} from 'react-bootstrap'
import {fetchingDetailPokemon,convertToText,getPokeColor,getFormatWeight,getFormatHeight} from './utils/Utils'
import './PokemonDetail.css'
import not_image from '../images/descarga.png'
const PokemonDetail = props =>{
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [pokemonAbilites, setPokemonAbilities] = useState([]);
    const [pokemonImage, setpokemonImage] = useState([]);
    const [pokemonName, setPokeName] = useState("");
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState([]);
    const [pokeWeight, setPokeWeight] = useState("");
    const [pokeHeight, setPokeHeight] = useState("");
    const [pokemonStat, setPokemonStats] = useState([]);
    const [pokemonMoves, setPokemonMoves] = useState([]);

   useEffect(() => {
        const fetchPokemonDetail = async () => {
            setLoading(true);
            let data = await fetchingDetailPokemon(id)
            console.log(data)
            setPokeName(data[0].data.name)
            setPokemonAbilities(data[0].data.abilities)
            setpokemonImage([data[0].data.sprites.other.dream_world.front_default,data[0].data.sprites.front_default,data[0].data.sprites.other["official-artwork"].front_default])
            setPokemonTypes(data[0].data.types)
            if (data[1]) {
              setPokemonSpeciesData(data[1].data.flavor_text_entries)
            }
           
            setPokeWeight(data[0].data.weight)
            setPokeHeight(data[0].data.height)
            setPokemonStats(data[0].data.stats)
            setPokemonMoves(data[0].data.moves)

            setLoading(false);
           
        };
        fetchPokemonDetail();
    }, []);

    if (loading) {
      return <div class="wrapper"><div class="pokeball"></div></div>
    
    }else{
      console.log(pokemonMoves)
      return (
        <Container>
      <br></br>
      <Row>
            <Col md="4">
            <div style={{padding: "20px"}}>
            <img className="pokeImage" style={{height: "200px",width: "200px"}} variant="top" src={pokemonImage ? pokemonImage[0]  : pokemonImage[2]} onError={(e)=>{e.target.onerror = null; e.target.src=not_image}}/>
           </div>
         </Col>
       
         <Col   md="3">
           <div class="content">
           <Card.Title className="card-title-custom">{pokemonName} <h5 style={{ marginLeft: "20px",display: "inline-block"}}> <Badge   style={{ top: "6%",position: "absolute",display: "inline-block"}} variant="secondary"><span>{convertToText(id)}</span></Badge></h5></Card.Title>
           </div>
           <div  class="content-details">
          
           {pokemonSpeciesData ? pokemonSpeciesData.map(x=>{

             if(x.language.name=='es' && x.version.name=='y'){return  <p>{x.flavor_text}</p>}
       
            
           }) : <p>No hay datos.</p>}
           <h5>
           {pokemonTypes.map(x=>{return <Badge style={getPokeColor(x.type.name)}><span style={{color:"white",textTransform:"capitalize"}}>{x.type.name}</span></Badge>})}</h5>
           <hr></hr>
           <Row>
           <Col>
           <h4>Height</h4>
           <span>{getFormatHeight(pokeHeight)}</span>
           </Col>
           <Col>
           <h4>Weight</h4>
           <span>{getFormatWeight(pokeWeight)}</span>
           
           </Col></Row></div><hr></hr>
           </Col>
           
         <Row>

          </Row>
         </Row>
         
          <Row>
           <Col md={{span:"2",offset:"3"}}>

           <h4>Abilities</h4>
           <ul>
           {pokemonAbilites.map(x=>{
             console.log(x)
             if(!x.is_hidden)
             { return <li>{x.ability.name}</li>}
            
           })}
           </ul>
     
        </Col>
        <Col md={{span:"2"}}>

            <h4>Moves</h4>
        <ul>
            {pokemonMoves.map(x=>{
              let names = []
              console.log(x)
              x.version_group_details.filter(i=>{
               
                if (i.version_group.name == 'ultra-sun-ultra-moon') {
                  console.log(x.move.name)
                  names.push(x.move.name)
                }else{
                  return null
                }
             
              })
              names = names.filter(x => names.indexOf(x) === names.lastIndexOf(x))
             if(names != ""){
               return <li>{names}</li>
             }
    
            })}
            </ul>


            </Col>
        <Col>
        <h4>Stats</h4>
        <ul>
           {pokemonStat.map(x=>{
             console.log(x)
           return <li>{x.stat.name}: {x.base_stat}</li>
            
           })}
           </ul>
        </Col>
        <Col>
        <Col md={{span:"6"}}>
     <img className="icon-poke" style={{height: "auto",width: "auto"}} variant="top" src={pokemonImage ? pokemonImage[1]  : "src\\images\\descarga.png" } onError={(e)=>{e.target.onerror = null; e.target.src="src\\images\\descarga.png"}}/>
          </Col></Col>
        </Row></Container>
         )
    }



} 

export default PokemonDetail;