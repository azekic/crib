import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>Condo Chat</h1>
        </div>
        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/auth">Authenticate</NavLink>
                </li>
                <li>
                    <NavLink to="/posts">Posts</NavLink>
                </li>
                <li>
                    <NavLink to="/comments">Comments</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);
export default mainNavigation;