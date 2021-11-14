import React from 'react';
import {NavLink} from 'react-router-dom';

function Header(props) {
    return (
        <div>
            <ul>
                <li><NavLink to="/" activeClassName="active" exact>Home</NavLink></li>
                <li><NavLink to="/crud" activeClassName="active">CRUD Class</NavLink></li>
                <li><NavLink to="/crudHook" activeClassName="active">CRUD Hook</NavLink></li>
                <li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                <li><NavLink to="/search" activeClassName="active">Youtube</NavLink></li>
                <li><NavLink to="/searchGit" activeClassName="active">GitHub</NavLink></li>
                <li><NavLink to="/searchFb" activeClassName="active">FaceBook</NavLink></li>
                <li><NavLink to="/tiki" activeClassName="active">Tiki</NavLink></li>
            </ul>
        </div>
    );
}

export default Header;