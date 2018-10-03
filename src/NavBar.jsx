import React, {Component} from 'react';

function NavBar(props) {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="usersOnline">{props.usersOnline} users online</div>
      </nav>
    );
}
export default NavBar;
