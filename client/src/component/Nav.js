import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{backgroundColor:"#6699cc"}}>
<nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/alluser">All user</a>
        </li>
       </ul>
      
    </div>
  </div>
</nav>
    </nav>
  );
};

export default Nav;
