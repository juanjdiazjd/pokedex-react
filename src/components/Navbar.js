import React from 'react';
import { Navbar,Nav } from 'react-bootstrap'
import './Navbar.css'
import Logo from '../images/pokemon_logo.svg'


const NavBar = props => {
        return (
            <Navbar variant="dark"   expand="lg">
            <Navbar.Brand  href="/home"><img style={{width: "100px"}} src={Logo}></img></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav  className="mr-auto">
                <Nav.Link style={{color:'white',fontSize:'2em',marginLeft: '530%'}} href="/home"><span >Pokedex</span></Nav.Link>
              </Nav>
             
            </Navbar.Collapse>
          </Navbar>
        )
        
};

export default NavBar;