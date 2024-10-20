import React from "react";
import {Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import {NavLink} from "react-router-dom";

import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

function NavBar() {
  const currentUser = useSetCurrentUser();

  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth-logout/');
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };


  const addPostIcon = (
    <NavLink 
      to="/signin" 
      className={styles.NavLink} 
      activeClassName={styles.Active}
    >
      <i className="fas fa-sign-in-alt"></i>Sign in
    </NavLink>
  )   
  const loggedInIcons = <>
   <NavLink 
      to="/feed" 
      className={styles.NavLink} 
      activeClassName={styles.Active}
    >
      <i className="fas fa-stream"></i>Feed
    </NavLink>
    <NavLink 
      to="/liked" 
      className={styles.NavLink} 
      activeClassName={styles.Active}
    >
      <i className="fas fa-heart"></i>Liked
    </NavLink>
    <NavLink 
      to="/"
      onClick={handleSignOut} 
      className={styles.NavLink} 
    >
      <i className="fas fa-sign-out-alt"></i>Sign Out
    </NavLink>
    <NavLink 
      to={`/profiles/${currentUser?.profile_id}`} 
      className={styles.NavLink} 
    >
      <Avatar src={currentUser?.profile_image} text='Profile' height={40}/>
    </NavLink>
  </>
  const loggedOutIcons = (
  <>
    <NavLink to="/post/create" 
      className={styles.NavLink} 
      activeClassName={styles.Active}
    >
      <i className="fas fa-plus-square"></i>Add post
    </NavLink>

    <NavLink to="signup" 
      className={styles.NavLink} 
      activeClassName={styles.Active}
    >
      <i className="fas fa-user-plus"></i>Sign Up
    </NavLink> 
  </>
  );

  return (
    <div>
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>

            <NavLink to="/">
            <Navbar.Brand>
                <img src={logo} alt="logo" height="45"/>
            </Navbar.Brand>
            </NavLink>
            {currentUser && addPostIcon}
            <Navbar.Toggle 
              onClick={() => setExpanded(!expanded)} 
              aria-controls="basic-navbar-nav" 
              ref={ref}
            />
            <Navbar.Collapse id="basic-navbar-nav">
        
            <Nav className="ml-auto text-left">

                <NavLink to="/" 
                exact
                className={styles.NavLink} 
                activeClassName={styles.Active}>
                  <i className="fas fa-home"></i>Home
                </NavLink>
                {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
            </Container>
    </Navbar>
    </div>
  )
}

export default NavBar;