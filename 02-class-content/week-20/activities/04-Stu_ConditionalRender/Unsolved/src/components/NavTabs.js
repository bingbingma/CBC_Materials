//solved by William .. contains pre ES6 function  below

import React from "react";

function NavTabs(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">

      {/* handle if true, nav-link active, if false, nav-link: */}
        <a 
        href="#home" 
        onClick={() => props.handlePageChange("Home")} 
        className={props.currentPage === "Home" ? "nav-link active" : "nav-link"} 
        >
          Home
        </a>
      </li>
      <li className="nav-item">
        {/* preES6 function */}
        <a
        href="#about"
        onClick={function(){props.handlePageChange("About")}}
        className={props.currentPage === "About" ? "nav-link active" : "nav-link"}
        >
          About 
        </a>
      </li>
      <li className="nav-item">
        <a
        href="#blog"
        onClick={() => props.handlePageChange("Blog")}
        className={props.currentPage === "Blog" ? "nav-link active": "nav-link"}
        >
          Blog
        </a>      
      </li>
      <li className="nav-item">
        <a
        href="#contact"
        onClick={() => props.handlePageChange("Contact")}
        className={props.currentPage === "Contact" ? "nav-link active": "nav-link"}
        >
          Contact
        </a>
      </li>
    </ul>
  );
}

export default NavTabs;
