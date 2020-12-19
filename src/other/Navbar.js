import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="topnav">
            <div className="topnavElements">
                <Link to="/" className="navElement">Home</Link>
                <Link to="/addNote" className="navElement">Add note</Link>
                <Link to="/allNotes" className="navElement">Show notes</Link>
                <Link to="/calendar" className="navElement">Calendar</Link>
            </div>
        </div >
    );
};

export default Navbar;