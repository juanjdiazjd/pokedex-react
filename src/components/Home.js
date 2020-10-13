import React, { useState, useEffect } from 'react';
import Pagination from "react-js-pagination";
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import PokemonCard from './PokemonCard';
import './Home.css'
import {Link} from "react-router-dom";


const Home = props => {
 


    const [pokemon, setPokemon] = useState([]);
    const [pokemonFiltered, setPokemonFiltered] = useState([]);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0)
    const [limit] = useState(5)
    const [cardsPerPage] = useState(5);

    const [filterPokeValue, setFilterPokeValue] = useState("");

    //Carga de datos a traves de API.
    useEffect(() => {
        const fetchPokemons = async () => {
           
            setLoading(true);
            await fetchingData()

            setLoading(false);
        };
        fetchPokemons();
    }, [offset,limit]);

    const pageRange = 10;

    //segun la página, le pegamos a pokeapi con limite 
    const handlePageChange = pageNumber => {
        console.log(pageNumber)
 
       
        if(pageNumber ==1){
            // setLimit(limit * pageNumber)
            setOffset(0)
           
        }else if (pageNumber == 2){
            setOffset(5)
        }else{
        
        console.log(limit*pageNumber-limit)
        setOffset(limit*pageNumber-limit)
        }
        setCurrentPage(pageNumber);

        
        // let data = await fetchingData()
        // setPokemonFiltered(data)
        // setCurrentPage(pageNumber);
    }

    //fetching datafunction checkFailed (then) {
 

    const fetchingData = async () => {
        
      
        let dataPokemon = await axios.get(process.env.REACT_APP_URL_POKEAPI +"pokemon?offset="+offset.toString()+"&limit=" + limit.toString())
        let pokeData = dataPokemon.data.results
        console.log(pokeData)
        // 
       
        //armar objeto con los datos del detail 
        let data = await Promise.all(
            await devolverEnlaces(pokeData)
        )
       
        
        let allData = pokeData.map((x,index)=>{
            x["dataDetails"] = data[index]
            console.log(x)
            return x
        })
        // .push({dataDetails:data})
        console.log(allData)
        setPokemon(allData)
       
        if(offset == 0){
            setCount(dataPokemon.data.count)
        }
      
        // let response = await Promise.all(
        //     devolverEnlaces()
        // )
        // console.log(response)
        // let dataList = await procesarData(data)

    }
    const devolverEnlaces = async (arrayPokemonData) => {
        let pegadas = []
        console.log(arrayPokemonData)
        arrayPokemonData.forEach(x=>
            {
                console.log(x.url)
                pegadas.push(axios.get(x.url))
    
            }) 
        console.log(pegadas)
        return pegadas
    }

    const indexOfLastPost = currentPage * cardsPerPage;
    const indexOfFirstPost = indexOfLastPost - cardsPerPage;
    // const currentPosts = pokemon

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
    
    <div className='container-fluid'>

        
        <Container > <Row><Col><div class="row-custom">
        {pokemon.map((card,index) => {
           
                return <Link className="aLink" to={{pathname:`/pokemon/${card.dataDetails.data.id.toString()}`,query:{data:card}}} >
                <PokemonCard card={card} loading={loading} />
                </Link>
        })}
       
       
        
        </div>
            </Col></Row></Container>
        
        {!loading ? <Col md={{span:'6',offset:'2'}}>
            <Pagination
            itemClass="page-item"
            linkClass="page-link"
            itemsCountPerPage={cardsPerPage}
            activePage={currentPage}
            totalItemsCount={count-5}
            paginate={paginate}
            pageRangeDisplayed={pageRange}
            onChange={handlePageChange}
            
        />
              </Col>:null  }
    </div>)
}

export default Home;